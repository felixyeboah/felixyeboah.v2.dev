const { spawn, exec } = require('child_process');
const http = require('http');
const readline = require('readline');

// Utility to ask yes/no questions
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, answer => {
    rl.close();
    resolve(answer.toLowerCase().startsWith('y'));
  }));
}

// Check if the server is running
async function isServerRunning(port = 3000) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 300);
      res.resume(); // Drain the response
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Wait for server to start
async function waitForServer(port = 3000, maxAttempts = 30) {
  console.log('Waiting for Next.js server to start...');
  
  for (let i = 0; i < maxAttempts; i++) {
    const isRunning = await isServerRunning(port);
    if (isRunning) {
      console.log('✅ Next.js server is running!');
      return true;
    }
    
    // Progress indicator
    process.stdout.write('.');
    
    // Wait 1 second between checks
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n❌ Timed out waiting for server to start');
  return false;
}

// Start the Next.js dev server
function startDevServer() {
  console.log('Starting Next.js development server...');
  
  const serverProcess = spawn('npm', ['run', 'dev'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
    shell: true
  });
  
  // Log server output
  serverProcess.stdout.on('data', (data) => {
    process.stdout.write(data);
  });
  
  serverProcess.stderr.on('data', (data) => {
    process.stderr.write(data);
  });
  
  // Unref the child process so it can continue running after this script exits
  serverProcess.unref();
  
  return serverProcess;
}

// Run the OG image generation script
async function generateOGImages(options = []) {
  return new Promise((resolve, reject) => {
    const args = ['run', 'generate-og', '--', ...options];
    console.log(`\nRunning: npm ${args.join(' ')}`);
    
    const ogProcess = spawn('npm', args, {
      stdio: 'inherit',
      shell: true
    });
    
    ogProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`OG image generation failed with code ${code}`));
      }
    });
  });
}

// Main function
async function main() {
  console.log('🖼️  OG Image Generation Setup');
  console.log('==============================');
  
  // Parse command-line arguments
  const args = process.argv.slice(2);
  const options = args.filter(arg => arg.startsWith('--'));
  
  // Check if server is running
  const serverRunning = await isServerRunning();
  
  if (!serverRunning) {
    console.log('❌ Next.js development server is not running');
    
    const startServer = await askQuestion('Do you want to start the Next.js server now? (y/n) ');
    
    if (startServer) {
      // Start server in the background
      const serverProcess = startDevServer();
      
      // Wait for the server to start
      const serverStarted = await waitForServer();
      
      if (!serverStarted) {
        console.error('Failed to start the Next.js server. Please start it manually with "npm run dev"');
        process.exit(1);
      }
    } else {
      console.log('Please start the Next.js server manually with "npm run dev" and try again.');
      process.exit(1);
    }
  } else {
    console.log('✅ Next.js development server is already running');
  }
  
  // Generate OG images
  try {
    await generateOGImages(options);
    console.log('\n✅ OG images generated successfully!');
    console.log('\nYou can view them at: http://localhost:3000/og-static-preview');
  } catch (error) {
    console.error('\n❌ Failed to generate OG images:', error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 