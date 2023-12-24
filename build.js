const { execSync } = require('child_process');

// Run npm install to ensure dependencies are installed
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Run the build script defined in your package.json
console.log('Running build script...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Build process completed successfully.');
