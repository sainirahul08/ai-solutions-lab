# Lab 8: Serverless Deployment with AWS Lambda

**Level:** Advanced
**Technology:** AWS Lambda + API Gateway

Convert your Flask MLOps service to serverless architecture using AWS Lambda and API Gateway for cost-effective, auto-scaling deployment.

## Lab Overview

**What You'll Do:** Convert Flask MLOps service to AWS Lambda, set up API Gateway, deploy serverless functions, and compare performance with EC2 containerized deployment

**Lab Collaborators:**
- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

## 🚨 Prerequisites Required

You must complete Labs 1-7 with working EC2 deployment before starting Lab 8.

## Prerequisites Check

**Before starting Lab 8, ensure you have:**

- ✅ Flask MLOps service running on EC2 from Lab 7
- ✅ Docker image built from Lab 5
- ✅ Next.js deployed to Vercel from Lab 7
- ✅ AWS account with active credentials
- ✅ Familiarity with AWS Console

### 🔍 Quick Test

```bash
# Verify EC2 deployment is working
curl http://YOUR_EC2_PUBLIC_IP:5001/health

# Should return healthy status
```

**All checked?** → You're ready for Lab 8!

### 📝 Important Note

This lab uses **AWS free tier** exclusively. AWS Lambda provides 1 million free requests per month and 400,000 GB-seconds of compute time - more than enough for this course project.

---

## Part A: Understanding Serverless Architecture

*Learn what serverless means and why it's revolutionary for modern applications*

### 1. What is Serverless?

**Serverless** doesn't mean "no servers" - it means **you don't manage servers**. AWS handles all infrastructure, you just upload your code.

**💡 Simple Analogy:**

Think of serverless like electricity:
- **Traditional Servers (EC2)** = Owning a generator
  - You maintain it
  - It runs 24/7 even when not needed
  - Fixed costs whether you use it or not

- **Serverless (Lambda)** = Using the power grid
  - No maintenance
  - Only use (and pay for) what you need
  - Scales automatically
  - Pay per millisecond of use

### 2. EC2 vs Lambda: Key Differences

**EC2 (Lab 7 Architecture):**
- ❌ Server runs 24/7 (even when idle)
- ❌ You manage OS updates, security patches
- ❌ Manual scaling configuration
- ❌ Fixed capacity (can't handle sudden traffic spikes well)
- ✅ Full control over environment
- ✅ Consistent performance (no cold starts)

**Lambda (Lab 8 Architecture):**
- ✅ Only runs when needed (triggered by requests)
- ✅ AWS manages all infrastructure
- ✅ Automatic scaling (handles 1 or 1 million requests)
- ✅ Pay only for execution time
- ❌ Cold starts (first request may be slower)
- ❌ 15-minute execution limit
- ❌ Limited control over environment

### 3. When to Use Each

**Use EC2 when:**
- Consistent, predictable traffic 24/7
- Long-running processes (>15 minutes)
- Need specific OS configurations
- Complex stateful applications

**Use Lambda when:**
- Sporadic or unpredictable traffic
- Event-driven workloads (API requests, file uploads)
- Quick processing tasks (<15 minutes)
- Want to minimize operational overhead
- Cost optimization is important

### 4. Our Serverless Architecture

**What We're Building:**

```
Users (Internet)
    ↓
Next.js App (Vercel)
    ↓
API Gateway (AWS)
    ↓
Lambda Function (Flask MLOps Logic)
    ↓
Neon PostgreSQL (Serverless Database)
```

**Service Breakdown:**
- **API Gateway:** HTTP endpoint that triggers Lambda
- **Lambda Function:** Flask MLOps code packaged as serverless function
- **Neon Database:** Already serverless, perfect match!

### 5. AWS Lambda Basics

**What is Lambda?**
- Run code without provisioning servers
- Supports Python, Node.js, Java, Go, and more
- Pay per 100ms of execution time
- Automatically scales from 0 to thousands of concurrent executions

**Lambda Free Tier (12 months):**
- **1 million free requests/month**
- **400,000 GB-seconds of compute/month**
- For our MLOps service, this is more than enough!

**💡 Example Cost Calculation:**
- 1,000 requests/day = 30,000/month (well under 1 million)
- Average execution: 200ms, 512MB memory = 0.1 GB-seconds per request
- Total: 3,000 GB-seconds/month (well under 400,000 limit)
- **Cost: $0.00** (within free tier)

---

## Part B: Prepare Flask Code for Lambda

*Adapt your Flask application to run as a serverless function*

### 1. Understanding Lambda Handler

**Traditional Flask (EC2):**
```python
# app.py runs as a server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
```

**Lambda Flask:**
```python
# Lambda calls a handler function for each request
def lambda_handler(event, context):
    # Process the HTTP request
    return response
```

**We'll use `serverless-wsgi` to bridge Flask and Lambda!**

### 2. Create Lambda Handler File

**Create a new file in your local `mlops-service/` directory:**

**File: `mlops-service/lambda_function.py`**

```python
"""
AWS Lambda handler for Flask MLOps Service
Converts Flask WSGI app to Lambda-compatible function
"""
import serverless_wsgi
from app import app

def lambda_handler(event, context):
    """
    AWS Lambda handler function

    Args:
        event: API Gateway request event
        context: Lambda execution context

    Returns:
        API Gateway response format
    """
    return serverless_wsgi.handle_request(app, event, context)
```

**What this does:**
- Imports your existing Flask app
- Uses `serverless-wsgi` to convert WSGI (Flask) to Lambda format
- AWS calls `lambda_handler()` for each request

### 3. Update Requirements for Lambda

**Your `mlops-service/requirements.txt` needs a new dependency:**

Add this line to your existing `requirements.txt`:

```txt
# Existing dependencies
flask==3.0.0
flask-cors==4.0.0
prometheus-client==0.19.0
psycopg2-binary==2.9.9
python-dotenv==1.0.0

# Add for Lambda deployment
serverless-wsgi==3.0.3
```

**What is serverless-wsgi?**
- Bridges Flask (WSGI) applications to AWS Lambda
- Handles request/response conversion
- Industry-standard for Flask on Lambda

### 4. Test Handler Locally (Optional)

**Before deploying to AWS, test the handler works:**

```bash
# Install new dependency
cd mlops-service
pip install serverless-wsgi==3.0.3

# Test import works
python -c "from lambda_function import lambda_handler; print('Handler imported successfully!')"
```

**✅ Success Check:** If you see "Handler imported successfully!", your Lambda handler is ready!

---

## Part C: Package Lambda Function

*Create a deployment package with all dependencies*

### 1. Understanding Lambda Deployment Package

**Lambda needs a ZIP file containing:**
- Your application code (`app.py`, `lambda_function.py`)
- All Python dependencies (Flask, prometheus-client, etc.)
- Must be structured correctly for Lambda to find the handler

**💡 Why not Docker?**
Lambda supports both ZIP files and Docker images. We'll use ZIP for simplicity, but you can also deploy the Docker image from Lab 5!

### 2. Create Deployment Package

**On your local machine, create the deployment package:**

**Mac/Linux:**
```bash
# Navigate to mlops-service directory
cd mlops-service

# Create a clean directory for the package
mkdir -p lambda-package
cd lambda-package

# Install dependencies into this directory
pip install -r ../requirements.txt -t .

# Copy application files
cp ../app.py .
cp ../lambda_function.py .

# Create ZIP file
zip -r ../lambda-deployment.zip .

# Go back to mlops-service directory
cd ..

# Verify ZIP was created
ls -lh lambda-deployment.zip
```

**Windows (PowerShell):**
```powershell
# Navigate to mlops-service directory
cd mlops-service

# Create a clean directory for the package
New-Item -ItemType Directory -Force -Path lambda-package
cd lambda-package

# Install dependencies into this directory
pip install -r ..\requirements.txt -t .

# Copy application files
Copy-Item ..\app.py .
Copy-Item ..\lambda_function.py .

# Create ZIP file (requires PowerShell 5.0+)
Compress-Archive -Path .\* -DestinationPath ..\lambda-deployment.zip -Force

# Go back to mlops-service directory
cd ..

# Verify ZIP was created
Get-Item lambda-deployment.zip
```

**⚠️ Important:**
- The ZIP file will be ~20-30 MB (includes all dependencies)
- Lambda has a 50 MB limit for direct uploads
- If larger, you'll need to use S3 (we'll cover this if needed)

**✅ Success Check:** You should have `lambda-deployment.zip` in your `mlops-service/` directory!

### 3. Alternative: Use Docker Image (Optional)

**If your package is too large, use Docker (from Lab 5):**

Lambda also supports Docker images! You can deploy your existing Docker image directly:

```bash
# Tag your image for AWS ECR (Elastic Container Registry)
docker tag mlops-service:latest <your-ecr-repo-url>/mlops-service:lambda

# Push to ECR (requires AWS CLI configured)
docker push <your-ecr-repo-url>/mlops-service:lambda
```

*We'll stick with ZIP for simplicity in this lab.*

---

## Part D: Create Lambda Function in AWS

*Deploy your function to AWS Lambda*

### 1. Navigate to Lambda Console

**Access AWS Lambda:**

1. Sign in to [AWS Console](https://console.aws.amazon.com)
2. Search for "Lambda" in the search bar
3. Click "Lambda" to open the Lambda console
4. Make sure you're in the same region as Lab 7 (e.g., us-east-1)

### 2. Create Lambda Function

**Create a new function:**

1. Click "Create function" button
2. Select "Author from scratch"
3. Configure:
   - **Function name:** `mlops-service-lambda`
   - **Runtime:** Python 3.11
   - **Architecture:** x86_64
   - **Permissions:** Create a new role with basic Lambda permissions

4. Click "Create function"

**✅ Success Check:** You should see "Function mlops-service-lambda successfully created"

### 3. Upload Deployment Package

**Upload your ZIP file:**

1. In the function page, scroll to "Code source" section
2. Click "Upload from" dropdown
3. Select ".zip file"
4. Click "Upload"
5. Select your `lambda-deployment.zip` file
6. Click "Save"

**Wait for upload to complete** (may take 30-60 seconds for large files)

**✅ Success Check:** You should see your files (`app.py`, `lambda_function.py`) in the code editor

### 4. Configure Handler

**Set the Lambda handler:**

1. Scroll to "Runtime settings" section
2. Click "Edit"
3. Set **Handler** to: `lambda_function.lambda_handler`
4. Click "Save"

**What this does:**
- Tells Lambda to call `lambda_handler()` function from `lambda_function.py`

### 5. Configure Environment Variables

**Add your environment variables:**

1. Click "Configuration" tab
2. Click "Environment variables" in left sidebar
3. Click "Edit"
4. Add variables (click "Add environment variable" for each):

```
DATABASE_URL=your_neon_database_url_here
FLASK_ENV=production
FLASK_DEBUG=False
SERVICE_PORT=5001
PROMETHEUS_PORT=8001
ENVIRONMENT=production
```

5. Click "Save"

**🔑 Important:** Use your actual Neon database URL from `.env` file!

### 6. Configure Timeout and Memory

**Adjust function settings:**

1. Stay in "Configuration" tab
2. Click "General configuration" in left sidebar
3. Click "Edit"
4. Set:
   - **Memory:** 512 MB (enough for Flask + Prometheus)
   - **Timeout:** 30 seconds (longer than default 3 seconds)
5. Click "Save"

**💡 Why these values?**
- 512 MB: Sufficient for Flask app and dependencies
- 30 seconds: Enough time for database queries and metric processing

---

## Part E: Set Up API Gateway

*Create HTTP endpoint to trigger your Lambda function*

### 1. What is API Gateway?

**API Gateway** creates a public HTTP endpoint that triggers your Lambda function.

**Flow:**
```
User Request (https://your-api.execute-api.us-east-1.amazonaws.com/prod/health)
    ↓
API Gateway (receives HTTP request)
    ↓
Lambda Function (processes request)
    ↓
API Gateway (returns HTTP response)
    ↓
User (receives response)
```

### 2. Create HTTP API

**From Lambda console:**

1. In your Lambda function page, click "Add trigger"
2. Select "API Gateway"
3. Configure:
   - **API type:** HTTP API (simpler than REST API)
   - **Security:** Open (we'll add security later if needed)
4. Click "Add"

**✅ Success Check:** You should see "API Gateway trigger added successfully"

### 3. Get API Endpoint URL

**Copy your API endpoint:**

1. In the "Triggers" section, click on the API Gateway trigger
2. You'll see "API endpoint" URL like:
   ```
   https://abc123xyz.execute-api.us-east-1.amazonaws.com/default/mlops-service-lambda
   ```
3. Copy this URL - this is your new MLOps service endpoint!

### 4. Test Lambda Function

**Test the health endpoint:**

```bash
# Replace with your actual API Gateway URL
curl https://YOUR_API_GATEWAY_URL

# Expected: Health check JSON response
```

**Test the /health endpoint specifically:**

```bash
curl https://YOUR_API_GATEWAY_URL/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "service": "mlops-service-prometheus",
  "timestamp": "2024-01-15T10:30:00.000000",
  "monitoring": "prometheus",
  "metrics_endpoint": "/metrics",
  "environment": "production"
}
```

**✅ Success Check:** If you get the health response, your Lambda function is working!

### 5. Test Metrics Endpoint

**Test Prometheus metrics:**

```bash
curl https://YOUR_API_GATEWAY_URL/metrics
```

**You should see Prometheus metrics output:**
```
# HELP python_info Python platform information
# TYPE python_info gauge
python_info{implementation="CPython",major="3",minor="11"...} 1.0
...
```

---

## Part F: Connect Vercel to Lambda

*Update your Next.js app to use the new serverless endpoint*

### 1. Update Vercel Environment Variables

**Switch from EC2 to Lambda:**

1. Go to [vercel.com](https://vercel.com)
2. Click on your project
3. Go to Settings → Environment Variables
4. Find `MLOPS_SERVICE_URL`
5. Click "Edit"
6. Update to your API Gateway URL:
   ```
   https://YOUR_API_GATEWAY_URL
   ```
7. Click "Save"

**Important:** Do NOT include `/health` or any path - just the base URL!

### 2. Trigger Redeployment

**Redeploy to use new environment variable:**

1. Go to Deployments tab
2. Click on the latest deployment
3. Click "Redeploy" button
4. Wait for deployment to complete

### 3. Test End-to-End Integration

**Test the complete serverless flow:**

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Create a new business or use existing
3. Open the chat interface
4. Send a message to the AI
5. Check if metrics are tracked

**Verify metrics on Lambda:**

```bash
# Check metrics endpoint
curl https://YOUR_API_GATEWAY_URL/metrics | grep ai_requests_total

# Should show incremented counter
```

**✅ Success Indicators:**
- AI chat responds on Vercel
- Metrics endpoint shows updated counters
- No errors in browser console
- Lambda executes successfully

### 4. Monitor Lambda Executions

**Check Lambda CloudWatch logs:**

1. Go to Lambda console
2. Click on your function
3. Click "Monitor" tab
4. Click "View CloudWatch logs"
5. Click on the latest log stream

**You should see:**
- Incoming requests
- Prometheus metrics updates
- Any errors or warnings

---

## Part G: Performance Comparison

*Compare EC2 vs Lambda performance and costs*

### 1. Test Response Times

**Test EC2 response time:**

```bash
# Time 10 requests to EC2
for i in {1..10}; do
  time curl -s http://YOUR_EC2_IP:5001/health > /dev/null
done
```

**Test Lambda response time:**

```bash
# Time 10 requests to Lambda
for i in {1..10}; do
  time curl -s https://YOUR_API_GATEWAY_URL/health > /dev/null
done
```

**💡 Expected Results:**
- **EC2 First Request:** ~50-100ms (consistent)
- **EC2 Subsequent:** ~50-100ms (consistent)
- **Lambda First Request:** ~500-2000ms (cold start)
- **Lambda Subsequent:** ~50-150ms (warm)

### 2. Understanding Cold Starts

**What is a Cold Start?**

When Lambda hasn't been used for ~5-15 minutes, AWS pauses the function. The next request must:
1. Start a new execution environment
2. Load your code
3. Initialize Python and libraries
4. Then process the request

**This causes the first request to be slower (~1-2 seconds).**

**Warm Starts:**
After the first request, Lambda keeps the environment "warm" for ~15 minutes. Subsequent requests are fast (~50-150ms).

**💡 Mitigation Strategies:**
- **Scheduled pings:** Keep function warm with CloudWatch Events
- **Provisioned concurrency:** AWS keeps environments ready (costs extra)
- **Accept the trade-off:** For low-traffic apps, occasional cold starts are acceptable

### 3. Cost Comparison

**EC2 Cost (t2.micro):**
- **Free Tier:** 750 hours/month for 12 months
- **After Free Tier:** ~$8-10/month (24/7 operation)
- **Fixed cost regardless of usage**

**Lambda Cost:**
- **Free Tier:** 1M requests + 400,000 GB-seconds/month (forever)
- **After Free Tier:** $0.20 per 1M requests + $0.0000166667 per GB-second
- **Variable cost based on actual usage**

**Example Scenario (1,000 requests/day):**

**EC2:**
- Monthly cost: $0 (free tier) or $8-10 (after free tier)
- Runs 24/7 even if no requests

**Lambda:**
- Requests: 30,000/month × $0.20/1M = $0.006
- Compute: 3,000 GB-seconds × $0.0000166667 = $0.05
- **Total: ~$0.06/month** (well within free tier = $0)
- Only runs when triggered

**💡 Winner for low-traffic apps: Lambda** (much cheaper)

### 4. When to Use Each

**Use EC2 when:**
- High, consistent traffic (thousands of requests/hour)
- Long-running processes
- Need predictable latency (no cold starts)
- Complex state management

**Use Lambda when:**
- Low to moderate traffic
- Unpredictable traffic patterns
- Cost optimization is priority
- Cold starts are acceptable
- Event-driven architecture

**For our AI receptionist:**
- **During development/testing:** Lambda (cheaper)
- **High-traffic production:** EC2 (better performance)
- **Low-traffic production:** Lambda (cost-effective)

---

## Part H: Clean Up and Resource Management

*Manage your AWS resources to optimize costs*

### 1. Keep Both or Choose One?

**You now have TWO deployments:**
- ✅ EC2 instance with Docker (Lab 7)
- ✅ Lambda function (Lab 8)

**Decision Time:**

**Option 1: Keep Both (Recommended for Learning)**
- Compare performance in real-world usage
- Learn the trade-offs firsthand
- Total cost: Still in free tier!

**Option 2: Stop EC2, Use Lambda Only**
- Save EC2 hours for other projects
- Simpler to manage one deployment
- Cheaper after free tier expires

**Option 3: Stop Lambda, Use EC2 Only**
- More consistent performance
- Better for high-traffic scenarios

### 2. Stop EC2 Instance (Optional)

**If you want to pause EC2 to save hours:**

```bash
# Via AWS Console:
# 1. Go to EC2 → Instances
# 2. Select mlops-service-production
# 3. Instance state → Stop instance
# 4. Confirm

# This STOPS the instance (can restart later)
# Does NOT delete it
```

**To restart later:**
```bash
# Instance state → Start instance
# Get new public IP (changes after stop/start)
# Update Vercel MLOPS_SERVICE_URL if switching back
```

### 3. Delete Lambda Function (Optional)

**If you want to remove Lambda:**

1. Go to Lambda console
2. Select your function
3. Actions → Delete
4. Type "delete" to confirm

**⚠️ Note:** This permanently deletes the function!

### 4. Monitor Your Usage

**Check Lambda usage:**

1. Lambda console → Functions
2. Click "Monitor" tab
3. View invocations, duration, errors

**Check EC2 usage:**

1. EC2 console → Instances
2. Check instance hours used

**Check free tier usage:**

1. AWS Console → Billing
2. Free Tier → View usage
3. See Lambda requests and EC2 hours remaining

---

## Part I: Cold Start Optimization (Optional)

*Reduce Lambda cold start times*

### 1. Scheduled Warming

**Keep Lambda warm with CloudWatch Events:**

**Create EventBridge Rule:**

1. Go to AWS Console → EventBridge
2. Create rule → Schedule
3. Configure:
   - **Name:** `mlops-lambda-warmer`
   - **Schedule:** Rate expression: `rate(5 minutes)`
4. Target: Lambda function → `mlops-service-lambda`
5. Create

**This pings Lambda every 5 minutes, keeping it warm!**

**Cost Impact:** Minimal (still within free tier)

### 2. Provisioned Concurrency

**AWS can keep environments ready 24/7:**

1. Lambda console → Your function
2. Configuration → Provisioned concurrency
3. Set desired number of ready environments

**⚠️ Warning:** This costs extra! Not needed for this course.

### 3. Code Optimization

**Reduce cold start time by optimizing imports:**

```python
# BAD: Import everything at module level
import heavy_library  # Loaded during cold start

def lambda_handler(event, context):
    heavy_library.do_something()

# GOOD: Import only when needed
def lambda_handler(event, context):
    import heavy_library  # Loaded only when called
    heavy_library.do_something()
```

For our app, the difference is minimal, but good to know!

---

## Troubleshooting

### Lambda function returns 502 Bad Gateway:

**Check handler configuration:**
- Ensure handler is `lambda_function.lambda_handler`
- Verify `lambda_function.py` is in the ZIP root

### Lambda times out:

**Increase timeout:**
- Configuration → General configuration → Timeout → 30 seconds
- Check CloudWatch logs for specific errors

### Environment variables not working:

**Verify configuration:**
- Configuration → Environment variables
- Check DATABASE_URL includes `?sslmode=require`

### Deployment package too large:

**Reduce size or use Docker:**
- Remove unnecessary files from package
- Or deploy Docker image to ECR and use container image

### Cold starts are too slow:

**Optimization options:**
- Set up EventBridge warming (Part I)
- Reduce package size
- Optimize Python imports

### Can't connect to database from Lambda:

**Check VPC settings:**
- Lambda functions can access public internet by default
- Neon is publicly accessible, should work
- Verify DATABASE_URL is correct

---

## Lab 8 Summary - What You Built

Congratulations! You've successfully deployed your Flask MLOps service as a serverless function. Here's what you accomplished:

### ✅ Serverless Skills Gained

- **Lambda Fundamentals:** Function-as-a-Service deployment
- **API Gateway:** HTTP endpoints for serverless functions
- **Serverless Architecture:** Event-driven, auto-scaling design
- **Cost Optimization:** Pay-per-use pricing model
- **Performance Analysis:** EC2 vs Lambda trade-offs

### 🚀 What You Built

- **Serverless MLOps Service:** Flask running on AWS Lambda
- **API Gateway Endpoint:** Public HTTPS endpoint for your service
- **Auto-Scaling:** Handles 1 to 1,000,000 requests automatically
- **Cost-Effective:** $0 within free tier, pennies beyond
- **Production Comparison:** Two deployment strategies to compare

### 🎯 Real-World Impact

You've now deployed the same application using two different architectures:

- **EC2 (Lab 7):** Traditional server-based deployment
- **Lambda (Lab 8):** Modern serverless deployment

**This is exactly how real companies architect systems!**
- **Netflix:** Uses both EC2 and Lambda for different services
- **Airbnb:** Serverless for event processing, servers for core app
- **Uber:** Hybrid architecture based on service requirements

### 📊 Architecture Comparison

**Lab 7 - EC2 Architecture:**
```
Next.js (Vercel) → Flask (EC2 + Docker) → Neon PostgreSQL
- Fixed capacity
- 24/7 operation
- Consistent latency
- ~$10/month after free tier
```

**Lab 8 - Serverless Architecture:**
```
Next.js (Vercel) → API Gateway → Lambda → Neon PostgreSQL
- Auto-scaling
- Pay per request
- Cold start latency
- ~$0.10/month after free tier (low traffic)
```

### 🔑 Key Takeaways

- **Serverless = No server management**, not "no servers"
- **Lambda scales automatically** from 0 to millions of requests
- **Cold starts are real** (~1-2 seconds for first request)
- **Cost-effective for low-traffic** or unpredictable workloads
- **Trade-offs exist** between serverless and traditional deployments
- **Choose the right tool** based on your requirements

### 💡 Cost Summary (After Free Tier)

**Low Traffic (1,000 req/day):**
- **EC2:** ~$8-10/month
- **Lambda:** ~$0.05-0.10/month
- **Winner:** Lambda (100x cheaper!)

**High Traffic (100,000 req/day):**
- **EC2:** ~$8-10/month (same)
- **Lambda:** ~$5-8/month
- **Winner:** Still Lambda, but closer!

**Very High Traffic (1M req/day):**
- **EC2:** ~$8-10/month (same)
- **Lambda:** ~$150-200/month
- **Winner:** EC2 (more predictable)

### 🎯 What's Next?

**You now have hands-on experience with:**
- Traditional cloud deployment (EC2)
- Serverless deployment (Lambda)
- Performance comparison
- Cost analysis

**In upcoming labs, you'll:**
- Implement comprehensive monitoring (Lab 9)
- Add security and authentication (Lab 10)
- Conduct final performance analysis (Labs 11-12)

---

## 📝 Test Your Knowledge

**Complete the Lab 8 Quiz** to test your understanding of serverless deployment with AWS Lambda and API Gateway.

**[Take Lab 8 Quiz →](https://chat.leverlabs.co/quizzes/lab8-quiz.html)**

After completing the quiz, take a screenshot of your results page for submission. The screenshot will include:
- Your name
- Your score
- A unique Session ID
- Timestamp
- Browser information

---

**Navigation:**
- [← Lab 7: Cloud Deployment](/labs/lab7)
- [Back to Labs →](/labs)
