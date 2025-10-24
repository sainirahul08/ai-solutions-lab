'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Info, Terminal, Code, Zap } from "lucide-react"

export default function Lab8Page() {
  return (
    <div className="space-y-8">
      {/* Lab Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md font-medium">Advanced</span>
          <span>•</span>
          <span>AWS Lambda + API Gateway</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lab 8: Serverless Deployment with AWS Lambda</h1>
          <p className="text-lg text-gray-600">
            Convert your Flask MLOps service to serverless architecture using AWS Lambda and API Gateway for cost-effective, auto-scaling deployment.
          </p>
        </div>
      </div>

      {/* Lab Overview */}
      <Card id="overview">
        <CardHeader>
          <CardTitle>Lab Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            <strong>What You'll Do:</strong> Convert Flask MLOps service to AWS Lambda, set up API Gateway, deploy serverless functions, and compare performance with EC2 containerized deployment
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Lab Collaborators:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• Edward Lampoh - Software Developer & Collaborator</li>
              <li>• Oluwafemi Adebayo, PhD - Academic Professor & Collaborator</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Prerequisites */}
      <Card id="prerequisites">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Prerequisites Required
          </CardTitle>
          <CardDescription>Complete Labs 1-7 before starting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You must complete Labs 1-7 with working EC2 deployment before starting Lab 8.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <p className="font-semibold text-gray-900">Before starting Lab 8, ensure you have:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Flask MLOps service running on EC2 from Lab 7</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Docker image built from Lab 5</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Next.js deployed to Vercel from Lab 7</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>AWS account with active credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Familiarity with AWS Console</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-2">🔍 Quick Test</p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`# Verify EC2 deployment is working
curl http://YOUR_EC2_PUBLIC_IP:5001/health

# Should return healthy status`}</code>
            </pre>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Important Note:</strong> This lab uses <strong>AWS free tier</strong> exclusively. AWS Lambda provides 1 million free requests per month and 400,000 GB-seconds of compute time - more than enough for this course project.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Part A: Understanding Serverless */}
      <div id="part-a" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part A: Understanding Serverless Architecture</h2>
        <p className="text-gray-600 italic">Learn what serverless means and why it's revolutionary for modern applications</p>

        <Card id="what-is-serverless">
          <CardHeader>
            <CardTitle>1. What is Serverless?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              <strong>Serverless</strong> doesn't mean "no servers" - it means <strong>you don't manage servers</strong>. AWS handles all infrastructure, you just upload your code.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">💡 Simple Analogy:</p>
              <p className="text-blue-800 mb-3">Think of serverless like electricity:</p>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-blue-900">Traditional Servers (EC2) = Owning a generator</p>
                  <ul className="list-disc list-inside ml-4 text-blue-800 mt-1">
                    <li>You maintain it</li>
                    <li>It runs 24/7 even when not needed</li>
                    <li>Fixed costs whether you use it or not</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Serverless (Lambda) = Using the power grid</p>
                  <ul className="list-disc list-inside ml-4 text-blue-800 mt-1">
                    <li>No maintenance</li>
                    <li>Only use (and pay for) what you need</li>
                    <li>Scales automatically</li>
                    <li>Pay per millisecond of use</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="ec2-vs-lambda">
          <CardHeader>
            <CardTitle>2. EC2 vs Lambda: Key Differences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-2">EC2 (Lab 7 Architecture)</h4>
                <ul className="space-y-1 text-sm">
                  <li className="text-red-700">❌ Server runs 24/7 (even when idle)</li>
                  <li className="text-red-700">❌ You manage OS updates, security patches</li>
                  <li className="text-red-700">❌ Manual scaling configuration</li>
                  <li className="text-red-700">❌ Fixed capacity (can't handle sudden traffic spikes well)</li>
                  <li className="text-green-700">✅ Full control over environment</li>
                  <li className="text-green-700">✅ Consistent performance (no cold starts)</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Lambda (Lab 8 Architecture)</h4>
                <ul className="space-y-1 text-sm">
                  <li className="text-green-700">✅ Only runs when needed (triggered by requests)</li>
                  <li className="text-green-700">✅ AWS manages all infrastructure</li>
                  <li className="text-green-700">✅ Automatic scaling (handles 1 or 1 million requests)</li>
                  <li className="text-green-700">✅ Pay only for execution time</li>
                  <li className="text-red-700">❌ Cold starts (first request may be slower)</li>
                  <li className="text-red-700">❌ 15-minute execution limit</li>
                  <li className="text-red-700">❌ Limited control over environment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="when-to-use">
          <CardHeader>
            <CardTitle>3. When to Use Each</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Use EC2 when:</p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Consistent, predictable traffic 24/7</li>
                  <li>Long-running processes (&gt;15 minutes)</li>
                  <li>Need specific OS configurations</li>
                  <li>Complex stateful applications</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Use Lambda when:</p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Sporadic or unpredictable traffic</li>
                  <li>Event-driven workloads (API requests, file uploads)</li>
                  <li>Quick processing tasks (&lt;15 minutes)</li>
                  <li>Want to minimize operational overhead</li>
                  <li>Cost optimization is important</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="serverless-architecture">
          <CardHeader>
            <CardTitle>4. Our Serverless Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-semibold text-gray-900">What We're Building:</p>
            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{`Users (Internet)
    ↓
Next.js App (Vercel)
    ↓
API Gateway (AWS)
    ↓
Lambda Function (Flask MLOps Logic)
    ↓
Neon PostgreSQL (Serverless Database)`}</code>
            </pre>

            <div className="space-y-2">
              <p className="font-semibold text-gray-900">Service Breakdown:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                <li><strong>API Gateway:</strong> HTTP endpoint that triggers Lambda</li>
                <li><strong>Lambda Function:</strong> Flask MLOps code packaged as serverless function</li>
                <li><strong>Neon Database:</strong> Already serverless, perfect match!</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card id="lambda-basics">
          <CardHeader>
            <CardTitle>5. AWS Lambda Basics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-900 mb-1">What is Lambda?</p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Run code without provisioning servers</li>
                  <li>Supports Python, Node.js, Java, Go, and more</li>
                  <li>Pay per 100ms of execution time</li>
                  <li>Automatically scales from 0 to thousands of concurrent executions</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">Lambda Free Tier (12 months):</p>
                <ul className="list-disc list-inside ml-4 text-green-800 space-y-1">
                  <li><strong>1 million free requests/month</strong></li>
                  <li><strong>400,000 GB-seconds of compute/month</strong></li>
                  <li>For our MLOps service, this is more than enough!</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="font-semibold text-blue-900 mb-2">💡 Example Cost Calculation:</p>
                <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1 text-sm">
                  <li>1,000 requests/day = 30,000/month (well under 1 million)</li>
                  <li>Average execution: 200ms, 512MB memory = 0.1 GB-seconds per request</li>
                  <li>Total: 3,000 GB-seconds/month (well under 400,000 limit)</li>
                  <li><strong>Cost: $0.00</strong> (within free tier)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part B: Prepare Flask Code */}
      <div id="part-b" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part B: Prepare Flask Code for Lambda</h2>
        <p className="text-gray-600 italic">Adapt your Flask application to run as a serverless function</p>

        <Card id="lambda-handler">
          <CardHeader>
            <CardTitle>1. Understanding Lambda Handler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Traditional Flask (EC2):</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  <code>{`# app.py runs as a server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)`}</code>
                </pre>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">Lambda Flask:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  <code>{`# Lambda calls a handler function for each request
def lambda_handler(event, context):
    # Process the HTTP request
    return response`}</code>
                </pre>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  We'll use <code className="bg-gray-200 px-1 py-0.5 rounded">serverless-wsgi</code> to bridge Flask and Lambda!
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card id="create-handler">
          <CardHeader>
            <CardTitle>2. Create Lambda Handler File</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Create a new file in your local <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-service/</code> directory:
            </p>

            <div>
              <p className="font-semibold text-gray-900 mb-2">File: <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-service/lambda_function.py</code></p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`"""
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
    return serverless_wsgi.handle_request(app, event, context)`}</code>
              </pre>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">What this does:</p>
              <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1">
                <li>Imports your existing Flask app</li>
                <li>Uses <code className="bg-blue-100 px-1 py-0.5 rounded">serverless-wsgi</code> to convert WSGI (Flask) to Lambda format</li>
                <li>AWS calls <code className="bg-blue-100 px-1 py-0.5 rounded">lambda_handler()</code> for each request</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card id="update-requirements">
          <CardHeader>
            <CardTitle>3. Update Requirements for Lambda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Your <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-service/requirements.txt</code> needs a new dependency:
            </p>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Add this line to your existing requirements.txt:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Existing dependencies
flask==3.0.0
flask-cors==4.0.0
prometheus-client==0.19.0
psycopg2-binary==2.9.9
python-dotenv==1.0.0

# Add for Lambda deployment
serverless-wsgi==3.0.3`}</code>
              </pre>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">What is serverless-wsgi?</p>
              <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1">
                <li>Bridges Flask (WSGI) applications to AWS Lambda</li>
                <li>Handles request/response conversion</li>
                <li>Industry-standard for Flask on Lambda</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card id="test-handler">
          <CardHeader>
            <CardTitle>4. Test Handler Locally (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">Before deploying to AWS, test the handler works:</p>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`# Install new dependency
cd mlops-service
pip install serverless-wsgi==3.0.3

# Test import works
python -c "from lambda_function import lambda_handler; print('Handler imported successfully!')"`}</code>
            </pre>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Success Check:</strong> If you see "Handler imported successfully!", your Lambda handler is ready!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Part C: Package Lambda */}
      <div id="part-c" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part C: Package Lambda Function</h2>
        <p className="text-gray-600 italic">Create a deployment package with all dependencies</p>

        <Card id="deployment-package">
          <CardHeader>
            <CardTitle>1. Understanding Lambda Deployment Package</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Lambda needs a ZIP file containing:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                <li>Your application code (<code className="bg-gray-200 px-1 py-0.5 rounded">app.py</code>, <code className="bg-gray-200 px-1 py-0.5 rounded">lambda_function.py</code>)</li>
                <li>All Python dependencies (Flask, prometheus-client, etc.)</li>
                <li>Must be structured correctly for Lambda to find the handler</li>
              </ul>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>💡 Why not Docker?</strong> Lambda supports both ZIP files and Docker images. We'll use ZIP for simplicity, but you can also deploy the Docker image from Lab 5!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="create-package">
          <CardHeader>
            <CardTitle>2. Create Deployment Package</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">On your local machine, create the deployment package:</p>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Mac/Linux:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Navigate to mlops-service directory
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
ls -lh lambda-deployment.zip`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Windows (PowerShell):</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Navigate to mlops-service directory
cd mlops-service

# Create a clean directory for the package
New-Item -ItemType Directory -Force -Path lambda-package
cd lambda-package

# Install dependencies into this directory
pip install -r ..\\requirements.txt -t .

# Copy application files
Copy-Item ..\\app.py .
Copy-Item ..\\lambda_function.py .

# Create ZIP file (requires PowerShell 5.0+)
Compress-Archive -Path .\\* -DestinationPath ..\\lambda-deployment.zip -Force

# Go back to mlops-service directory
cd ..

# Verify ZIP was created
Get-Item lambda-deployment.zip`}</code>
              </pre>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> The ZIP file will be ~20-30 MB (includes all dependencies). Lambda has a 50 MB limit for direct uploads. If larger, you'll need to use S3 (we'll cover this if needed).
              </AlertDescription>
            </Alert>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Success Check:</strong> You should have <code className="bg-gray-200 px-1 py-0.5 rounded">lambda-deployment.zip</code> in your <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-service/</code> directory!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="docker-alternative">
          <CardHeader>
            <CardTitle>3. Alternative: Use Docker Image (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">If your package is too large, use Docker (from Lab 5):</p>

            <p className="text-gray-700">Lambda also supports Docker images! You can deploy your existing Docker image directly:</p>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`# Tag your image for AWS ECR (Elastic Container Registry)
docker tag mlops-service:latest <your-ecr-repo-url>/mlops-service:lambda

# Push to ECR (requires AWS CLI configured)
docker push <your-ecr-repo-url>/mlops-service:lambda`}</code>
            </pre>

            <p className="text-sm text-gray-600 italic">We'll stick with ZIP for simplicity in this lab.</p>
          </CardContent>
        </Card>
      </div>

      {/* Part D: Create Lambda Function */}
      <div id="part-d" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part D: Create Lambda Function in AWS</h2>
        <p className="text-gray-600 italic">Deploy your function to AWS Lambda</p>

        <Card id="lambda-console">
          <CardHeader>
            <CardTitle>1. Navigate to Lambda Console</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Access AWS Lambda:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Sign in to <a href="https://console.aws.amazon.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">AWS Console</a></li>
                <li>Search for "Lambda" in the search bar</li>
                <li>Click "Lambda" to open the Lambda console</li>
                <li>Make sure you're in the same region as Lab 7 (e.g., us-east-1)</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card id="create-function">
          <CardHeader>
            <CardTitle>2. Create Lambda Function</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Create a new function:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-2">
                <li>Click "Create function" button</li>
                <li>Select "Author from scratch"</li>
                <li>Configure:
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li><strong>Function name:</strong> <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-service-lambda</code></li>
                    <li><strong>Runtime:</strong> Python 3.11</li>
                    <li><strong>Architecture:</strong> x86_64</li>
                    <li><strong>Permissions:</strong> Create a new role with basic Lambda permissions</li>
                  </ul>
                </li>
                <li>Click "Create function"</li>
              </ol>
            </div>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Success Check:</strong> You should see "Function mlops-service-lambda successfully created"
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="upload-package">
          <CardHeader>
            <CardTitle>3. Upload Deployment Package</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Upload your ZIP file:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>In the function page, scroll to "Code source" section</li>
                <li>Click "Upload from" dropdown</li>
                <li>Select ".zip file"</li>
                <li>Click "Upload"</li>
                <li>Select your <code className="bg-gray-200 px-1 py-0.5 rounded">lambda-deployment.zip</code> file</li>
                <li>Click "Save"</li>
              </ol>
            </div>

            <p className="text-sm text-gray-600">Wait for upload to complete (may take 30-60 seconds for large files)</p>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Success Check:</strong> You should see your files (<code className="bg-gray-200 px-1 py-0.5 rounded">app.py</code>, <code className="bg-gray-200 px-1 py-0.5 rounded">lambda_function.py</code>) in the code editor
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="configure-handler">
          <CardHeader>
            <CardTitle>4. Configure Handler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Set the Lambda handler:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Scroll to "Runtime settings" section</li>
                <li>Click "Edit"</li>
                <li>Set <strong>Handler</strong> to: <code className="bg-gray-200 px-1 py-0.5 rounded">lambda_function.lambda_handler</code></li>
                <li>Click "Save"</li>
              </ol>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-blue-800">
                <strong>What this does:</strong> Tells Lambda to call <code className="bg-blue-100 px-1 py-0.5 rounded">lambda_handler()</code> function from <code className="bg-blue-100 px-1 py-0.5 rounded">lambda_function.py</code>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card id="env-vars">
          <CardHeader>
            <CardTitle>5. Configure Environment Variables</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Add your environment variables:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Click "Configuration" tab</li>
                <li>Click "Environment variables" in left sidebar</li>
                <li>Click "Edit"</li>
                <li>Add variables (click "Add environment variable" for each):</li>
              </ol>
            </div>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`DATABASE_URL=your_neon_database_url_here
FLASK_ENV=production
FLASK_DEBUG=False
SERVICE_PORT=5001
PROMETHEUS_PORT=8001
ENVIRONMENT=production`}</code>
            </pre>

            <ol start={5} className="list-decimal list-inside ml-4 text-gray-700">
              <li>Click "Save"</li>
            </ol>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Use your actual Neon database URL from <code className="bg-gray-200 px-1 py-0.5 rounded">.env</code> file!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="timeout-memory">
          <CardHeader>
            <CardTitle>6. Configure Timeout and Memory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Adjust function settings:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Stay in "Configuration" tab</li>
                <li>Click "General configuration" in left sidebar</li>
                <li>Click "Edit"</li>
                <li>Set:
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li><strong>Memory:</strong> 512 MB (enough for Flask + Prometheus)</li>
                    <li><strong>Timeout:</strong> 30 seconds (longer than default 3 seconds)</li>
                  </ul>
                </li>
                <li>Click "Save"</li>
              </ol>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">💡 Why these values?</p>
              <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1">
                <li>512 MB: Sufficient for Flask app and dependencies</li>
                <li>30 seconds: Enough time for database queries and metric processing</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part E: API Gateway */}
      <div id="part-e" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part E: Set Up API Gateway</h2>
        <p className="text-gray-600 italic">Create HTTP endpoint to trigger your Lambda function</p>

        <Card id="what-is-api-gateway">
          <CardHeader>
            <CardTitle>1. What is API Gateway?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              <strong>API Gateway</strong> creates a public HTTP endpoint that triggers your Lambda function.
            </p>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Flow:</p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{`User Request (https://your-api.execute-api.us-east-1.amazonaws.com/prod/health)
    ↓
API Gateway (receives HTTP request)
    ↓
Lambda Function (processes request)
    ↓
API Gateway (returns HTTP response)
    ↓
User (receives response)`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card id="create-api">
          <CardHeader>
            <CardTitle>2. Create HTTP API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">From Lambda console:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>In your Lambda function page, click "Add trigger"</li>
                <li>Select "API Gateway"</li>
                <li>Configure:
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li><strong>API type:</strong> HTTP API (simpler than REST API)</li>
                    <li><strong>Security:</strong> Open (we'll add security later if needed)</li>
                  </ul>
                </li>
                <li>Click "Add"</li>
              </ol>
            </div>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Success Check:</strong> You should see "API Gateway trigger added successfully"
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="get-endpoint">
          <CardHeader>
            <CardTitle>3. Get API Endpoint URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Copy your API endpoint:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>In the "Triggers" section, click on the API Gateway trigger</li>
                <li>You'll see "API endpoint" URL like:</li>
              </ol>
            </div>

            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm">
              <code>https://abc123xyz.execute-api.us-east-1.amazonaws.com/default/mlops-service-lambda</code>
            </pre>

            <p className="text-gray-700">Copy this URL - this is your new MLOps service endpoint!</p>
          </CardContent>
        </Card>

        <Card id="test-lambda">
          <CardHeader>
            <CardTitle>4. Test Lambda Function</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Test the health endpoint:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Replace with your actual API Gateway URL
curl https://YOUR_API_GATEWAY_URL

# Expected: Health check JSON response`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Test the /health endpoint specifically:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>curl https://YOUR_API_GATEWAY_URL/health</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Expected Response:</p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{`{
  "status": "healthy",
  "service": "mlops-service-prometheus",
  "timestamp": "2024-01-15T10:30:00.000000",
  "monitoring": "prometheus",
  "metrics_endpoint": "/metrics",
  "environment": "production"
}`}</code>
              </pre>
            </div>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Success Check:</strong> If you get the health response, your Lambda function is working!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="test-metrics">
          <CardHeader>
            <CardTitle>5. Test Metrics Endpoint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Test Prometheus metrics:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>curl https://YOUR_API_GATEWAY_URL/metrics</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">You should see Prometheus metrics output:</p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{`# HELP python_info Python platform information
# TYPE python_info gauge
python_info{implementation="CPython",major="3",minor="11"...} 1.0
...`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part F: Connect Vercel */}
      <div id="part-f" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part F: Connect Vercel to Lambda</h2>
        <p className="text-gray-600 italic">Update your Next.js app to use the new serverless endpoint</p>

        <Card id="update-vercel">
          <CardHeader>
            <CardTitle>1. Update Vercel Environment Variables</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Switch from EC2 to Lambda:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Go to <a href="https://vercel.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
                <li>Click on your project</li>
                <li>Go to Settings → Environment Variables</li>
                <li>Find <code className="bg-gray-200 px-1 py-0.5 rounded">MLOPS_SERVICE_URL</code></li>
                <li>Click "Edit"</li>
                <li>Update to your API Gateway URL:</li>
              </ol>
            </div>

            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm">
              <code>https://YOUR_API_GATEWAY_URL</code>
            </pre>

            <ol start={7} className="list-decimal list-inside ml-4 text-gray-700">
              <li>Click "Save"</li>
            </ol>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Do NOT include <code className="bg-gray-200 px-1 py-0.5 rounded">/health</code> or any path - just the base URL!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="redeploy">
          <CardHeader>
            <CardTitle>2. Trigger Redeployment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Redeploy to use new environment variable:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Go to Deployments tab</li>
                <li>Click on the latest deployment</li>
                <li>Click "Redeploy" button</li>
                <li>Wait for deployment to complete</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card id="test-integration">
          <CardHeader>
            <CardTitle>3. Test End-to-End Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Test the complete serverless flow:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Visit your Vercel URL (e.g., <code className="bg-gray-200 px-1 py-0.5 rounded">https://your-app.vercel.app</code>)</li>
                <li>Create a new business or use existing</li>
                <li>Open the chat interface</li>
                <li>Send a message to the AI</li>
                <li>Check if metrics are tracked</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Verify metrics on Lambda:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Check metrics endpoint
curl https://YOUR_API_GATEWAY_URL/metrics | grep ai_requests_total

# Should show incremented counter`}</code>
              </pre>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="font-semibold text-green-900 mb-2">✅ Success Indicators:</p>
              <ul className="list-disc list-inside ml-4 text-green-800 space-y-1">
                <li>AI chat responds on Vercel</li>
                <li>Metrics endpoint shows updated counters</li>
                <li>No errors in browser console</li>
                <li>Lambda executes successfully</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card id="monitor-lambda">
          <CardHeader>
            <CardTitle>4. Monitor Lambda Executions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Check Lambda CloudWatch logs:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Go to Lambda console</li>
                <li>Click on your function</li>
                <li>Click "Monitor" tab</li>
                <li>Click "View CloudWatch logs"</li>
                <li>Click on the latest log stream</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">You should see:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                <li>Incoming requests</li>
                <li>Prometheus metrics updates</li>
                <li>Any errors or warnings</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part G: Performance Comparison */}
      <div id="part-g" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part G: Performance Comparison</h2>
        <p className="text-gray-600 italic">Compare EC2 vs Lambda performance and costs</p>

        <Card id="test-response-times">
          <CardHeader>
            <CardTitle>1. Test Response Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Test EC2 response time:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Time 10 requests to EC2
for i in {1..10}; do
  time curl -s http://YOUR_EC2_IP:5001/health > /dev/null
done`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Test Lambda response time:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Time 10 requests to Lambda
for i in {1..10}; do
  time curl -s https://YOUR_API_GATEWAY_URL/health > /dev/null
done`}</code>
              </pre>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">💡 Expected Results:</p>
              <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1 text-sm">
                <li><strong>EC2 First Request:</strong> ~50-100ms (consistent)</li>
                <li><strong>EC2 Subsequent:</strong> ~50-100ms (consistent)</li>
                <li><strong>Lambda First Request:</strong> ~500-2000ms (cold start)</li>
                <li><strong>Lambda Subsequent:</strong> ~50-150ms (warm)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card id="cold-starts">
          <CardHeader>
            <CardTitle>2. Understanding Cold Starts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-semibold text-gray-900 mb-2">What is a Cold Start?</p>
            <p className="text-gray-700">
              When Lambda hasn't been used for ~5-15 minutes, AWS pauses the function. The next request must:
            </p>
            <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
              <li>Start a new execution environment</li>
              <li>Load your code</li>
              <li>Initialize Python and libraries</li>
              <li>Then process the request</li>
            </ol>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                This causes the first request to be slower (~1-2 seconds).
              </AlertDescription>
            </Alert>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Warm Starts:</p>
              <p className="text-gray-700">
                After the first request, Lambda keeps the environment "warm" for ~15 minutes. Subsequent requests are fast (~50-150ms).
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">💡 Mitigation Strategies:</p>
              <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1">
                <li><strong>Scheduled pings:</strong> Keep function warm with CloudWatch Events</li>
                <li><strong>Provisioned concurrency:</strong> AWS keeps environments ready (costs extra)</li>
                <li><strong>Accept the trade-off:</strong> For low-traffic apps, occasional cold starts are acceptable</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card id="cost-comparison">
          <CardHeader>
            <CardTitle>3. Cost Comparison</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-2">EC2 Cost (t2.micro)</h4>
                <ul className="space-y-1 text-sm text-orange-800">
                  <li><strong>Free Tier:</strong> 750 hours/month for 12 months</li>
                  <li><strong>After Free Tier:</strong> ~$8-10/month (24/7 operation)</li>
                  <li><strong>Fixed cost regardless of usage</strong></li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Lambda Cost</h4>
                <ul className="space-y-1 text-sm text-green-800">
                  <li><strong>Free Tier:</strong> 1M requests + 400,000 GB-seconds/month (forever)</li>
                  <li><strong>After Free Tier:</strong> $0.20 per 1M requests + $0.0000166667 per GB-second</li>
                  <li><strong>Variable cost based on actual usage</strong></li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">Example Scenario (1,000 requests/day):</p>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-gray-900">EC2:</p>
                  <ul className="list-disc list-inside ml-4 text-gray-700">
                    <li>Monthly cost: $0 (free tier) or $8-10 (after free tier)</li>
                    <li>Runs 24/7 even if no requests</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Lambda:</p>
                  <ul className="list-disc list-inside ml-4 text-gray-700">
                    <li>Requests: 30,000/month × $0.20/1M = $0.006</li>
                    <li>Compute: 3,000 GB-seconds × $0.0000166667 = $0.05</li>
                    <li><strong>Total: ~$0.06/month</strong> (well within free tier = $0)</li>
                    <li>Only runs when triggered</li>
                  </ul>
                </div>
              </div>

              <p className="text-green-700 font-semibold mt-3">💡 Winner for low-traffic apps: Lambda (much cheaper)</p>
            </div>
          </CardContent>
        </Card>

        <Card id="when-to-use-each">
          <CardHeader>
            <CardTitle>4. When to Use Each</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Use EC2 when:</p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>High, consistent traffic (thousands of requests/hour)</li>
                  <li>Long-running processes</li>
                  <li>Need predictable latency (no cold starts)</li>
                  <li>Complex state management</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Use Lambda when:</p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Low to moderate traffic</li>
                  <li>Unpredictable traffic patterns</li>
                  <li>Cost optimization is priority</li>
                  <li>Cold starts are acceptable</li>
                  <li>Event-driven architecture</li>
                </ul>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="font-semibold text-blue-900 mb-2">For our AI receptionist:</p>
                <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1">
                  <li><strong>During development/testing:</strong> Lambda (cheaper)</li>
                  <li><strong>High-traffic production:</strong> EC2 (better performance)</li>
                  <li><strong>Low-traffic production:</strong> Lambda (cost-effective)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part H: Clean Up */}
      <div id="part-h" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part H: Clean Up and Resource Management</h2>
        <p className="text-gray-600 italic">Manage your AWS resources to optimize costs</p>

        <Card id="keep-or-choose">
          <CardHeader>
            <CardTitle>1. Keep Both or Choose One?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">You now have TWO deployments:</p>
            <ul className="list-none ml-4 text-gray-700 space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                EC2 instance with Docker (Lab 7)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Lambda function (Lab 8)
              </li>
            </ul>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Decision Time:</p>
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="font-semibold text-green-900">Option 1: Keep Both (Recommended for Learning)</p>
                  <ul className="list-disc list-inside ml-4 text-green-800 text-sm mt-1">
                    <li>Compare performance in real-world usage</li>
                    <li>Learn the trade-offs firsthand</li>
                    <li>Total cost: Still in free tier!</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="font-semibold text-blue-900">Option 2: Stop EC2, Use Lambda Only</p>
                  <ul className="list-disc list-inside ml-4 text-blue-800 text-sm mt-1">
                    <li>Save EC2 hours for other projects</li>
                    <li>Simpler to manage one deployment</li>
                    <li>Cheaper after free tier expires</li>
                  </ul>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="font-semibold text-orange-900">Option 3: Stop Lambda, Use EC2 Only</p>
                  <ul className="list-disc list-inside ml-4 text-orange-800 text-sm mt-1">
                    <li>More consistent performance</li>
                    <li>Better for high-traffic scenarios</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="stop-ec2">
          <CardHeader>
            <CardTitle>2. Stop EC2 Instance (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">If you want to pause EC2 to save hours:</p>

            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{`# Via AWS Console:
# 1. Go to EC2 → Instances
# 2. Select mlops-service-production
# 3. Instance state → Stop instance
# 4. Confirm

# This STOPS the instance (can restart later)
# Does NOT delete it`}</code>
            </pre>

            <div>
              <p className="font-semibold text-gray-900 mb-2">To restart later:</p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{`# Instance state → Start instance
# Get new public IP (changes after stop/start)
# Update Vercel MLOPS_SERVICE_URL if switching back`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card id="delete-lambda">
          <CardHeader>
            <CardTitle>3. Delete Lambda Function (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">If you want to remove Lambda:</p>

            <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
              <li>Go to Lambda console</li>
              <li>Select your function</li>
              <li>Actions → Delete</li>
              <li>Type "delete" to confirm</li>
            </ol>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Note:</strong> This permanently deletes the function!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="monitor-usage">
          <CardHeader>
            <CardTitle>4. Monitor Your Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Check Lambda usage:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Lambda console → Functions</li>
                <li>Click "Monitor" tab</li>
                <li>View invocations, duration, errors</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Check EC2 usage:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>EC2 console → Instances</li>
                <li>Check instance hours used</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Check free tier usage:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>AWS Console → Billing</li>
                <li>Free Tier → View usage</li>
                <li>See Lambda requests and EC2 hours remaining</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part I: Cold Start Optimization */}
      <div id="part-i" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part I: Cold Start Optimization (Optional)</h2>
        <p className="text-gray-600 italic">Reduce Lambda cold start times</p>

        <Card id="scheduled-warming">
          <CardHeader>
            <CardTitle>1. Scheduled Warming</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">Keep Lambda warm with CloudWatch Events:</p>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Create EventBridge Rule:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Go to AWS Console → EventBridge</li>
                <li>Create rule → Schedule</li>
                <li>Configure:
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li><strong>Name:</strong> <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-lambda-warmer</code></li>
                    <li><strong>Schedule:</strong> Rate expression: <code className="bg-gray-200 px-1 py-0.5 rounded">rate(5 minutes)</code></li>
                  </ul>
                </li>
                <li>Target: Lambda function → <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-service-lambda</code></li>
                <li>Create</li>
              </ol>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                This pings Lambda every 5 minutes, keeping it warm! Cost Impact: Minimal (still within free tier)
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="provisioned-concurrency">
          <CardHeader>
            <CardTitle>2. Provisioned Concurrency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">AWS can keep environments ready 24/7:</p>

            <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
              <li>Lambda console → Your function</li>
              <li>Configuration → Provisioned concurrency</li>
              <li>Set desired number of ready environments</li>
            </ol>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Warning:</strong> This costs extra! Not needed for this course.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="code-optimization">
          <CardHeader>
            <CardTitle>3. Code Optimization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">Reduce cold start time by optimizing imports:</p>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`# BAD: Import everything at module level
import heavy_library  # Loaded during cold start

def lambda_handler(event, context):
    heavy_library.do_something()

# GOOD: Import only when needed
def lambda_handler(event, context):
    import heavy_library  # Loaded only when called
    heavy_library.do_something()`}</code>
            </pre>

            <p className="text-sm text-gray-600 italic">For our app, the difference is minimal, but good to know!</p>
          </CardContent>
        </Card>
      </div>

      {/* Troubleshooting */}
      <Card id="troubleshooting">
        <CardHeader>
          <CardTitle>Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900">Lambda function returns 502 Bad Gateway:</p>
              <p className="text-gray-700 text-sm">Check handler configuration:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                <li>Ensure handler is <code className="bg-gray-200 px-1 py-0.5 rounded">lambda_function.lambda_handler</code></li>
                <li>Verify <code className="bg-gray-200 px-1 py-0.5 rounded">lambda_function.py</code> is in the ZIP root</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Lambda times out:</p>
              <p className="text-gray-700 text-sm">Increase timeout:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                <li>Configuration → General configuration → Timeout → 30 seconds</li>
                <li>Check CloudWatch logs for specific errors</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Environment variables not working:</p>
              <p className="text-gray-700 text-sm">Verify configuration:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                <li>Configuration → Environment variables</li>
                <li>Check DATABASE_URL includes <code className="bg-gray-200 px-1 py-0.5 rounded">?sslmode=require</code></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Deployment package too large:</p>
              <p className="text-gray-700 text-sm">Reduce size or use Docker:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                <li>Remove unnecessary files from package</li>
                <li>Or deploy Docker image to ECR and use container image</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Cold starts are too slow:</p>
              <p className="text-gray-700 text-sm">Optimization options:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                <li>Set up EventBridge warming (Part I)</li>
                <li>Reduce package size</li>
                <li>Optimize Python imports</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Can't connect to database from Lambda:</p>
              <p className="text-gray-700 text-sm">Check VPC settings:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                <li>Lambda functions can access public internet by default</li>
                <li>Neon is publicly accessible, should work</li>
                <li>Verify DATABASE_URL is correct</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lab Summary */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-900">Lab 8 Summary - What You Built</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-green-800">
            Congratulations! You've successfully deployed your Flask MLOps service as a serverless function. Here's what you accomplished:
          </p>

          <div>
            <p className="font-semibold text-green-900 mb-2">✅ Serverless Skills Gained</p>
            <ul className="list-disc list-inside ml-4 text-green-800 space-y-1">
              <li><strong>Lambda Fundamentals:</strong> Function-as-a-Service deployment</li>
              <li><strong>API Gateway:</strong> HTTP endpoints for serverless functions</li>
              <li><strong>Serverless Architecture:</strong> Event-driven, auto-scaling design</li>
              <li><strong>Cost Optimization:</strong> Pay-per-use pricing model</li>
              <li><strong>Performance Analysis:</strong> EC2 vs Lambda trade-offs</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-900 mb-2">🚀 What You Built</p>
            <ul className="list-disc list-inside ml-4 text-green-800 space-y-1">
              <li><strong>Serverless MLOps Service:</strong> Flask running on AWS Lambda</li>
              <li><strong>API Gateway Endpoint:</strong> Public HTTPS endpoint for your service</li>
              <li><strong>Auto-Scaling:</strong> Handles 1 to 1,000,000 requests automatically</li>
              <li><strong>Cost-Effective:</strong> $0 within free tier, pennies beyond</li>
              <li><strong>Production Comparison:</strong> Two deployment strategies to compare</li>
            </ul>
          </div>

          <div className="bg-white border border-green-300 rounded-lg p-4">
            <p className="font-semibold text-green-900 mb-2">🔑 Key Takeaways</p>
            <ul className="list-disc list-inside ml-4 text-green-800 space-y-1 text-sm">
              <li><strong>Serverless = No server management</strong>, not "no servers"</li>
              <li><strong>Lambda scales automatically</strong> from 0 to millions of requests</li>
              <li><strong>Cold starts are real</strong> (~1-2 seconds for first request)</li>
              <li><strong>Cost-effective for low-traffic</strong> or unpredictable workloads</li>
              <li><strong>Trade-offs exist</strong> between serverless and traditional deployments</li>
              <li><strong>Choose the right tool</strong> based on your requirements</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Section */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">📝 Test Your Knowledge</h3>
        <p className="text-gray-700 mb-4">
          Complete the Lab 8 quiz to test your understanding of serverless deployment with AWS Lambda and API Gateway.
        </p>
        <a
          href="/quizzes/lab8-quiz.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Take Lab 8 Quiz →
        </a>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t">
        <a href="/labs/lab7" className="text-blue-600 hover:underline flex items-center gap-2">
          ← Lab 7: Cloud Deployment
        </a>
        <a href="/labs" className="text-blue-600 hover:underline flex items-center gap-2">
          Back to Labs →
        </a>
      </div>
    </div>
  )
}
