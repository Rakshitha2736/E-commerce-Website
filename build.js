// Build script for Render deployment
const { execSync } = require('child_process');
const path = require('path');

console.log('Starting build process...');

try {
  // Install client dependencies
  console.log('Installing client dependencies...');
  execSync('cd client && npm install', { stdio: 'inherit' });
  
  // Build client
  console.log('Building client...');
  execSync('cd client && npm run build', { stdio: 'inherit' });
  
  // Install server dependencies
  console.log('Installing server dependencies...');
  execSync('cd server && npm install', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}