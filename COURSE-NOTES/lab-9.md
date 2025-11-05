# Lab 9: Monitoring & Logging for Production AI Systems

**Level:** Advanced
**Technology:** AWS CloudWatch + Enhanced Prometheus Monitoring

Implement production-grade monitoring and logging for your deployed AI application, understanding key metrics and observability best practices.

## Lab Overview

**What You'll Do:** Explore AWS CloudWatch for Lambda monitoring, set up CloudWatch alarms, enhance your Prometheus dashboard with production metrics, and implement detailed health checks for production observability

**Lab Collaborators:**
- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

## 🚨 Prerequisites Required

You must complete Labs 1-8 with deployed Lambda function before starting Lab 9.

## Prerequisites Check

**Before starting Lab 9, ensure you have:**

- ✅ Flask MLOps service running (locally or on AWS)
- ✅ Lambda function deployed from Lab 8
- ✅ Basic Prometheus dashboard working from Lab 2
- ✅ AWS account with access to CloudWatch
- ✅ Next.js app deployed to Vercel

### 🔍 Quick Test

```bash
# Verify Lambda is working
curl https://YOUR_API_GATEWAY_URL/health

# Verify local dashboard
curl http://localhost:5001/health

# Should both return healthy status
```

**All checked?** → You're ready for Lab 9!

### 📝 Important Note

This lab focuses on **understanding** production monitoring concepts and implementing **basic but essential** monitoring features. You'll use AWS free tier CloudWatch features and enhance your existing Prometheus setup.

---

## Part A: Understanding Production Monitoring

*Learn what makes production monitoring different from development*

### 1. What is Production Monitoring?

**Production monitoring** means tracking your application's health, performance, and behavior when it's live and serving real users.

**💡 Simple Analogy:**

Think of monitoring like a car's dashboard:
- **Development (Lab 2)** = Checking if the car starts
  - Does it run?
  - Are basic features working?

- **Production (Lab 9)** = Monitoring while driving
  - How fast are you going?
  - Is the engine overheating?
  - When do you need gas?
  - Are there any warning lights?

### 2. Why Monitor Production Systems?

**Without Monitoring:**
- ❌ You don't know when your service is down
- ❌ No idea how many users are affected by errors
- ❌ Can't see performance degradation until users complain
- ❌ No historical data for troubleshooting

**With Monitoring:**
- ✅ Know immediately when something breaks
- ✅ See trends and patterns in usage
- ✅ Catch problems before users notice
- ✅ Historical data for debugging and optimization
- ✅ Track costs and resource usage

### 3. The 4 Golden Signals of Monitoring

These are the four most important metrics to track:

**1. Latency (Speed):**
- How long does a request take?
- Our metric: `ai_response_time_seconds`

**2. Traffic (Volume):**
- How many requests are we getting?
- Our metric: `ai_requests_total`

**3. Errors (Failures):**
- What percentage of requests fail?
- Our metric: Error rate calculation

**4. Saturation (Resource Usage):**
- How "full" are our resources?
- Our metrics: Memory usage, CPU usage

### 4. Monitoring vs Logging vs Tracing

**Monitoring:**
- **What:** Numeric metrics over time (counts, percentages, averages)
- **Example:** "500 requests in the last minute, 2% failed"
- **Tool:** Prometheus, CloudWatch Metrics

**Logging:**
- **What:** Text records of events that happened
- **Example:** "2024-01-15 10:30:45 - ERROR - Database connection failed"
- **Tool:** CloudWatch Logs, application logs

**Tracing:**
- **What:** Following a single request through your entire system
- **Example:** "Request took 1.5s: 0.1s in API Gateway, 1.2s in Lambda, 0.2s in database"
- **Tool:** AWS X-Ray (not covered in this course)

### 5. Our Monitoring Stack

**What We've Built So Far (Lab 2):**
```
Flask MLOps Service
    ↓
Prometheus Client (collects metrics)
    ↓
/metrics endpoint (exposes metrics)
    ↓
dashboard.html (visualizes metrics)
```

**What We're Adding (Lab 9):**
```
AWS Lambda Function
    ↓
CloudWatch Metrics (automatic)
    ↓
CloudWatch Logs (automatic)
    ↓
CloudWatch Alarms (we'll set up)

+

Enhanced Flask Monitoring
    ↓
Detailed Health Checks
    ↓
Uptime Tracking
    ↓
Error Rate Monitoring
```

---

## Part B: Explore AWS CloudWatch

*Understand CloudWatch metrics and logs for your Lambda function*

### 1. What is AWS CloudWatch?

**CloudWatch** is AWS's monitoring service that automatically tracks your AWS resources (like Lambda functions).

**Think of it as:** A built-in monitoring system that AWS provides for free with every Lambda function.

### 2. Access Lambda Metrics

**View your Lambda function's metrics:**

1. Sign in to [AWS Console](https://console.aws.amazon.com)
2. Search for "Lambda" and open Lambda console
3. Click on your `mlops-service-lambda` function
4. Click the "Monitor" tab

**You should see several graphs:**

### 3. Understanding Lambda Metrics

**Invocations:**
- **What it shows:** How many times your Lambda was called
- **Why it matters:** Shows usage patterns and traffic volume
- **Good to know:** Spikes might indicate increased user activity or potential issues

**Duration:**
- **What it shows:** How long each Lambda execution took (in milliseconds)
- **Why it matters:** Tracks performance over time
- **Good to know:** Sudden increases might indicate performance problems

**Errors:**
- **What it shows:** Number of failed executions
- **Why it matters:** Directly tracks reliability
- **Good to know:** Any errors need investigation!

**Throttles:**
- **What it shows:** Requests rejected due to concurrency limits
- **Why it matters:** Users experience failures
- **Good to know:** Usually zero for low-traffic applications

**💡 Take a screenshot of your Lambda metrics dashboard for your lab submission!**

### 4. Explore CloudWatch Logs

**View your Lambda function's logs:**

1. In the Lambda Monitor tab, click "View CloudWatch logs"
2. You'll see a list of "Log streams"
3. Click on the most recent log stream
4. Browse through the logs

**What you'll see in the logs:**
```
START RequestId: abc123... Version: $LATEST
[INFO] 2024-01-15 10:30:45 - Successfully tracked metrics for business test-business
END RequestId: abc123...
REPORT RequestId: abc123... Duration: 145.67 ms Billed Duration: 146 ms Memory Size: 512 MB Max Memory Used: 67 MB
```

**Understanding the log format:**
- **START:** Lambda execution began
- **Your logs:** Output from your Flask app (logger.info, logger.error, etc.)
- **END:** Lambda execution completed
- **REPORT:** Performance metrics for this specific execution

**💡 Find a log entry that shows metrics being tracked and take a screenshot!**

### 5. Search CloudWatch Logs

**Try searching for specific events:**

1. In the CloudWatch Logs interface, click "Search"
2. Try these searches:
   - `ERROR` - Find all error messages
   - `Successfully tracked` - Find successful metric tracking
   - `business_id` - Find business-specific logs

**This is useful for:**
- Finding specific errors
- Debugging issues
- Understanding user behavior

---

## Part C: Set Up CloudWatch Alarm

*Get notified when your Lambda function has errors*

### 1. Why Set Up Alarms?

**Alarms notify you when something goes wrong** so you don't have to constantly check your dashboard.

**Example scenarios:**
- Your Lambda function starts throwing errors → You get an email
- Response time increases dramatically → You get notified
- Function is being throttled → You know immediately

### 2. Create an SNS Topic (for notifications)

**SNS (Simple Notification Service) sends you emails when alarms trigger.**

1. In AWS Console, search for "SNS"
2. Click "Topics" in left sidebar
3. Click "Create topic"
4. Configure:
   - **Type:** Standard
   - **Name:** `mlops-lambda-alerts`
   - **Display name:** MLOps Alerts
5. Click "Create topic"

**✅ Success Check:** You should see your new topic created

### 3. Create Email Subscription

**Set up email notifications:**

1. Click on your `mlops-lambda-alerts` topic
2. Click "Create subscription"
3. Configure:
   - **Protocol:** Email
   - **Endpoint:** Your email address
4. Click "Create subscription"

**Check your email:**
1. Look for "AWS Notification - Subscription Confirmation"
2. Click the "Confirm subscription" link
3. You should see "Subscription confirmed!"

**✅ Success Check:** Your subscription shows "Confirmed" status in AWS console

### 4. Create CloudWatch Alarm

**Set up alarm for Lambda errors:**

1. Go back to Lambda console → Your function
2. Click "Monitor" tab
3. Scroll down to "Metrics" section
4. Find the "Errors" metric
5. Click the three dots (...) next to Errors
6. Select "View in metrics"
7. Click the bell icon (🔔) above the graph
8. Click "Create alarm"

**Configure the alarm:**

**Step 1: Specify metric and conditions**
- **Metric name:** Errors (should be pre-filled)
- **Statistic:** Sum
- **Period:** 5 minutes
- **Threshold type:** Static
- **Whenever Errors is...:** Greater than
- **than...:** 0

**Step 2: Configure actions**
- **Alarm state trigger:** In alarm
- **Select an SNS topic:** Choose `mlops-lambda-alerts`

**Step 3: Add name and description**
- **Alarm name:** `mlops-lambda-errors`
- **Alarm description:** Alert when Lambda function has errors

**Step 4: Preview and create**
- Review your settings
- Click "Create alarm"

**✅ Success Check:** You should see your alarm in "In alarm" or "OK" state

### 5. Test the Alarm

**Trigger an error to test your alarm:**

```bash
# Send a bad request to your Lambda (missing required fields)
curl -X POST https://YOUR_API_GATEWAY_URL/track \
  -H "Content-Type: application/json" \
  -d '{}'

# This will cause an error because business_id is missing
```

**Wait 5-10 minutes**, then:

1. Check your email for an alarm notification
2. Go to CloudWatch → Alarms
3. Your alarm should be in "In alarm" state (red)

**Email will look like:**
```
ALARM: "mlops-lambda-errors" in US East (N. Virginia)

You are receiving this email because your Amazon CloudWatch Alarm
"mlops-lambda-errors" has entered the ALARM state...
```

**💡 Take a screenshot of the alarm notification email!**

**To reset the alarm:**
```bash
# Send a valid request
curl https://YOUR_API_GATEWAY_URL/health

# Wait 5-10 minutes for alarm to return to OK state
```

---

## Part D: Enhance Prometheus Dashboard

*Upgrade your local monitoring dashboard with production-grade metrics*

### 1. Understanding the Enhancements

**What we're adding to the dashboard:**
- Service uptime tracking
- Error rate monitoring
- Memory and CPU usage
- Request statistics
- Better visual indicators

**Why these matter:**
- **Uptime:** How long has the service been running without restart?
- **Error rate:** What percentage of requests are failing?
- **Resources:** Is the service running out of memory?
- **Request stats:** How much traffic are we handling?

### 2. Update Flask Dependencies

**Add system monitoring library:**

1. Open `mlops-service/requirements.txt`
2. The new dependency `psutil==5.9.8` should already be added
3. If not, add it after `python-dotenv==1.0.0`

**Install the new dependency:**

```bash
# In mlops-service directory
cd mlops-service

# Activate virtual environment
# Mac/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

**✅ Success Check:** Run `pip list | grep psutil` - should show psutil 5.9.8

### 3. Understanding the Enhanced Code

**The enhancements we've added include:**

**New endpoint `/health/detailed`:**
```python
@app.route('/health/detailed', methods=['GET'])
def detailed_health_check():
    # Returns comprehensive health information
    return jsonify({
        'status': 'healthy',
        'uptime': {...},      # How long service has been running
        'system': {...},      # Memory and CPU usage
        'requests': {...},    # Request statistics
        'health_checks': {...} # Component health status
    })
```

**Key features:**
- **Uptime tracking:** Calculates how long the service has been running
- **Resource monitoring:** Shows memory and CPU usage
- **Request counting:** Tracks total requests and failures
- **Error rate:** Calculates percentage of failed requests

### 4. Test the Enhanced Endpoints

**Test the new detailed health endpoint:**

```bash
# Test detailed health check
curl http://localhost:5001/health/detailed
```

**You should see output like:**
```json
{
  "status": "healthy",
  "service": "mlops-service-prometheus",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00.000000",
  "environment": "development",
  "uptime": {
    "seconds": 3600.45,
    "hours": 1.0,
    "days": 0.04,
    "started_at": "2024-01-15T09:30:00"
  },
  "system": {
    "memory_usage_mb": 145.23,
    "cpu_percent": 2.5,
    "process_id": 12345
  },
  "requests": {
    "total": 150,
    "failed": 3,
    "error_rate_percent": 2.0,
    "last_request": "2024-01-15T10:29:00"
  },
  "health_checks": {
    "database_connected": true,
    "prometheus_enabled": true,
    "metrics_tracking": "active"
  }
}
```

**💡 Take a screenshot of this detailed health response!**

### 5. View Enhanced Dashboard

**Start your Flask service:**

```bash
# In mlops-service directory
cd mlops-service

# Mac/Linux:
./start.sh

# Windows:
start.bat
```

**Open the enhanced dashboard:**

1. Go to http://localhost:5001/ in your browser
2. You should see the new dashboard with 10 metric cards

**The enhanced dashboard now shows:**

1. **Service Status** - Current health with environment
2. **Service Uptime** - How long it's been running
3. **Total Requests** - All tracked requests
4. **Error Rate** - Percentage with color coding:
   - 🟢 Green: < 5% (healthy)
   - 🟡 Yellow: 5-10% (warning)
   - 🔴 Red: > 10% (critical)
5. **Memory Usage** - Current memory and CPU
6. **Database Status** - Connection health
7. **Total Tokens Used** - AI usage
8. **Total API Cost** - Spending
9. **Appointments** - Booking requests
10. **Human Handoffs** - Escalations

**Dashboard features:**
- Auto-refreshes every 10 seconds
- Color-coded status indicators
- Click "🔄 Refresh Metrics" to manually update
- Links to all monitoring endpoints

**💡 Take a screenshot of the enhanced dashboard!**

### 6. Test Error Rate Visualization

**Generate some errors to see error rate change color:**

```bash
# Send a few bad requests
for i in {1..5}; do
  curl -X POST http://localhost:5001/track \
    -H "Content-Type: application/json" \
    -d '{}'
done

# Send some good requests
curl http://localhost:5001/health
curl http://localhost:5001/health/detailed
```

**Watch the dashboard:**
1. Error rate should increase
2. Color indicator might change from green to yellow
3. Failed request count increases

---

## Part E: Production Monitoring Best Practices

*Learn what to monitor and when to alert*

### 1. What Metrics to Track

**For our AI appointment system, prioritize:**

**Critical (Must Monitor):**
- ✅ Service availability (uptime)
- ✅ Error rate
- ✅ Lambda invocation count
- ✅ Response time

**Important (Should Monitor):**
- ✅ Memory usage
- ✅ Token usage (cost tracking)
- ✅ Appointment conversion rate
- ✅ Database connectivity

**Nice to Have (Good to Monitor):**
- ⭐ CPU usage
- ⭐ Individual business metrics
- ⭐ Time of day patterns
- ⭐ Geographic distribution

### 2. When to Set Up Alerts

**Create alerts for:**

**Immediate Action Required:**
- Error rate > 10%
- Service down (no heartbeat)
- Lambda throttling occurs
- Database connection lost

**Investigation Needed:**
- Error rate > 5%
- Response time > 5 seconds
- Memory usage > 80%
- Unusual traffic spike

**Don't Alert For:**
- Individual successful requests
- Normal traffic patterns
- Minor resource fluctuations
- Cosmetic issues

### 3. Log Levels and When to Use Them

**INFO:**
- Normal operations
- Successful requests
- Example: "Successfully tracked metrics for business XYZ"

**WARNING:**
- Potential issues that recovered
- Degraded performance
- Example: "Database query slow (2.5s), retrying..."

**ERROR:**
- Failed operations
- Unhandled exceptions
- Example: "Failed to store metrics: Database connection lost"

**DEBUG:**
- Detailed information for troubleshooting
- Only use in development
- Example: "Metrics data received: {full_json_payload}"

### 4. Understanding Cold Starts (Lambda-specific)

**Cold Start:**
- First request after Lambda has been idle
- Takes 1-3 seconds longer
- Normal behavior, not an error

**In CloudWatch, you'll see:**
- Init Duration: ~1000ms (one-time setup)
- Duration: ~200ms (actual processing)

**Don't alert on:**
- Occasional slow requests (likely cold starts)
- Single timeout errors

**Do alert on:**
- Consistently slow requests (performance issue)
- High error rates (actual problems)

---

## Part F: Compare Monitoring Approaches

*Understand the difference between CloudWatch and Prometheus*

### 1. CloudWatch vs Prometheus

**AWS CloudWatch:**
- ✅ Automatic for AWS services
- ✅ No setup required for Lambda
- ✅ Integrated with AWS alarms
- ✅ Logs and metrics in one place
- ❌ AWS-only (not portable)
- ❌ Limited customization
- ❌ Costs money beyond free tier

**Prometheus (Your Dashboard):**
- ✅ Works anywhere (AWS, local, other clouds)
- ✅ Highly customizable
- ✅ Free and open source
- ✅ Rich query language
- ❌ Requires manual setup
- ❌ Need to maintain infrastructure
- ❌ More complex to scale

### 2. When to Use Each

**Use CloudWatch when:**
- Monitoring AWS services (Lambda, EC2, RDS)
- Need AWS-integrated alerts
- Want automatic setup
- Quick production monitoring

**Use Prometheus when:**
- Custom application metrics
- Multi-cloud deployments
- Advanced querying needs
- Long-term metric storage

**Best Practice (What we do):**
- **CloudWatch:** Infrastructure monitoring (Lambda health, errors)
- **Prometheus:** Application monitoring (AI metrics, business KPIs)
- **Both together:** Complete observability

### 3. Monitoring in Different Environments

**Development (Lab 2):**
- Dashboard on http://localhost:5001
- Check logs in terminal
- Manual testing

**Serverless Production (Lab 8 + Lab 9):**
- CloudWatch Metrics for Lambda health
- CloudWatch Logs for debugging
- CloudWatch Alarms for critical issues
- Prometheus for application metrics

**Container Production (Lab 7):**
- EC2 CloudWatch metrics for server health
- Container logs
- Application-level Prometheus metrics

---

## Troubleshooting

### CloudWatch logs not showing:

**Check Lambda permissions:**
- Lambda needs CloudWatch Logs permissions
- Should be automatic with default Lambda role
- Verify in IAM console → Roles → your-lambda-execution-role

### Alarm not triggering:

**Common issues:**
- Email subscription not confirmed (check email)
- Wrong threshold (too high to trigger)
- Not enough time passed (wait 5-10 minutes)
- Function not actually erroring

### Dashboard not loading:

**Check Flask service:**
```bash
# Verify Flask is running
curl http://localhost:5001/health

# Check if port is in use
lsof -i :5001  # Mac/Linux
netstat -ano | findstr :5001  # Windows
```

### Enhanced metrics showing zeros:

**Solution:**
- Service was just restarted (uptime resets)
- No requests yet (request count is zero)
- Send some test requests:
```bash
curl http://localhost:5001/health
curl http://localhost:5001/metrics
```

### psutil installation fails:

**Windows users:**
- May need Visual C++ Build Tools
- Alternative: Comment out CPU monitoring in code

**Mac users:**
- Should work out of the box
- If issues, try: `pip install --upgrade pip`

### Dashboard shows "Cannot connect to MLOps service":

**Solutions:**
1. Verify Flask service is running on port 5001
2. Check no other service is using port 5001
3. Try accessing http://localhost:5001/health directly
4. Check firewall isn't blocking localhost connections

---

## Lab 9 Summary - What You Built

Congratulations! You've implemented production monitoring for your AI application. Here's what you accomplished:

### ✅ Production Monitoring Skills Gained

- **CloudWatch Understanding:** AWS monitoring basics
- **Alarm Setup:** Proactive error notifications
- **Enhanced Metrics:** Uptime, error rates, system health
- **Log Analysis:** Finding and understanding errors
- **Monitoring Strategy:** Knowing what to track and why

### 🚀 What You Built

- **CloudWatch Alarms:** Email notifications for Lambda errors
- **Enhanced Health Checks:** Detailed production status
- **Improved Dashboard:** 10 comprehensive metrics with visualization
- **Request Tracking:** Total requests, failures, error rates
- **Resource Monitoring:** Memory and CPU usage tracking

### 🎯 Real-World Impact

You now have monitoring that real companies use:

- **Error Detection:** Know immediately when something breaks
- **Performance Tracking:** See if your service is getting slower
- **Cost Monitoring:** Track API usage and spending
- **Capacity Planning:** Understand resource usage patterns

### 📊 Monitoring Coverage

**What You're Now Monitoring:**

**Infrastructure Level (CloudWatch):**
```
AWS Lambda
  ↓
Invocations, Duration, Errors, Throttles
  ↓
CloudWatch Alarms → Email Notifications
```

**Application Level (Prometheus + Dashboard):**
```
Flask MLOps Service
  ↓
Uptime, Requests, Error Rate, Resources
  ↓
Enhanced Dashboard → Visual Metrics
```

### 🔑 Key Takeaways

- **Monitor production differently** than development
- **The 4 golden signals** cover most monitoring needs
- **Alarms prevent surprises** by notifying you of issues
- **CloudWatch is automatic** for AWS services
- **Prometheus gives flexibility** for custom metrics
- **Combine both** for complete observability

### 💡 Monitoring Best Practices Learned

**Do:**
- ✅ Alert on error rates, not individual errors
- ✅ Track the 4 golden signals
- ✅ Use structured logging
- ✅ Set meaningful alert thresholds
- ✅ Monitor both infrastructure and application

**Don't:**
- ❌ Alert on everything (alert fatigue)
- ❌ Only monitor in production
- ❌ Ignore cold start spikes in Lambda
- ❌ Set thresholds too sensitive
- ❌ Forget to test your alarms

### 🎯 What's Next?

**You now have:**
- Monitoring for deployed services
- Alerts for critical issues
- Dashboards for metrics visualization
- Understanding of production observability

**In upcoming labs:**
- Lab 10: Security & Compliance
- Lab 11-12: Final Integration & Analysis

---

## 📝 Test Your Knowledge

**Complete the Lab 9 Quiz** to test your understanding of production monitoring and logging concepts.

**[Take Lab 9 Quiz →](https://chat.leverlabs.co/quizzes/lab9-quiz.html)**

After completing the quiz, take a screenshot of your results page for submission. The screenshot will include:
- Your name
- Your score
- A unique Session ID
- Timestamp
- Browser information

---

## 📸 Lab 9 Submission Checklist

Make sure you have screenshots of:

1. **CloudWatch Lambda Metrics** dashboard showing invocations, duration, errors
2. **CloudWatch Logs** showing a successful metrics tracking log entry
3. **CloudWatch Alarm** notification email
4. **Enhanced Health Check** JSON response (curl output)
5. **Enhanced Dashboard** showing all 10 metrics
6. **Quiz Results** page with your score

---

**Navigation:**
- [← Lab 8: Serverless Deployment](/labs/lab8)
- [Lab 10: Security & Compliance →](/labs/lab10)
- [Back to Labs →](/labs)
