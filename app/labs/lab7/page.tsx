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
          <li className="text-gray-700">✅ Credit/debit card for AWS (free tier available)</li>
        </ul>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">📝 Important Note</h4>
          <p className="text-yellow-700">
            This lab deploys to <strong>real cloud services</strong> that may incur costs. We'll use AWS free tier where possible, but monitor your billing dashboard throughout this lab.
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

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Simple Analogy:</h4>
          <p className="text-blue-700 mb-2">
            Think of cloud deployment like renting vs. owning:
          </p>
          <ul className="text-blue-700 space-y-1 text-sm ml-4">
            <li>• <strong>Local Development</strong> = Cooking in your own kitchen</li>
            <li>• <strong>Cloud Deployment</strong> = Running a restaurant with rented space and utilities
              <ul className="ml-4 mt-1 space-y-1">
                <li>- You don't maintain the building</li>
                <li>- You pay for what you use</li>
                <li>- You can scale up/down as needed</li>
                <li>- Professional infrastructure</li>
              </ul>
            </li>
          </ul>
        </div>

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

        <div className="space-y-3 mb-6">
          <div className="border-l-4 border-blue-400 pl-4">
            <p className="font-semibold text-gray-900">Next.js on Vercel</p>
            <p className="text-gray-700 text-sm">Frontend + API routes, optimized for Next.js</p>
          </div>
          <div className="border-l-4 border-green-400 pl-4">
            <p className="font-semibold text-gray-900">Flask on AWS EC2</p>
            <p className="text-gray-700 text-sm">MLOps service in Docker container on virtual machine</p>
          </div>
          <div className="border-l-4 border-purple-400 pl-4">
            <p className="font-semibold text-gray-900">Neon Database</p>
            <p className="text-gray-700 text-sm">Already serverless, no deployment needed</p>
          </div>
        </div>

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

        <h3 id="connect-github" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Connect GitHub Repository</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Sign in to Vercel:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2 text-gray-700 list-decimal">
          <li>Go to <a href="https://vercel.com" className="text-blue-600 hover:underline" target="_blank">vercel.com</a></li>
          <li>Click "Sign Up" or "Login"</li>
          <li>Choose "Continue with GitHub"</li>
          <li>Authorize Vercel to access your repositories</li>
        </ol>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Import Your Project:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2 text-gray-700 list-decimal">
          <li>Click "Add New Project"</li>
          <li>Find your <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">ai-solutions-lab</code> repository</li>
          <li>Click "Import"</li>
          <li>Vercel will detect it's a Next.js app automatically</li>
        </ol>

        <h2 id="part-c" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part C: AWS Account & IAM Setup</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Prepare your AWS account for EC2 deployment
        </p>

        <h3 id="aws-console" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Sign in to AWS Console</h3>

        <ol className="mb-6 ml-6 space-y-2 text-gray-700 list-decimal">
          <li>Go to <a href="https://aws.amazon.com" className="text-blue-600 hover:underline" target="_blank">aws.amazon.com</a></li>
          <li>Click "Sign In to the Console"</li>
          <li>Enter your AWS account credentials (created in Lab 1)</li>
          <li>You'll land on the AWS Management Console</li>
        </ol>

        <h3 id="key-pair" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Create EC2 Key Pair</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Key pairs let you securely access your EC2 instance:
        </p>

        <ol className="mb-6 ml-6 space-y-2 text-gray-700 list-decimal">
          <li>In AWS Console search bar, type "EC2" and click it</li>
          <li>In left sidebar, click "Key Pairs" (under Network & Security)</li>
          <li>Click "Create key pair" button</li>
          <li>Configure:
            <ul className="ml-6 mt-2 space-y-1">
              <li>• <strong>Name:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">mlops-service-key</code></li>
              <li>• <strong>Key pair type:</strong> RSA</li>
              <li>• <strong>Private key format:</strong> .pem (for Mac/Linux) or .ppk (for Windows PuTTY)</li>
            </ul>
          </li>
          <li>Click "Create key pair"</li>
          <li><strong>File downloads automatically</strong> - save it securely!</li>
        </ol>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-red-800 mb-2">⚠️ Security Warning:</h4>
          <ul className="text-red-700 text-sm space-y-1">
            <li>• This file is your access key - don't lose it!</li>
            <li>• Don't share it or commit to GitHub</li>
            <li>• If lost, you can't access your EC2 instance</li>
          </ul>
        </div>

        <p className="mb-2 text-gray-700"><strong>Mac/Linux - Set Permissions:</strong></p>
        <CodeBlock language="bash">{`# Move key to a safe location
mv ~/Downloads/mlops-service-key.pem ~/.ssh/

# Set proper permissions (required)
chmod 400 ~/.ssh/mlops-service-key.pem`}</CodeBlock>

        <h2 id="part-d" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part D: Deploy Flask to AWS EC2</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Launch an EC2 instance and run your Docker container
        </p>

        <h3 id="launch-instance" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Launch EC2 Instance</h3>

        <ol className="mb-6 ml-6 space-y-2 text-gray-700 list-decimal">
          <li>Go to EC2 Dashboard (search "EC2" in AWS Console)</li>
          <li>Click "Launch instance" button</li>
          <li>You'll see the launch wizard</li>
        </ol>

        <h3 id="install-docker" className="text-xl font-semibold mt-8 mb-4 text-gray-900">6. Install Docker on EC2</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Once connected to EC2, install Docker:
        </p>

        <CodeBlock language="bash">{`# Update package list
sudo apt-get update

# Install prerequisites
sudo apt-get install -y ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Install Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Add ubuntu user to docker group
sudo usermod -aG docker ubuntu

# Log out and back in
exit`}</CodeBlock>

        <h2 id="part-e" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part E: Connect Services & Update Environment Variables</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Link Vercel and AWS together for production system
        </p>

        <h3 id="update-vercel" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Update Vercel Environment Variables</h3>

        <ol className="mb-6 ml-6 space-y-2 text-gray-700 list-decimal">
          <li>Go to <a href="https://vercel.com" className="text-blue-600 hover:underline" target="_blank">vercel.com</a></li>
          <li>Click on your project</li>
          <li>Go to Settings → Environment Variables</li>
          <li>Find <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">MLOPS_SERVICE_URL</code></li>
          <li>Click "Edit"</li>
          <li>Update to: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">http://YOUR_EC2_PUBLIC_IP:5001</code></li>
          <li>Click "Save"</li>
        </ol>

        <h2 id="part-f" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part F: Cost Monitoring & AWS Billing Alerts</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Keep track of your AWS spending
        </p>

        <h3 id="costs" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Understanding AWS Costs</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>What you're paying for:</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-2 text-gray-700">
          <li>• <strong>EC2 t2.micro:</strong> Free tier eligible (750 hours/month for 12 months)</li>
          <li>• <strong>Storage (EBS):</strong> 8 GB included in free tier</li>
          <li>• <strong>Data transfer:</strong> 1 GB outbound free per month</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 After Free Tier:</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• t2.micro: ~$8-10/month if running 24/7</li>
            <li>• Storage: ~$1/month for 8 GB</li>
            <li>• Data transfer: Usually minimal for small apps</li>
          </ul>
        </div>

        <h2 id="troubleshooting" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Troubleshooting</h2>

        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Cannot connect to EC2 via SSH</p>
            <p className="text-gray-700 mb-2 text-sm">Check security group allows your IP:</p>
            <ol className="text-gray-700 text-sm ml-4 space-y-1 list-decimal">
              <li>EC2 → Security Groups → mlops-service-sg</li>
              <li>Inbound rules → SSH (port 22) → Source</li>
              <li>Update to "My IP" if changed</li>
            </ol>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Flask container not accessible from internet</p>
            <p className="text-gray-700 text-sm">Verify security group port 5001 is open to 0.0.0.0/0</p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Metrics not appearing</p>
            <p className="text-gray-700 text-sm">Check MLOPS_SERVICE_URL in Vercel should be http://EC2_PUBLIC_IP:5001 (not https)</p>
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
          <li><strong>Cost Monitoring:</strong> AWS billing alerts and optimization</li>
        </ul>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>Industry Relevance:</strong> You've deployed using the same architecture as real companies. Vercel is used by GitHub and Uber, while AWS EC2 powers Netflix and Airbnb.
          </p>
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
