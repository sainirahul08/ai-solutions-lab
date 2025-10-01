# Lab 4: Deployment Pipelines (CI/CD)

**Level:** Advanced
**Technology:** GitHub Actions

Build automated testing pipelines with GitHub Actions and learn manual deployment staging with Vercel.

## Lab Overview

**What You'll Do:** Create automated testing pipelines that test your code on every commit and deploy to Vercel staging manually

**Lab Collaborators:**
- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

## 🚨 Prerequisites Required

You must complete Labs 1, 2, & 3 with working tests before starting Lab 4.

## Prerequisites Check

**Before starting Lab 4, ensure you have:**

- ✅ GitHub repository with your code (forked from the lab)
- ✅ Working Next.js application
- ✅ Working Flask MLOps service
- ✅ Passing tests from Lab 3: `pytest test_app.py`
- ✅ GitHub account with push access to your repository

### 🔍 Quick Test

1. `git status` - should show your repo
2. `npm run build` - should build successfully
3. `cd mlops-service && pytest test_app.py` - all tests pass
4. If all work, you're ready for Lab 4!

## Part A: GitHub Repository Setup

*Set up your GitHub repository for automated deployments*

### 1. Repository Configuration

**Enable GitHub Actions (if not already enabled):**

1. Go to your GitHub repository
2. Click the "Actions" tab
3. If prompted, click "I understand my workflows, go ahead and enable them"
4. You should see a message about workflows being enabled

### 2. Environment Variables

**Ensure your environment variables are properly configured:**

1. Verify your `.env` file exists with required variables
2. Check that `.env` is listed in `.gitignore`
3. Environment variables will be configured directly in Vercel dashboard

#### Required Variables:
- `DATABASE_URL` - Your Neon database URL
- `GOOGLE_GENERATIVE_AI_API_KEY` - Your Gemini API key
- `NEXT_PUBLIC_APP_URL` - Your app URL

#### 🔐 Security Note
Never commit `.env` files to your repository! The `.gitignore` file prevents accidental commits of secrets.

## Part B: Next.js Testing Pipeline

*Create automated testing for your Next.js application*

### 1. GitHub Actions Workflow

Your repository already includes the workflow files. Let's examine what they do:

**Next.js workflow location:** `.github/workflows/nextjs-ci.yml`

#### What the Next.js Pipeline Does:

- **Triggers:** Runs on push to main/develop, or pull requests
- **Setup:** Installs Node.js 18 and dependencies
- **Testing:** Runs comprehensive test suite with Jest
- **Linting:** Runs ESLint for code quality
- **Type Checking:** Validates TypeScript types
- **Building:** Creates production build to verify deployment readiness

### 2. Trigger Your First Workflow

**Make a simple change to trigger the pipeline:**

```bash
# Make a small change to trigger CI
echo "<!-- CI/CD Pipeline Test -->" >> README.md

# Commit and push
git add README.md
git commit -m "test: trigger CI/CD pipeline"
git push origin main
```

**Watch your workflow run:**

1. Go to your GitHub repository
2. Click the "Actions" tab
3. You should see your workflow running
4. Click on the workflow to see detailed logs

#### ✅ Success Indicators
- Green checkmark next to your commit
- "Test Next.js Application" job completes successfully
- All tests pass
- Build creates `.next` directory

## Part C: MLOps Service Testing Pipeline

*Automate testing of your Flask MLOps service*

### 1. MLOps Workflow Overview

**MLOps workflow location:** `.github/workflows/mlops-ci.yml`

#### What the MLOps Pipeline Does:

- **Test Job:** Runs your Lab 3 pytest suite automatically
- **Flask Startup:** Tests that the Flask service can start
- **Security:** Basic security scanning with Bandit
- **Code Quality:** Validates Python code structure

### 2. Test MLOps Pipeline

**Make a change to the MLOps service:**

```bash
# Navigate to MLOps service
cd mlops-service

# Add a comment to trigger the pipeline
echo "# CI/CD Pipeline Test" >> app.py

# Commit and push
git add app.py
git commit -m "test: trigger MLOps CI/CD pipeline"
git push origin main
```

**Watch both workflows run:**

1. Go to Actions tab in GitHub
2. You should see "MLOps Testing Pipeline" running
3. Click to see: Test → Security Scan jobs
4. Notice how your Lab 3 tests run automatically!

### 💡 Key Learning

Your Lab 3 tests are now part of automated testing:
- Every commit runs `pytest test_app.py` automatically
- Failed tests are immediately visible in GitHub
- This catches bugs before they reach staging or production

## Part D: Manual Vercel Deployment

### 1. Vercel Staging Setup

Deploy your Next.js application to Vercel for staging:

**Steps to deploy:**

1. Visit [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project" and import your repository
3. Configure environment variables in Vercel dashboard
4. Deploy to staging environment

### 2. Configure Environment Variables in Vercel

In your Vercel project dashboard:

1. Go to Settings → Environment Variables
2. Add each variable:
   - `DATABASE_URL` - Your Neon database URL
   - `GOOGLE_GENERATIVE_AI_API_KEY` - Your Gemini API key
   - `NEXT_PUBLIC_APP_URL` - Your Vercel app URL

### 3. Environment File Template

Your repository includes `.env.example` with all required variables:

```bash
# Copy the example file for local development
cp .env.example .env

# Edit with your actual values
code .env  # or your preferred editor
```

#### ⚠️ Never Commit .env Files
The `.env` file is in `.gitignore` to prevent accidental commits of secrets.

## Part E: Advanced Pipeline Features

### 1. Branch Protection Rules

**Set up branch protection (optional but recommended):**

1. Go to Settings → Branches
2. Click "Add rule" for main branch
3. Enable "Require status checks to pass"
4. Select your CI workflows as required checks

### 2. Testing Integration

**The workflows provide comprehensive testing:**

- **Next.js:** Jest test suite covering all application features
- **MLOps Service:** Pytest suite from Lab 3
- **Integration:** Both services tested independently

### 3. Monitoring Deployments

**Watch your deployments:**

```bash
# Check deployment status
git log --oneline -5

# Each commit should show:
# ✅ All checks have passed (green checkmarks)
# or
# ❌ Some checks failed (red X marks)
```

#### 🔍 Debugging Failed Tests

1. Go to Actions tab → Click failed workflow
2. Click the failed job to see logs
3. Look for error messages in red
4. Fix the issue and push again

## Troubleshooting

### Workflow not triggering:
Check that you're pushing to main/develop branch and GitHub Actions are enabled

### Tests failing in CI but passing locally:
Ensure your tests don't depend on local files or environment specifics

### Build failing:
Check that your `npm run build` works locally first

### Vercel deployment failing:
Verify environment variables are set in Vercel dashboard

## Lab 4 Summary - What You Built

Congratulations! You've implemented automated testing pipelines and staging deployment for your AI application. Here's what you accomplished:

### ✅ Testing Pipeline Features

- **Automated Testing:** Lab 3 tests run on every commit
- **Multi-Service Testing:** Next.js and Flask tested independently
- **Environment Management:** Secure environment variable handling
- **Quality Gates:** Failed tests are immediately visible

### 🚀 Professional Skills Gained

- **GitHub Actions:** Industry-standard CI/CD platform
- **Automated Testing:** Continuous integration best practices
- **Staging Deployment:** Manual Vercel deployment workflow
- **Quality Assurance:** Test-driven development integration

**Industry Impact:** The testing automation patterns you've learned are used by companies like GitHub, Netflix, and Google to maintain code quality and catch bugs early in development.

### 🎯 Next Steps: Lab 5

Lab 5 will containerize your applications with Docker, making them portable and consistent across any environment.

---

**Navigation:**
- [← Lab 3: Testing AI Systems](/labs/lab3)
- [Back to Labs →](/labs)