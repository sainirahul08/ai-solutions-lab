# Lab 7: Cloud Deployment with AWS

**Level:** Advanced
**Technology:** AWS EC2 + Vercel

Deploy your complete AI application stack to production: Next.js to Vercel and Flask MLOps service to AWS EC2.

## Lab Overview

**What You'll Do:** Deploy Next.js to Vercel (production), deploy Flask MLOps container to AWS EC2, and connect everything for a live production system

**Lab Collaborators:**
- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

## 🚨 Prerequisites Required

You must complete Labs 1-6 with working Docker containers and Kubernetes knowledge before starting Lab 7.

## Prerequisites Check

**Before starting Lab 7, ensure you have:**

- ✅ Docker image built: `docker images | grep mlops-service`
- ✅ Kubernetes deployment working from Lab 6
- ✅ Next.js app running locally
- ✅ AWS account created (from Lab 1)
- ✅ Credit/debit card for AWS (using free tier only)

### 🔍 Quick Test

```bash
# Verify Docker image exists
docker images | grep mlops-service

# Verify Next.js builds
npm run build

# Should complete without errors
```

**All checked?** → You're ready for Lab 7!

### 📝 Important Note

This lab uses **AWS free tier** exclusively. Everything you'll do in this lab is covered under AWS free tier - you won't be charged as long as you use the resources specified in this lab (t2.micro instance, 8 GB storage).

---

## Part A: Understanding Cloud Deployment

*Learn what cloud deployment means and why it's essential*

### 1. What is Cloud Deployment?

**Cloud deployment** means running your application on servers managed by cloud providers (AWS, Google Cloud, Azure) instead of your own computer.

**💡 Simple Analogy:**

Think of cloud deployment like renting vs. owning:
- **Local Development** = Cooking in your own kitchen
- **Cloud Deployment** = Running a restaurant with rented space and utilities
  - You don't maintain the building
  - You pay for what you use
  - You can scale up/down as needed
  - Professional infrastructure

### 2. Why Deploy to the Cloud?

**Local Development Problems:**
- ❌ Only accessible when your computer is on
- ❌ Limited to your computer's resources
- ❌ Not accessible to users on the internet
- ❌ No redundancy (if it crashes, it's down)

**Cloud Deployment Benefits:**
- ✅ Available 24/7
- ✅ Accessible from anywhere in the world
- ✅ Automatic scaling based on demand
- ✅ Professional monitoring and backups
- ✅ Pay only for what you use

### 3. Our Cloud Architecture

**What We're Deploying:**

```
Users (Internet)
    ↓
Next.js App (Vercel)
    ↓
Flask MLOps Service (AWS EC2)
    ↓
Neon PostgreSQL (Already Cloud-Based)
```

**Service Breakdown:**
- **Next.js on Vercel:** Frontend + API routes, optimized for Next.js
- **Flask on AWS EC2:** MLOps service in Docker container on virtual machine
- **Neon Database:** Already serverless, no deployment needed

### 4. AWS EC2 Basics

**What is EC2?**
- **EC2** = Elastic Compute Cloud
- A virtual computer running in AWS data centers
- You rent it by the hour
- Can run any software (Linux, Windows, Docker, etc.)

**💡 Think of EC2 as:**
- Renting a computer in Amazon's data center
- You get full control (install Docker, run containers, etc.)
- You pay for uptime (running hours)
- Can start/stop whenever needed

---

## Part B: Deploy Next.js to Vercel

*Deploy your Next.js application to production hosting*

### 1. What is Vercel?

**Vercel** is a platform built specifically for Next.js applications:
- Created by the team that built Next.js
- Automatic deployments from GitHub
- Global CDN (fast anywhere in the world)
- Free tier for hobby projects
- SSL certificates included

### 2. Connect GitHub Repository

**Sign in to Vercel:**

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

**Import Your Project:**

1. Click "Add New Project"
2. Find your `ai-solutions-lab` repository
3. Click "Import"
4. Vercel will detect it's a Next.js app automatically

### 3. Configure Environment Variables

**Before deploying, add your environment variables:**

1. On the project import page, scroll to "Environment Variables"
2. Add each variable (click "Add Another" after each):

**Required Variables:**
```
DATABASE_URL=your_neon_database_url_here
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
MLOPS_SERVICE_URL=http://localhost:5001
```

**💡 Note:** We'll update `MLOPS_SERVICE_URL` later after deploying Flask to AWS.

### 4. Deploy to Vercel

**Start the deployment:**

1. Click "Deploy" button
2. Wait 2-3 minutes for build to complete
3. You'll see "Congratulations!" when done
4. Click "Visit" to see your live site

**✅ Success Check:** Your Next.js app is now live! You'll get a URL like `your-project.vercel.app`

### 5. Test Your Deployment

**Test the deployed site:**

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Click "TRY IT FREE - NO SIGNUP"
3. Set up a test business
4. Try the chat (it won't track metrics yet - we need Flask deployed)

**Expected Behavior:**
- ✅ Landing page loads
- ✅ Setup wizard works
- ✅ Chat interface appears
- ❌ Metrics tracking fails (Flask not deployed yet)

### 6. Get Your Production URL

**Copy your production URL:**

1. Go to Vercel dashboard
2. Click on your project
3. Copy the production URL (e.g., `https://ai-receptionist-abc123.vercel.app`)
4. Save this - you'll need it for AWS environment variables

---

## Part C: AWS Account & IAM Setup

*Prepare your AWS account for EC2 deployment*

### 1. Sign in to AWS Console

**Access AWS:**

1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click "Sign In to the Console"
3. Enter your AWS account credentials (created in Lab 1)
4. You'll land on the AWS Management Console

### 2. Select Your Region

**Choose a region close to you:**

1. Look at the top-right corner of AWS Console
2. Click the region dropdown (e.g., "N. Virginia")
3. Choose a region near your location:
   - **US East (N. Virginia)** - us-east-1
   - **US West (Oregon)** - us-west-2
   - **EU (Ireland)** - eu-west-1
   - **Asia Pacific (Singapore)** - ap-southeast-1

**💡 Important:** Remember your region - you'll need it later!

### 3. Create EC2 Key Pair

**Key pairs let you securely access your EC2 instance:**

1. In AWS Console search bar, type "EC2" and click it
2. In left sidebar, click "Key Pairs" (under Network & Security)
3. Click "Create key pair" button
4. Configure:
   - **Name:** `mlops-service-key`
   - **Key pair type:** RSA
   - **Private key format:** `.pem` (for Mac/Linux) or `.ppk` (for Windows PuTTY)
5. Click "Create key pair"
6. **File downloads automatically** - save it securely!

**⚠️ Security Warning:**
- This file is your access key - don't lose it!
- Don't share it or commit to GitHub
- If lost, you can't access your EC2 instance

**Mac/Linux - Set Permissions:**
```bash
# Move key to a safe location
mv ~/Downloads/mlops-service-key.pem ~/.ssh/

# Set proper permissions (required)
chmod 400 ~/.ssh/mlops-service-key.pem
```

**Windows:**
- Save the `.ppk` file in a secure folder
- Remember the location for later

### 4. Create Security Group

**Security groups control network access to your EC2 instance:**

1. In EC2 console, click "Security Groups" (left sidebar)
2. Click "Create security group"
3. Configure:
   - **Name:** `mlops-service-sg`
   - **Description:** Security group for MLOps Flask service
   - **VPC:** Leave default

4. Add **Inbound Rules** (click "Add rule" for each):

   **Rule 1 - SSH Access:**
   - Type: SSH
   - Port: 22
   - Source: My IP (automatically uses your current IP)

   **Rule 2 - Flask Service:**
   - Type: Custom TCP
   - Port: 5001
   - Source: Anywhere IPv4 (0.0.0.0/0)

   **Rule 3 - HTTP (optional, for testing):**
   - Type: HTTP
   - Port: 80
   - Source: Anywhere IPv4 (0.0.0.0/0)

5. Click "Create security group"

**✅ Success Check:** You should see your new security group in the list.

---

## Part D: Deploy Flask to AWS EC2

*Launch an EC2 instance and run your Docker container*

### 1. Launch EC2 Instance

**Start the instance creation:**

1. Go to EC2 Dashboard (search "EC2" in AWS Console)
2. Click "Launch instance" button
3. You'll see the launch wizard

### 2. Configure Instance Details

**Name and tags:**
- **Name:** `mlops-service-production`

**Application and OS Images (Amazon Machine Image):**
1. Select "Ubuntu" tab
2. Choose "Ubuntu Server 22.04 LTS (HVM), SSD Volume Type"
3. Keep "64-bit (x86)" architecture

**Instance type:**
- Select **t2.micro** (free tier - required for this course)
- 1 vCPU, 1 GB RAM
- Good enough for our MLOps service
- **Important:** Only use t2.micro to stay within free tier

**Key pair:**
- Select the key pair you created: `mlops-service-key`

**Network settings:**
- Click "Edit"
- **Firewall (security groups):** Select existing security group
- Choose `mlops-service-sg` (the one you created)

**Configure storage:**
- **Size:** 8 GB (default)
- **Type:** gp3 (default)

### 3. Launch Instance

**Review and launch:**

1. Review your configuration in the Summary panel
2. Click "Launch instance"
3. Wait for "Success" message
4. Click "View all instances"

**✅ Success Check:** You should see your instance with "Running" state (takes 1-2 minutes)

### 4. Get Instance Public IP

**Find your instance's public IP address:**

1. In EC2 Instances list, find `mlops-service-production`
2. Check the "Instance state" - should be "Running"
3. Look at "Public IPv4 address" column
4. Copy this IP address (e.g., `54.123.45.67`)

**💡 Save this IP - you'll use it throughout this lab!**

### 5. Connect to Your EC2 Instance

**Mac/Linux - SSH Connection:**

```bash
# Connect via SSH (replace with your IP address)
ssh -i ~/.ssh/mlops-service-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# Example:
# ssh -i ~/.ssh/mlops-service-key.pem ubuntu@54.123.45.67

# First time: Type "yes" when asked about authenticity
```

**Windows - Using PuTTY:**

1. Open PuTTY
2. In "Host Name": `ubuntu@YOUR_EC2_PUBLIC_IP`
3. Port: 22
4. Connection type: SSH
5. In left menu: Connection → SSH → Auth → Credentials
6. Browse to your `.ppk` file
7. Click "Open"

**✅ Success Check:** You should see Ubuntu welcome message and a command prompt like `ubuntu@ip-xxx-xxx-xxx-xxx:~$`

### 6. Install Docker on EC2

**Once connected to EC2, install Docker:**

```bash
# Update package list
sudo apt-get update

# Install prerequisites
sudo apt-get install -y ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Set up Docker repository
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add ubuntu user to docker group
sudo usermod -aG docker ubuntu

# Log out and back in for group change to take effect
exit
```

**Reconnect to EC2:**

```bash
# Reconnect via SSH
ssh -i ~/.ssh/mlops-service-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

**Verify Docker installation:**

```bash
# Check Docker version
docker --version

# Test Docker (should run without sudo)
docker run hello-world
```

**✅ Success Check:** You should see "Hello from Docker!" message.

### 7. Transfer Docker Image to EC2

**Option 1: Rebuild on EC2 (Recommended)**

```bash
# On EC2, clone your repository
git clone https://github.com/YOUR_USERNAME/ai-solutions-lab.git
cd ai-solutions-lab/mlops-service

# Build Docker image on EC2
docker build -t mlops-service:latest .

# Verify image
docker images | grep mlops-service
```

**Option 2: Push to Docker Hub and Pull on EC2 (Alternative)**

*If you prefer to use Docker Hub:*

```bash
# On your local machine
docker tag mlops-service:latest YOUR_DOCKERHUB_USERNAME/mlops-service:latest
docker push YOUR_DOCKERHUB_USERNAME/mlops-service:latest

# On EC2
docker pull YOUR_DOCKERHUB_USERNAME/mlops-service:latest
docker tag YOUR_DOCKERHUB_USERNAME/mlops-service:latest mlops-service:latest
```

### 8. Create Environment File on EC2

**Create .env file with production variables:**

```bash
# On EC2, create .env file
cd ~/ai-solutions-lab/mlops-service
nano .env
```

**Add these variables (use your actual values):**

```env
# Database (your Neon PostgreSQL URL)
DATABASE_URL=postgresql://username:password@host/database?sslmode=require

# Flask Configuration
FLASK_ENV=production
FLASK_DEBUG=False

# Service Configuration
SERVICE_PORT=5001
PROMETHEUS_PORT=8001
ENVIRONMENT=production

# Next.js App URL (your Vercel URL)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**Save and exit nano:**
- Press `Ctrl + O` to save
- Press `Enter` to confirm
- Press `Ctrl + X` to exit

### 9. Run Docker Container on EC2

**Start your Flask MLOps service:**

```bash
# Run container in detached mode
docker run -d \
  --name mlops-service \
  --restart unless-stopped \
  -p 5001:5001 \
  --env-file .env \
  mlops-service:latest

# Check if container is running
docker ps

# View logs
docker logs mlops-service

# Follow logs in real-time
docker logs -f mlops-service
```

**✅ Success Check:** Container should show "Running" status.

### 10. Test Flask Service on EC2

**Test from within EC2:**

```bash
# Test health endpoint
curl http://localhost:5001/health

# Should return healthy status
```

**Test from your local machine:**

```bash
# Replace with your EC2 public IP
curl http://YOUR_EC2_PUBLIC_IP:5001/health

# Example:
# curl http://54.123.45.67:5001/health
```

**✅ Success Check:** You should see the health response JSON.

---

## Part E: Connect Services & Update Environment Variables

*Link Vercel and AWS together for production system*

### 1. Update Vercel Environment Variables

**Add Flask service URL to Vercel:**

1. Go to [vercel.com](https://vercel.com)
2. Click on your project
3. Go to Settings → Environment Variables
4. Find `MLOPS_SERVICE_URL`
5. Click "Edit"
6. Update to: `http://YOUR_EC2_PUBLIC_IP:5001`
7. Click "Save"

**Trigger redeployment:**

1. Go to Deployments tab
2. Click on the latest deployment
3. Click "Redeploy" button
4. Wait for deployment to complete

### 2. Test End-to-End Integration

**Test the complete flow:**

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Create a new business or use existing
3. Open the chat interface
4. Send a message to the AI
5. Check if metrics are tracked

**Verify metrics on AWS:**

```bash
# SSH into EC2
ssh -i ~/.ssh/mlops-service-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# Check Flask logs for incoming metrics
docker logs -f mlops-service

# Check metrics endpoint
curl http://localhost:5001/metrics | grep ai_requests_total
```

**✅ Success Indicators:**
- AI chat responds on Vercel
- Flask logs show incoming `/track` requests
- Metrics endpoint shows updated counters
- No errors in browser console or Flask logs

### 3. Configure CORS for Production

**If you encounter CORS errors, update Flask app:**

On your local machine, edit `mlops-service/app.py`:

```python
# Update CORS configuration
CORS(app, origins=[
    "http://localhost:3000",           # Local development
    "https://your-app.vercel.app",     # Production Vercel
    "https://*.vercel.app"             # Vercel preview deployments
])
```

**Deploy the update:**

```bash
# Commit changes
git add mlops-service/app.py
git commit -m "Update CORS for production"
git push origin main

# SSH to EC2
ssh -i ~/.ssh/mlops-service-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# Pull latest code
cd ~/ai-solutions-lab
git pull origin main

# Rebuild and restart container
cd mlops-service
docker stop mlops-service
docker rm mlops-service
docker build -t mlops-service:latest .
docker run -d \
  --name mlops-service \
  --restart unless-stopped \
  -p 5001:5001 \
  --env-file .env \
  mlops-service:latest
```

---

## Part F: Understanding AWS Free Tier

*Learn about AWS free tier and how to track your usage*

### 1. Understanding AWS Costs

**AWS Free Tier (What We're Using):**

- **EC2 t2.micro:** 750 hours/month for 12 months (enough for 24/7 operation with one instance)
- **Storage (EBS):** 30 GB included in free tier (we're using 8 GB)
- **Data transfer:** 1 GB outbound free per month

**💡 Staying Within Free Tier:**
- Use only ONE t2.micro instance
- Keep it running under 750 hours/month (31 days = 744 hours - you're covered!)
- Use 8 GB storage (well under 30 GB limit)
- Free tier is valid for 12 months from AWS account creation

### 2. Enable Free Tier Usage Alerts (Optional)

**Get notifications about your free tier usage:**

1. Go to AWS Console
2. Search for "Billing" and click "Billing and Cost Management"
3. Click "Billing preferences" in left sidebar
4. Enable:
   - ✅ Receive Free Tier Usage Alerts
5. Enter your email address
6. Click "Save preferences"

**What this does:**
- AWS will email you when you approach 85% of free tier limits
- Helpful to know your usage, but not required
- This lab stays well within limits, so you shouldn't receive alerts

### 3. Check Your Free Tier Usage (Optional)

**View what you're using:**

1. Go to "Billing Dashboard"
2. Click "Free Tier" in left sidebar
3. You'll see:
   - EC2 instance hours used (out of 750/month)
   - Storage used (out of 30 GB)
   - Data transfer used

**What you should see:**
- EC2: A few hours used (well under 750 limit)
- Storage: 8 GB (well under 30 GB limit)
- Everything in the green/safe zone

### 4. Free Tier Tips

**Staying within free tier:**

- **Use only what's in this lab:** t2.micro instance, 8 GB storage
- **Don't launch additional instances:** One t2.micro is enough
- **Free tier = 750 hours/month:** Running one instance 24/7 uses only 744 hours - you're covered!
- **After the course:** Remember to terminate your EC2 instance when you're done learning

**Terminate EC2 instance when finished with the course:**

```bash
# Via AWS Console (recommended):
# 1. Go to EC2 → Instances
# 2. Select your instance
# 3. Instance state → Terminate instance
# 4. Confirm termination

# This removes the instance completely
# Do this when you're completely done with the course
```

---

## Troubleshooting

### Cannot connect to EC2 via SSH:

**Check security group allows your IP:**
1. EC2 → Security Groups → mlops-service-sg
2. Inbound rules → SSH (port 22) → Source
3. Update to "My IP" if changed

### Flask container not accessible from internet:

**Verify security group port 5001:**
- Make sure port 5001 is open to 0.0.0.0/0 in security group
- Check Docker logs: `docker logs mlops-service`

### CORS errors on Vercel:

**Update CORS origins in Flask app:**
- Add your Vercel domain to allowed origins
- Rebuild and redeploy Docker container

### Metrics not appearing:

**Check MLOPS_SERVICE_URL in Vercel:**
- Settings → Environment Variables
- Should be `http://EC2_PUBLIC_IP:5001` (not https)
- Redeploy after changing

### Docker build fails on EC2:

**Check disk space:**
```bash
df -h
# If low, clean up: docker system prune -a
```

### Seeing unexpected charges:

**This shouldn't happen with this lab, but if you do see charges:**
- Verify you selected t2.micro (not t2.small or larger)
- Check if you accidentally launched multiple instances
- Make sure you're within your 12-month free tier period
- Contact AWS support - they're usually helpful with accidental charges

---

## Lab 7 Summary - What You Deployed

Congratulations! You've deployed a complete production AI application to the cloud. Here's what you accomplished:

### ✅ Cloud Deployment Skills Gained

- **Vercel Deployment:** Production Next.js hosting with automatic builds
- **AWS EC2:** Virtual machine management and Docker deployment
- **Cloud Architecture:** Multi-service cloud infrastructure
- **Environment Management:** Secure production configuration
- **Free Tier Management:** Understanding AWS free tier limits

### 🚀 What You Built

- **Production Next.js App:** Live at your Vercel URL, accessible worldwide
- **Production Flask Service:** Running 24/7 on AWS EC2
- **Integrated System:** Vercel → AWS → Neon Database
- **Prometheus Metrics:** Real-time monitoring in production
- **Secure Configuration:** Environment variables properly managed

### 🎯 Real-World Impact

You've now deployed a production AI application using the same architecture as real companies:

- **Vercel:** Used by companies like GitHub, HashiCorp, and Uber
- **AWS EC2:** Powers Netflix, Airbnb, and millions of applications
- **Multi-Region:** Your app is accessible from anywhere in the world
- **Professional Setup:** Industry-standard deployment practices

### 📊 Your Production Architecture

```
Users (Worldwide)
    ↓
Next.js App (Vercel Global CDN)
    ↓
Flask MLOps Service (AWS EC2 + Docker)
    ↓
Neon PostgreSQL (Serverless Database)
    ↓
Prometheus Metrics (Real-time Monitoring)
```

### 🔑 Key Takeaways

- **Cloud providers handle infrastructure** so you focus on code
- **Vercel optimizes Next.js** automatically (CDN, caching, edge functions)
- **EC2 gives full control** over your server environment
- **Docker ensures consistency** between local and production
- **AWS free tier covers everything** in this lab - no charges when following instructions
- **Environment variables protect secrets** across deployments

### 💡 Cost Summary (After Free Tier)

- **Vercel:** Free tier is generous (hobby projects)
- **AWS EC2 t2.micro:** ~$8-10/month if running 24/7
- **Neon PostgreSQL:** Free tier available
- **Total estimated:** ~$10-15/month for small projects

### 🎯 Next Steps: Lab 8

In Lab 8, you'll convert your Flask MLOps service to AWS Lambda (serverless), which will:
- Reduce costs (pay only for actual usage)
- Auto-scale automatically
- Eliminate server management
- Compare performance vs. EC2

---

## 📝 Test Your Knowledge

**Complete the Lab 7 Quiz** to test your understanding of cloud deployment concepts with AWS EC2 and Vercel.

**[Take Lab 7 Quiz →](https://chat.leverlabs.co/quizzes/lab7-quiz.html)**

After completing the quiz, take a screenshot of your results page for submission. The screenshot will include:
- Your name
- Your score
- A unique Session ID
- Timestamp
- Browser information

---

**Navigation:**
- [← Lab 6: Kubernetes](/labs/lab6)
- [Back to Labs →](/labs)
