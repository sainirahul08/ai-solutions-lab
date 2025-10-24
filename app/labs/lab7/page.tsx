import Link from "next/link";
import { CodeBlock } from "@/components/labs/code-block";

export default function Lab7Page() {
  return (
    <>
      {/* Lab Header */}
      <div className="mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4 sm:mb-6">
          <div className="text-center py-1 sm:py-0">
            <div className="text-sm sm:text-lg font-semibold text-blue-900">Advanced</div>
            <div className="text-xs sm:text-sm text-blue-700">Level</div>
          </div>
          <div className="text-center py-1 sm:py-0">
            <div className="text-sm sm:text-lg font-semibold text-blue-900">AWS EC2 + Vercel</div>
            <div className="text-xs sm:text-sm text-blue-700">Technology</div>
          </div>
        </div>

        <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
          Deploy your complete AI application stack to production: Next.js to Vercel and Flask MLOps service to AWS EC2.
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none prose-sm sm:prose-base">
        <h2 id="overview" className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-4 sm:mb-6 text-gray-900">Lab Overview</h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>What You'll Do:</strong> Deploy Next.js to Vercel (production), deploy Flask MLOps container to AWS EC2, and connect everything for a live production system
        </p>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Lab Collaborators:</strong>
        </p>
        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Edward Lampoh - Software Developer & Collaborator</li>
          <li className="text-gray-700">Oluwafemi Adebayo, PhD - Academic Professor & Collaborator</li>
        </ul>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-800 mb-2">🚨 Prerequisites Required</h3>
          <p className="text-red-700">
            You must complete Labs 1-6 with working Docker containers and Kubernetes knowledge before starting Lab 7.
          </p>
        </div>

        <h2 id="prerequisites" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Prerequisites Check</h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Before starting Lab 7, ensure you have:</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">✅ Docker image built: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">docker images | grep mlops-service</code></li>
          <li className="text-gray-700">✅ Kubernetes deployment working from Lab 6</li>
          <li className="text-gray-700">✅ Next.js app running locally</li>
          <li className="text-gray-700">✅ AWS account created (from Lab 1)</li>
          <li className="text-gray-700">✅ Credit/debit card for AWS (using free tier only)</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">📝 Important Note</h4>
          <p className="text-blue-700">
            This lab uses <strong>AWS free tier</strong> exclusively. Everything you'll do in this lab is covered under AWS free tier - you won't be charged as long as you use the resources specified in this lab (t2.micro instance, 8 GB storage).
          </p>
        </div>

        <h2 id="part-a" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part A: Understanding Cloud Deployment</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Learn what cloud deployment means and why it's essential
        </p>

        <h3 id="what-is-cloud" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. What is Cloud Deployment?</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Cloud deployment</strong> means running your application on servers managed by cloud providers (AWS, Google Cloud, Azure) instead of your own computer.
        </p>

        <h3 id="why-cloud" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Why Deploy to Cloud?</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Cloud deployment benefits:</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-1 text-gray-700">
          <li>• Available 24/7</li>
          <li>• Accessible from anywhere in the world</li>
          <li>• Automatic scaling based on demand</li>
          <li>• Professional monitoring and backups</li>
        </ul>

        <h3 id="architecture" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Our Cloud Architecture</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>What We're Deploying:</strong>
        </p>

        <CodeBlock language="text">{`Users (Internet)
    ↓
Next.js App (Vercel)
    ↓
Flask MLOps Service (AWS EC2)
    ↓
Neon PostgreSQL (Already Cloud-Based)`}</CodeBlock>

        <h3 id="ec2-basics" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. AWS EC2 Basics</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>What is EC2?</strong> EC2 = Elastic Compute Cloud - a virtual computer running in AWS data centers.
        </p>

        <h2 id="part-b" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part B: Deploy Next.js to Vercel</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Deploy your Next.js application to production hosting
        </p>

        <h3 id="vercel-setup" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. What is Vercel?</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Vercel</strong> is a platform built specifically for Next.js applications:
        </p>

        <ul className="mb-6 ml-6 space-y-1 text-gray-700">
          <li>• Created by the team that built Next.js</li>
          <li>• Automatic deployments from GitHub</li>
          <li>• Global CDN (fast anywhere in the world)</li>
          <li>• Free tier for hobby projects</li>
          <li>• SSL certificates included</li>
        </ul>

        <h3 id="connect-github" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Connect GitHub</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Sign in to Vercel:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2 text-gray-700 list-decimal">
          <li>Go to <a href="https://vercel.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
          <li>Click "Sign Up" or "Login"</li>
          <li>Choose "Continue with GitHub"</li>
          <li>Authorize Vercel to access your repositories</li>
        </ol>

        <h3 id="env-variables" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Configure Environment Variables</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Before deploying, add your environment variables in Vercel.
        </p>

        <h3 id="deploy-vercel" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Deploy to Vercel</h3>

        <ol className="mb-6 ml-6 space-y-2 text-gray-700 list-decimal">
          <li>Click "Deploy" button</li>
          <li>Wait 2-3 minutes for build to complete</li>
          <li>Click "Visit" to see your live site</li>
        </ol>

        <h3 id="test-deployment" className="text-xl font-semibold mt-8 mb-4 text-gray-900">5. Test Your Deployment</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Visit your Vercel URL and test the application.
        </p>

        <h2 id="part-c" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part C: AWS Account & IAM Setup</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Prepare your AWS account for EC2 deployment
        </p>

        <h3 id="aws-console" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Sign in to AWS Console</h3>

        <ol className="mb-6 ml-6 space-y-2 text-gray-700 list-decimal">
          <li>Go to <a href="https://aws.amazon.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">aws.amazon.com</a></li>
          <li>Click "Sign In to the Console"</li>
          <li>Enter your AWS account credentials (created in Lab 1)</li>
        </ol>

        <h3 id="select-region" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Select Your Region</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Choose a region close to you from the top-right dropdown.
        </p>

        <h3 id="key-pair" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Create EC2 Key Pair</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Key pairs let you securely access your EC2 instance.
        </p>

        <CodeBlock language="bash">{`# Mac/Linux - Set permissions
chmod 400 ~/.ssh/mlops-service-key.pem`}</CodeBlock>

        <h3 id="security-group" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Create Security Group</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Security groups control network access to your EC2 instance.
        </p>

        <h2 id="part-d" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part D: Deploy Flask to AWS EC2</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Launch an EC2 instance and run your Docker container
        </p>

        <h3 id="launch-instance" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Launch EC2 Instance</h3>

        <ol className="mb-6 ml-6 space-y-2 text-gray-700 list-decimal">
          <li>Go to EC2 Dashboard</li>
          <li>Click "Launch instance" button</li>
        </ol>

        <h3 id="configure-instance" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Configure Instance Details</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Instance type:</strong> Select t2.micro (free tier - required for this course)
        </p>

        <h3 id="get-public-ip" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Get Instance Public IP</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Copy the public IP address from your instance details.
        </p>

        <h3 id="connect-ec2" className="text-xl font-semibold mt-8 mb-4 text-gray-900">5. Connect to EC2</h3>

        <CodeBlock language="bash">{`# Connect via SSH
ssh -i ~/.ssh/mlops-service-key.pem ubuntu@YOUR_EC2_PUBLIC_IP`}</CodeBlock>

        <h3 id="install-docker" className="text-xl font-semibold mt-8 mb-4 text-gray-900">6. Install Docker on EC2</h3>

        <CodeBlock language="bash">{`# Update and install Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io`}</CodeBlock>

        <h3 id="transfer-image" className="text-xl font-semibold mt-8 mb-4 text-gray-900">7. Transfer Docker Image</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Rebuild your Docker image on EC2 by cloning your repository.
        </p>

        <h3 id="create-env" className="text-xl font-semibold mt-8 mb-4 text-gray-900">8. Create Environment File</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Create a .env file on EC2 with your production environment variables.
        </p>

        <h3 id="run-container" className="text-xl font-semibold mt-8 mb-4 text-gray-900">9. Run Docker Container</h3>

        <CodeBlock language="bash">{`# Run container
docker run -d \\
  --name mlops-service \\
  --restart unless-stopped \\
  -p 5001:5001 \\
  --env-file .env \\
  mlops-service:latest`}</CodeBlock>

        <h3 id="test-flask" className="text-xl font-semibold mt-8 mb-4 text-gray-900">10. Test Flask Service</h3>

        <CodeBlock language="bash">{`# Test health endpoint
curl http://YOUR_EC2_PUBLIC_IP:5001/health`}</CodeBlock>

        <h2 id="part-e" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part E: Connect Services</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Link Vercel and AWS together for production system
        </p>

        <h3 id="update-vercel" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Update Vercel Environment</h3>

        <ol className="mb-6 ml-6 space-y-2 text-gray-700 list-decimal">
          <li>Go to Vercel project settings</li>
          <li>Update MLOPS_SERVICE_URL to your EC2 IP</li>
          <li>Redeploy</li>
        </ol>

        <h3 id="test-integration" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Test End-to-End</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Test the complete flow from Vercel to AWS.
        </p>

        <h3 id="configure-cors" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Configure CORS</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Update CORS settings in Flask if needed.
        </p>

        <h2 id="part-f" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part F: Understanding AWS Free Tier</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Learn about AWS free tier and how to track your usage
        </p>

        <h3 id="costs" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Understanding AWS Costs</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>AWS Free Tier (What We're Using):</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-2 text-gray-700">
          <li>• <strong>EC2 t2.micro:</strong> 750 hours/month for 12 months</li>
          <li>• <strong>Storage (EBS):</strong> 30 GB included in free tier</li>
          <li>• <strong>Data transfer:</strong> 1 GB outbound free per month</li>
        </ul>

        <h3 id="billing-alerts" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Set Up Billing Alerts (Optional)</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Enable free tier usage alerts to get notified when approaching limits.
        </p>

        <h3 id="monitor-usage" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Monitor Your Usage (Optional)</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Check the Free Tier dashboard in AWS to view your usage.
        </p>

        <h3 id="cost-optimization" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Cost Optimization Tips</h3>

        <ul className="mb-6 ml-6 space-y-2 text-gray-700">
          <li>• Use only what's in this lab: t2.micro instance, 8 GB storage</li>
          <li>• Don't launch additional instances</li>
          <li>• Running one instance 24/7 uses only 744 hours - you're covered!</li>
        </ul>

        <h2 id="troubleshooting" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Troubleshooting</h2>

        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Cannot connect to EC2 via SSH</p>
            <p className="text-gray-700 text-sm">Check security group allows your IP</p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Flask container not accessible</p>
            <p className="text-gray-700 text-sm">Verify security group port 5001 is open</p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Seeing unexpected charges</p>
            <p className="text-gray-700 text-sm">Verify you selected t2.micro and haven't launched multiple instances</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Lab 7 Summary - What You Deployed</h2>

        <p className="mb-6 text-gray-700 leading-relaxed">
          Congratulations! You've deployed a complete production AI application to the cloud.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">✅ Cloud Deployment Skills Gained</h3>

        <ul className="mb-6 ml-6 space-y-2 text-gray-700">
          <li><strong>Vercel Deployment:</strong> Production Next.js hosting with automatic builds</li>
          <li><strong>AWS EC2:</strong> Virtual machine management and Docker deployment</li>
          <li><strong>Cloud Architecture:</strong> Multi-service cloud infrastructure</li>
          <li><strong>Environment Management:</strong> Secure production configuration</li>
          <li><strong>Free Tier Management:</strong> Understanding AWS free tier limits</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            <strong>Key Takeaway:</strong> AWS free tier covers everything in this lab - no charges when following instructions. Free tier is valid for 12 months from AWS account creation.
          </p>
        </div>

        {/* Quiz Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">📝 Test Your Knowledge</h3>
          <p className="text-gray-700 mb-4">
            Complete the Lab 7 quiz to test your understanding of cloud deployment concepts with AWS EC2 and Vercel.
          </p>
          <a
            href="/quizzes/lab7-quiz.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Take Lab 7 Quiz →
          </a>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <div>
            <Link href="/labs/lab6" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Lab 6: Kubernetes
            </Link>
          </div>
          <div>
            <Link href="/labs" className="text-blue-600 hover:text-blue-700 font-medium">
              Back to Labs →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
