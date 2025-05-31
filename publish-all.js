const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packagesDir = path.join(__dirname, 'packages');
const packages = fs.readdirSync(packagesDir);

for (const pkg of packages) {
    const pkgPath = path.join(packagesDir, pkg, 'package.json');
    if (fs.existsSync(pkgPath)) {
        const pkgJson = require(pkgPath);
        if (!pkgJson.private) {
            try {
                console.log(`Publishing ${pkgJson.name}@${pkgJson.version}...`);
                execSync('npm publish --access public', { stdio: 'inherit', cwd: path.join(packagesDir, pkg) });
            } catch (e) {
                console.error(`Failed to publish ${pkgJson.name}:`, e.message);
            }
        }
    }
} 