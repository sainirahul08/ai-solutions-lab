'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Info, Terminal, Code, Zap } from "lucide-react"

export default function Lab9Page() {
  return (
    <div className="space-y-8">
      {/* Lab Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded-md font-medium">Production</span>
          <span>•</span>
          <span>Monitoring & Logging for AI Systems</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lab 9: Monitoring & Logging for Production AI Systems</h1>
          <p className="text-lg text-gray-600">
            Learn production monitoring concepts, explore AWS CloudWatch for deployed Lambda functions, and enhance your Prometheus dashboard with detailed health checks and metrics.
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
            <strong>What You'll Do:</strong> Understand the 4 Golden Signals, explore AWS CloudWatch metrics and logs for Lambda, set up CloudWatch alarms, and enhance your local Prometheus dashboard with production-grade monitoring features
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
          <CardDescription>Complete Labs 1-8 before starting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You must complete Labs 1-8 with working Lambda deployment before starting Lab 9.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <p className="font-semibold text-gray-900">Before starting Lab 9, ensure you have:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Lab 2 completed with basic Prometheus monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Lab 8 completed with Lambda function deployed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Flask MLOps service running locally</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>AWS account access with Lambda function from Lab 8</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-2">🔍 Quick Test</p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`# Verify local service is running
curl http://localhost:5001/health

# Should return healthy status`}</code>
            </pre>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Lab Scope:</strong> Lab 2 covered <strong>local development monitoring</strong> with Prometheus. Lab 9 focuses on <strong>production monitoring</strong> - CloudWatch for deployed services, enhanced health checks, error tracking, and uptime monitoring.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Part A: Understanding Monitoring */}
      <div id="part-a" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part A: Understanding Production Monitoring</h2>
        <p className="text-gray-600 italic">Learn the fundamentals of monitoring production AI systems</p>

        <Card id="golden-signals">
          <CardHeader>
            <CardTitle>1. The 4 Golden Signals of Monitoring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Google's Site Reliability Engineering team identified 4 key metrics every production system should monitor:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">1. Latency</h4>
                <p className="text-sm text-blue-800">
                  <strong>What:</strong> How long it takes to service a request<br/>
                  <strong>Example:</strong> Your Lambda function takes 150ms to respond
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">2. Traffic</h4>
                <p className="text-sm text-green-800">
                  <strong>What:</strong> How much demand is on your system<br/>
                  <strong>Example:</strong> 1,000 AI chat requests per day
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">3. Errors</h4>
                <p className="text-sm text-red-800">
                  <strong>What:</strong> Rate of failed requests<br/>
                  <strong>Example:</strong> 2% of requests fail due to database timeouts
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-2">4. Saturation</h4>
                <p className="text-sm text-orange-800">
                  <strong>What:</strong> How "full" your service is<br/>
                  <strong>Example:</strong> Lambda using 450MB of 512MB memory limit
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="monitoring-vs-logging">
          <CardHeader>
            <CardTitle>2. Monitoring vs Logging vs Tracing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="font-semibold text-blue-900">📊 Monitoring (Metrics)</p>
                <p className="text-blue-800 text-sm">
                  <strong>What:</strong> Numeric measurements over time<br/>
                  <strong>Example:</strong> Request count, response time, error rate<br/>
                  <strong>Tools:</strong> Prometheus, CloudWatch Metrics
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="font-semibold text-green-900">📝 Logging (Events)</p>
                <p className="text-green-800 text-sm">
                  <strong>What:</strong> Text records of what happened<br/>
                  <strong>Example:</strong> "User john@example.com requested appointment at 2pm"<br/>
                  <strong>Tools:</strong> CloudWatch Logs, application logs
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <p className="font-semibold text-purple-900">🔍 Tracing (Request Flow)</p>
                <p className="text-purple-800 text-sm">
                  <strong>What:</strong> Following a single request through multiple services<br/>
                  <strong>Example:</strong> User request → API Gateway → Lambda → Database<br/>
                  <strong>Tools:</strong> AWS X-Ray, Jaeger
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="why-monitor">
          <CardHeader>
            <CardTitle>3. Why Monitor Production Systems?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-semibold text-gray-900 mb-2">Monitoring helps you:</p>
            <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
              <li><strong>Detect issues early:</strong> Know when error rates spike before users complain</li>
              <li><strong>Understand usage patterns:</strong> When are peak hours? Which features are used most?</li>
              <li><strong>Optimize costs:</strong> See where you're spending money (API calls, compute time)</li>
              <li><strong>Plan capacity:</strong> Know when to scale up resources</li>
              <li><strong>Debug production problems:</strong> Trace issues to specific components</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-semibold text-yellow-900 mb-2">⚠️ Without Monitoring:</p>
              <ul className="list-disc list-inside ml-4 text-yellow-800 space-y-1 text-sm">
                <li>You won't know when your service is down until users report it</li>
                <li>Debugging production issues is like flying blind</li>
                <li>Unexpected AWS bills because you didn't track usage</li>
                <li>No data to optimize performance or user experience</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part B: Explore CloudWatch */}
      <div id="part-b" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part B: Explore AWS CloudWatch for Lambda</h2>
        <p className="text-gray-600 italic">Learn how AWS automatically monitors your Lambda functions</p>

        <Card id="what-is-cloudwatch">
          <CardHeader>
            <CardTitle>1. What is AWS CloudWatch?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              <strong>CloudWatch</strong> is AWS's monitoring and logging service that <strong>automatically tracks all Lambda functions</strong> with zero configuration needed.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">What CloudWatch Provides:</p>
              <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1">
                <li><strong>Metrics:</strong> Invocations, duration, errors, throttles</li>
                <li><strong>Logs:</strong> Everything your Lambda prints (console.log, print statements)</li>
                <li><strong>Alarms:</strong> Notifications when metrics exceed thresholds</li>
                <li><strong>Dashboards:</strong> Visual graphs of your metrics</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card id="view-metrics">
          <CardHeader>
            <CardTitle>2. View Lambda Metrics in CloudWatch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Access CloudWatch Metrics:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Sign in to <a href="https://console.aws.amazon.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">AWS Console</a></li>
                <li>Go to Lambda → Your function (<code className="bg-gray-200 px-1 py-0.5 rounded">mlops-service-lambda</code>)</li>
                <li>Click the "Monitor" tab</li>
                <li>You'll see automatic metrics graphs:</li>
              </ol>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-semibold text-gray-900">📈 Invocations</p>
                <p className="text-sm text-gray-700">
                  Number of times your Lambda was called (traffic signal)
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-semibold text-gray-900">⏱️ Duration</p>
                <p className="text-sm text-gray-700">
                  How long each request took (latency signal)<br/>
                  <em className="text-gray-600">Note: First request may show 1-3 seconds (cold start), then ~100-200ms</em>
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-semibold text-gray-900">❌ Errors</p>
                <p className="text-sm text-gray-700">
                  Failed invocations (error signal)
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-semibold text-gray-900">🚫 Throttles</p>
                <p className="text-sm text-gray-700">
                  Requests rejected due to concurrency limits (saturation signal)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="view-logs">
          <CardHeader>
            <CardTitle>3. View Lambda Logs in CloudWatch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Access CloudWatch Logs:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>In Lambda "Monitor" tab, click "View CloudWatch logs"</li>
                <li>You'll see <strong>log streams</strong> - one per Lambda execution environment</li>
                <li>Click on the latest log stream</li>
                <li>View your application logs:</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Example Log Output:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`START RequestId: abc123 Version: $LATEST
2024-01-15T10:30:00.000Z INFO Received request to /health
2024-01-15T10:30:00.050Z INFO Database connection healthy
2024-01-15T10:30:00.100Z INFO Prometheus metrics updated
END RequestId: abc123
REPORT Duration: 150.00 ms Memory: 128 MB Max Memory: 89 MB`}</code>
              </pre>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">💡 Understanding Cold Starts:</p>
              <p className="text-blue-800 text-sm">
                When Lambda hasn't been used for ~10-15 minutes, AWS pauses it. The <strong>first request after idle</strong> takes 1-3 seconds to "warm up" (load code, start Python). This is <strong>normal</strong> and expected. Subsequent requests are fast (~100-200ms).
              </p>
            </div>
          </CardContent>
        </Card>

        <Card id="test-lambda">
          <CardHeader>
            <CardTitle>4. Test and Observe Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Generate some traffic to your Lambda:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Replace with your API Gateway URL from Lab 8
API_URL="https://YOUR_API_GATEWAY_URL"

# Send 10 test requests
for i in {1..10}; do
  curl -s $API_URL/health
  sleep 1
done`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Then refresh CloudWatch to see:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                <li>Invocations count increased by 10</li>
                <li>Duration showing ~100-200ms per request</li>
                <li>First request may show higher duration (cold start)</li>
                <li>Logs showing your requests</li>
              </ul>
            </div>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Success Check:</strong> If you see metrics updating and logs appearing, CloudWatch is working!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Part C: CloudWatch Alarms */}
      <div id="part-c" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part C: Set Up CloudWatch Alarm for Errors</h2>
        <p className="text-gray-600 italic">Get notified when your Lambda function error rate is too high</p>

        <Card id="why-alarms">
          <CardHeader>
            <CardTitle>1. Why Set Up Alarms?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              <strong>CloudWatch Alarms</strong> proactively notify you when metrics exceed thresholds. Instead of constantly checking dashboards, AWS sends you an email/SMS when something is wrong.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-semibold text-yellow-900 mb-2">Example Scenarios:</p>
              <ul className="list-disc list-inside ml-4 text-yellow-800 space-y-1 text-sm">
                <li><strong>Error rate &gt; 10%:</strong> Something is broken, investigate immediately</li>
                <li><strong>Duration &gt; 5 seconds:</strong> Function is slow, may timeout</li>
                <li><strong>Throttles &gt; 0:</strong> Too many concurrent requests, need more capacity</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card id="create-sns">
          <CardHeader>
            <CardTitle>2. Create SNS Topic for Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              <strong>SNS (Simple Notification Service)</strong> sends alarm notifications via email/SMS.
            </p>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Create SNS Topic:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Go to AWS Console → Search "SNS" → Open SNS</li>
                <li>Click "Topics" in left sidebar → "Create topic"</li>
                <li>Configure:
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li><strong>Type:</strong> Standard</li>
                    <li><strong>Name:</strong> <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-lambda-alerts</code></li>
                  </ul>
                </li>
                <li>Click "Create topic"</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Create Email Subscription:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>In the topic page, click "Create subscription"</li>
                <li>Configure:
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li><strong>Protocol:</strong> Email</li>
                    <li><strong>Endpoint:</strong> Your email address</li>
                  </ul>
                </li>
                <li>Click "Create subscription"</li>
                <li><strong>Check your email</strong> for confirmation link and click it</li>
              </ol>
            </div>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Success Check:</strong> Subscription status should show "Confirmed"
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="create-alarm">
          <CardHeader>
            <CardTitle>3. Create Error Rate Alarm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Create CloudWatch Alarm:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Go to CloudWatch → Alarms → "Create alarm"</li>
                <li>Click "Select metric"</li>
                <li>Navigate: Lambda → By Function Name</li>
                <li>Select your function (<code className="bg-gray-200 px-1 py-0.5 rounded">mlops-service-lambda</code>)</li>
                <li>Check the <strong>Errors</strong> metric → "Select metric"</li>
                <li>Configure alarm conditions:
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li><strong>Statistic:</strong> Sum</li>
                    <li><strong>Period:</strong> 5 minutes</li>
                    <li><strong>Threshold type:</strong> Static</li>
                    <li><strong>Whenever Errors is:</strong> Greater than <code className="bg-gray-200 px-1 py-0.5 rounded">5</code></li>
                  </ul>
                </li>
                <li>Click "Next"</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Configure notifications:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li>Select "In alarm" state trigger</li>
                <li>Select your SNS topic: <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-lambda-alerts</code></li>
                <li>Click "Next"</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Name the alarm:</p>
              <ol className="list-decimal list-inside ml-4 text-gray-700 space-y-1">
                <li><strong>Alarm name:</strong> <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-lambda-high-errors</code></li>
                <li><strong>Description:</strong> "Alert when Lambda errors exceed 5 in 5 minutes"</li>
                <li>Click "Next" → Review → "Create alarm"</li>
              </ol>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="font-semibold text-green-900 mb-2">✅ What You've Done:</p>
              <p className="text-green-800 text-sm">
                Now if your Lambda function has more than 5 errors within a 5-minute window, you'll get an email notification automatically! This is <strong>proactive monitoring</strong> - you know about problems before users complain.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card id="test-alarm">
          <CardHeader>
            <CardTitle>4. Test Alarm (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              To test the alarm, you would need to intentionally cause errors. <strong>For this lab, it's not necessary</strong> - just knowing the alarm exists is enough.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">💡 How to Test (Advanced):</p>
              <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1 text-sm">
                <li>Temporarily break your Lambda (e.g., wrong DATABASE_URL)</li>
                <li>Send 6+ requests to trigger errors</li>
                <li>Wait 5 minutes for alarm to trigger</li>
                <li>Receive email notification</li>
                <li>Fix the issue and alarm returns to "OK" state</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part D: Enhanced Prometheus */}
      <div id="part-d" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part D: Enhance Prometheus Dashboard with Production Features</h2>
        <p className="text-gray-600 italic">Add detailed health checks, error tracking, and uptime monitoring to your local service</p>

        <Card id="production-monitoring">
          <CardHeader>
            <CardTitle>1. What We're Adding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Lab 2 set up <strong>basic Prometheus monitoring</strong>. Now we'll add <strong>production-grade features</strong>:
            </p>

            <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
              <li><strong>Detailed health endpoint:</strong> Service status, uptime, system resources</li>
              <li><strong>Request tracking:</strong> Total requests, failed requests, error rates</li>
              <li><strong>Uptime monitoring:</strong> How long service has been running</li>
              <li><strong>System resources:</strong> Memory and CPU usage</li>
              <li><strong>Enhanced dashboard:</strong> 10 comprehensive metrics cards</li>
            </ul>
          </CardContent>
        </Card>

        <Card id="update-dependencies">
          <CardHeader>
            <CardTitle>2. Update Flask Dependencies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Add <code className="bg-gray-200 px-1 py-0.5 rounded">psutil</code> for system monitoring:
            </p>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Update <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-service/requirements.txt</code>:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Existing dependencies remain...

# Additional utilities
python-dotenv==1.0.0
psutil==5.9.8  # NEW: For system monitoring`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Install the new dependency:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`cd mlops-service
pip install psutil==5.9.8`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card id="code-enhancements">
          <CardHeader>
            <CardTitle>3. Code Enhancements Already Implemented</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Your instructor has already enhanced <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-service/app.py</code> with production monitoring features:
            </p>

            <div className="space-y-3">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-semibold text-gray-900">✅ Global Request Tracking</p>
                <p className="text-sm text-gray-700">
                  Variables to track: <code className="bg-gray-200 px-1 py-0.5 rounded">TOTAL_REQUESTS</code>, <code className="bg-gray-200 px-1 py-0.5 rounded">FAILED_REQUESTS</code>, <code className="bg-gray-200 px-1 py-0.5 rounded">SERVICE_START_TIME</code>
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-semibold text-gray-900">✅ Helper Functions</p>
                <p className="text-sm text-gray-700">
                  • <code className="bg-gray-200 px-1 py-0.5 rounded">get_uptime_seconds()</code> - Calculate service uptime<br/>
                  • <code className="bg-gray-200 px-1 py-0.5 rounded">get_memory_usage_mb()</code> - Get memory usage via psutil<br/>
                  • <code className="bg-gray-200 px-1 py-0.5 rounded">calculate_error_rate()</code> - Calculate error percentage<br/>
                  • <code className="bg-gray-200 px-1 py-0.5 rounded">check_database_connection()</code> - Verify database access
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-semibold text-gray-900">✅ New /health/detailed Endpoint</p>
                <p className="text-sm text-gray-700">
                  Returns comprehensive health info: status, uptime, system resources, request stats, error rates, health checks
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-semibold text-gray-900">✅ Enhanced /track Endpoint</p>
                <p className="text-sm text-gray-700">
                  Now increments <code className="bg-gray-200 px-1 py-0.5 rounded">TOTAL_REQUESTS</code> and tracks <code className="bg-gray-200 px-1 py-0.5 rounded">FAILED_REQUESTS</code> on errors
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-semibold text-gray-900">✅ Structured Logging</p>
                <p className="text-sm text-gray-700">
                  Formatted log output with timestamps, log levels, and structured messages
                </p>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Note:</strong> These enhancements are already in your codebase. You can review <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-service/app.py</code> to see the implementation.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="test-endpoints">
          <CardHeader>
            <CardTitle>4. Test the Enhanced Endpoints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Start your local Flask service:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`cd mlops-service
python app.py`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Test the detailed health endpoint:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`curl http://localhost:5001/health/detailed | jq`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Expected Output:</p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{`{
  "status": "healthy",
  "service": "mlops-service-prometheus",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00.000000",
  "environment": "development",
  "uptime": {
    "seconds": 3600.5,
    "hours": 1.0,
    "days": 0.04,
    "started_at": "2024-01-15T09:30:00.000000"
  },
  "system": {
    "memory_usage_mb": 125.4,
    "cpu_percent": 2.5,
    "process_id": 12345
  },
  "requests": {
    "total": 150,
    "failed": 3,
    "error_rate_percent": 2.0,
    "last_request": "2024-01-15T10:29:00.000000"
  },
  "health_checks": {
    "database_connected": true,
    "prometheus_enabled": true,
    "metrics_tracking": "active"
  }
}`}</code>
              </pre>
            </div>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Success Check:</strong> If you see detailed health info with uptime and system metrics, the enhanced endpoint is working!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="view-dashboard">
          <CardHeader>
            <CardTitle>5. View Enhanced Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              The dashboard has been enhanced to display <strong>10 comprehensive metrics</strong>:
            </p>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Open the dashboard:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>open http://localhost:5001/</code>
              </pre>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gray-900">10 Metrics Displayed:</p>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <strong>1. Service Status</strong> - Healthy/Unhealthy with environment
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <strong>2. Service Uptime</strong> - Hours/days since start
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <strong>3. Total Requests</strong> - All tracked requests
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <strong>4. Error Rate</strong> - Color-coded: green &lt;5%, yellow &lt;10%, red &gt;10%
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <strong>5. Memory Usage</strong> - MB used with CPU%
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <strong>6. Database Status</strong> - Connected/Disconnected
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <strong>7. Total Tokens</strong> - AI tokens consumed
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <strong>8. Total API Cost</strong> - USD spent on AI
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <strong>9. Appointments</strong> - Booking requests
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <strong>10. Human Handoffs</strong> - Escalations needed
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">💡 Dashboard Features:</p>
              <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1 text-sm">
                <li>Auto-refreshes every 10 seconds</li>
                <li>Manual refresh button for immediate updates</li>
                <li>Color-coded error rate indicators (green/yellow/red)</li>
                <li>Links to all monitoring endpoints</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part E: Best Practices */}
      <div id="part-e" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part E: Production Monitoring Best Practices</h2>
        <p className="text-gray-600 italic">Learn industry best practices for production AI systems</p>

        <Card id="alert-thresholds">
          <CardHeader>
            <CardTitle>1. Setting Alert Thresholds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="font-semibold text-green-900">✅ Good Alert Thresholds</p>
                <ul className="list-disc list-inside ml-4 text-green-800 text-sm space-y-1">
                  <li><strong>Error rate &gt; 5-10%:</strong> Something is likely broken</li>
                  <li><strong>Response time &gt; 3 seconds:</strong> User experience degrading</li>
                  <li><strong>Memory usage &gt; 80%:</strong> Risk of crashes</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="font-semibold text-red-900">❌ Bad Alert Thresholds</p>
                <ul className="list-disc list-inside ml-4 text-red-800 text-sm space-y-1">
                  <li><strong>Alert on every error:</strong> Too noisy, you'll ignore alerts</li>
                  <li><strong>Alert on 50% error rate:</strong> Too late, many users affected</li>
                  <li><strong>No alerts at all:</strong> You won't know when things break</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">💡 Rule of Thumb:</p>
              <p className="text-blue-800 text-sm">
                Set thresholds that indicate <strong>actionable problems</strong> - not so sensitive that you get false alarms, not so loose that real issues go unnoticed.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card id="cost-tracking">
          <CardHeader>
            <CardTitle>2. Track AI API Costs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              AI API calls can get expensive quickly. Always monitor:
            </p>

            <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
              <li><strong>Total tokens used:</strong> Shows API usage volume</li>
              <li><strong>Cost per request:</strong> Helps optimize prompts</li>
              <li><strong>Daily/weekly trends:</strong> Spot unexpected spikes</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-semibold text-yellow-900 mb-2">⚠️ Example Cost Issue:</p>
              <p className="text-yellow-800 text-sm">
                A student accidentally created an infinite loop of AI calls. Without monitoring, they didn't notice until their AWS bill was $500. <strong>Monitoring could have caught this in hours, not days.</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card id="log-levels">
          <CardHeader>
            <CardTitle>3. Use Appropriate Log Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-semibold text-gray-900">DEBUG</p>
                <p className="text-sm text-gray-700">
                  Detailed info for debugging (only in development)
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="font-semibold text-blue-900">INFO</p>
                <p className="text-sm text-blue-800">
                  Normal operations (e.g., "Request received", "Metric updated")
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="font-semibold text-yellow-900">WARNING</p>
                <p className="text-sm text-yellow-800">
                  Something unexpected but not critical (e.g., "Retry attempt 2 of 3")
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="font-semibold text-red-900">ERROR</p>
                <p className="text-sm text-red-800">
                  Failures that need attention (e.g., "Database connection failed")
                </p>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Production Tip:</strong> Use INFO level in production. DEBUG generates too many logs and increases CloudWatch costs.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="retention">
          <CardHeader>
            <CardTitle>4. Log and Metric Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              CloudWatch logs and metrics cost money to store. Set retention policies:
            </p>

            <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
              <li><strong>Logs:</strong> Keep 7-30 days (good for debugging recent issues)</li>
              <li><strong>Metrics:</strong> CloudWatch keeps high-resolution for 3 hours, then aggregates</li>
              <li><strong>Alarms:</strong> Keep indefinitely (minimal cost)</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">💡 Cost Optimization:</p>
              <p className="text-blue-800 text-sm">
                For this course project, CloudWatch costs are negligible. But in production with high traffic, log retention settings can save hundreds of dollars per month.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part F: Comparison */}
      <div id="part-f" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part F: CloudWatch vs Prometheus Comparison</h2>
        <p className="text-gray-600 italic">Understand when to use each monitoring approach</p>

        <Card id="comparison-table">
          <CardHeader>
            <CardTitle>CloudWatch vs Prometheus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-3">AWS CloudWatch</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold text-orange-900">✅ Pros:</p>
                    <ul className="list-disc list-inside ml-2 text-orange-800">
                      <li>Automatic for AWS services</li>
                      <li>No setup required for Lambda/EC2</li>
                      <li>Built-in alarms and notifications</li>
                      <li>Integrated with entire AWS ecosystem</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-orange-900">❌ Cons:</p>
                    <ul className="list-disc list-inside ml-2 text-orange-800">
                      <li>AWS-specific (vendor lock-in)</li>
                      <li>Costs more for high-volume metrics</li>
                      <li>Less flexible than Prometheus</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">Prometheus</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold text-blue-900">✅ Pros:</p>
                    <ul className="list-disc list-inside ml-2 text-blue-800">
                      <li>Open-source and free</li>
                      <li>Works anywhere (AWS, GCP, on-premise)</li>
                      <li>Powerful query language (PromQL)</li>
                      <li>Custom metrics easy to add</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">❌ Cons:</p>
                    <ul className="list-disc list-inside ml-2 text-blue-800">
                      <li>Requires manual setup</li>
                      <li>Need to manage Prometheus server</li>
                      <li>No built-in alerting (need Alertmanager)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="when-to-use">
          <CardHeader>
            <CardTitle>When to Use Each</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="font-semibold text-orange-900">Use CloudWatch when:</p>
                <ul className="list-disc list-inside ml-4 text-orange-800 text-sm space-y-1">
                  <li>Using AWS services (Lambda, EC2, RDS)</li>
                  <li>Want zero-setup monitoring</li>
                  <li>Need AWS-integrated alarms</li>
                  <li>Small to medium scale</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="font-semibold text-blue-900">Use Prometheus when:</p>
                <ul className="list-disc list-inside ml-4 text-blue-800 text-sm space-y-1">
                  <li>Multi-cloud or on-premise deployment</li>
                  <li>Need custom application metrics</li>
                  <li>Want full control over monitoring</li>
                  <li>Large scale with complex queries</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="font-semibold text-green-900">Use Both (Our Approach):</p>
                <ul className="list-disc list-inside ml-4 text-green-800 text-sm space-y-1">
                  <li><strong>CloudWatch:</strong> Monitor deployed Lambda/EC2</li>
                  <li><strong>Prometheus:</strong> Track application-specific metrics (AI costs, appointments, handoffs)</li>
                  <li><strong>Best of both worlds:</strong> AWS infrastructure + custom business metrics</li>
                </ul>
              </div>
            </div>
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
              <p className="font-semibold text-gray-900">Can't see Lambda metrics in CloudWatch:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                <li>Make sure you've invoked the Lambda at least once</li>
                <li>Check you're in the correct AWS region</li>
                <li>Wait a few minutes for metrics to appear</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900">SNS subscription not confirmed:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                <li>Check spam folder for confirmation email</li>
                <li>Try creating subscription again with different email</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900">CloudWatch alarm not triggering:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                <li>Verify alarm is in "OK" state (not "Insufficient data")</li>
                <li>Check threshold is actually exceeded</li>
                <li>Wait full evaluation period (5 minutes)</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900">/health/detailed endpoint returns error:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                <li>Ensure psutil is installed: <code className="bg-gray-200 px-1 py-0.5 rounded">pip install psutil==5.9.8</code></li>
                <li>Restart Flask service: <code className="bg-gray-200 px-1 py-0.5 rounded">python app.py</code></li>
                <li>Check application logs for specific errors</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Dashboard shows 0 for all metrics:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                <li>Service may have just started (metrics will populate with usage)</li>
                <li>Try sending test requests: <code className="bg-gray-200 px-1 py-0.5 rounded">curl http://localhost:5001/health</code></li>
                <li>Check browser console for fetch errors</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Error rate showing incorrectly:</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
                <li>Error rate is calculated as (failed / total) * 100</li>
                <li>If total requests is 0, error rate shows 0%</li>
                <li>Send some requests to populate statistics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lab Summary */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-900">Lab 9 Summary - What You Learned</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-green-800">
            Congratulations! You've learned production monitoring concepts and enhanced your MLOps service with production-grade observability. Here's what you accomplished:
          </p>

          <div>
            <p className="font-semibold text-green-900 mb-2">✅ Monitoring Concepts Learned</p>
            <ul className="list-disc list-inside ml-4 text-green-800 space-y-1">
              <li><strong>4 Golden Signals:</strong> Latency, Traffic, Errors, Saturation</li>
              <li><strong>Monitoring Types:</strong> Metrics, Logs, and Traces</li>
              <li><strong>CloudWatch:</strong> AWS's automatic monitoring for Lambda</li>
              <li><strong>Alarms:</strong> Proactive notifications when thresholds are exceeded</li>
              <li><strong>Production Best Practices:</strong> Alert thresholds, log levels, retention</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-900 mb-2">🚀 What You Built</p>
            <ul className="list-disc list-inside ml-4 text-green-800 space-y-1">
              <li><strong>CloudWatch Exploration:</strong> Viewed Lambda metrics and logs</li>
              <li><strong>CloudWatch Alarm:</strong> Email notifications for high error rates</li>
              <li><strong>Enhanced Health Endpoint:</strong> Detailed service status with uptime and resources</li>
              <li><strong>Request Tracking:</strong> Total requests, failed requests, error rates</li>
              <li><strong>Improved Dashboard:</strong> 10 comprehensive metrics with color-coded indicators</li>
            </ul>
          </div>

          <div className="bg-white border border-green-300 rounded-lg p-4">
            <p className="font-semibold text-green-900 mb-2">🔑 Key Takeaways</p>
            <ul className="list-disc list-inside ml-4 text-green-800 space-y-1 text-sm">
              <li><strong>Monitor everything:</strong> You can't fix what you don't measure</li>
              <li><strong>CloudWatch is automatic:</strong> AWS Lambda monitoring requires zero setup</li>
              <li><strong>Set smart thresholds:</strong> Not too noisy, not too loose</li>
              <li><strong>Track AI costs:</strong> Prevent surprise bills from runaway API usage</li>
              <li><strong>Cold starts are normal:</strong> First Lambda request after idle takes 1-3 seconds</li>
              <li><strong>Use both CloudWatch and Prometheus:</strong> AWS infrastructure + custom metrics</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Section */}
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">📝 Test Your Knowledge</h3>
        <p className="text-gray-700 mb-4">
          Complete the Lab 9 quiz to test your understanding of monitoring and logging for production AI systems.
        </p>
        <div className="space-y-3">
          <a
            href="/quizzes/lab9-quiz.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Take Lab 9 Quiz →
          </a>
          <div className="bg-white border border-violet-200 rounded-lg p-4">
            <p className="font-semibold text-violet-900 mb-2">📸 Quiz Submission Checklist:</p>
            <ul className="list-disc list-inside ml-4 text-violet-800 text-sm space-y-1">
              <li>Complete all 5 multiple-choice questions</li>
              <li>Take a screenshot of your results page showing:</li>
              <ul className="list-disc list-inside ml-6">
                <li>Your name</li>
                <li>Your score (aim for 4/5 or 5/5)</li>
                <li>Session ID</li>
                <li>Timestamp</li>
              </ul>
              <li>Submit screenshot as proof of completion</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t">
        <a href="/labs/lab8" className="text-blue-600 hover:underline flex items-center gap-2">
          ← Lab 8: Serverless Deployment
        </a>
        <a href="/labs" className="text-blue-600 hover:underline flex items-center gap-2">
          Back to Labs →
        </a>
      </div>
    </div>
  )
}
