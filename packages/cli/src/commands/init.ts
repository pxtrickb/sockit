import { Command } from 'commander';
import { LogInfo, LogError, LogSuccess, LogWarning } from '../utils/logger';
import { execAsync } from '../utils/exec';
import checkDeps from '../utils/checkDeps';
import fs from 'fs';
import chalk from 'chalk';

export function registerInitCommand(program: Command) {
    const path = require('path');

    program
        .command('init')
        .description('Initialize SocKit in your Next.js project')
        .option('-d, --skip-deps', 'Skip checking for dependencies')
        .option('-s, --skip-scripts', 'Skip modifying package.json scripts')
        .option('-e, --skip-env', 'Skip generating .env file')
        .option('-p, --port <port>', 'Set the port for the SocKit server')
        .option('-u, --url <url>', 'Set the URL for the SocKit server')
        .action(async (options) => {
            LogInfo('Starting SocKit in your Next.js project...');

            const sockitDefaultJson = {
                url: options.url || 'http://localhost',
                port: options.port || 3333,
                verbose: true,
                cors: {
                    origin: ['*'],
                    methods: ['GET', 'POST']
                }
            };

            // Check if the project is a Next.js project
            LogInfo('Checking if the project is a Next.js project...');
            const isNextJsProject = await execAsync('npx next --version');
            if (!isNextJsProject) {
                LogError('Next.js is not properly installed in your project.');
                return;
            } else {
                LogSuccess('Next.js is properly installed in your project.');
            }

            // Check if the project is using TypeScript
            LogInfo('Checking if the project is using TypeScript...');
            const isTypescriptProject = await execAsync('npx tsc --version');
            if (!isTypescriptProject) {
                LogError('TypeScript is not properly installed in your project.');
                return;
            } else {
                LogSuccess('TypeScript is properly installed in your project.');
            }

            // Check & install dependencies
            if (!options.skipDeps) {
                await checkDeps('@sockit/client');
                await checkDeps('concurrently');
            }

            // Generate events directory
            LogInfo('Generating events directory...');
            const eventsDirPath = path.join(process.cwd(), 'events');
            const eventsDirExists = fs.existsSync(eventsDirPath);
            if (!eventsDirExists) {
                LogInfo('Creating events directory...');
                fs.mkdirSync(eventsDirPath);
                LogSuccess('Events directory was created successfully.');
            } else {
                LogInfo('Events directory already exists...');
            }

            // Generate sockit.json
            LogInfo('Generating sockit.json...');
            const sockitJsonPath = path.join(process.cwd(), 'sockit.json');
            const sockitJsonExists = fs.existsSync(sockitJsonPath);
            if (!sockitJsonExists) {
                LogInfo('Creating sockit.json...');
                fs.writeFileSync(sockitJsonPath, JSON.stringify(sockitDefaultJson, null, 2));
                LogSuccess('sockit.json was created successfully.');
            } else {
                LogInfo('sockit.json already exists...');
            }

            // Generate .env file
            if (!options.skipEnv) {
                LogInfo('Generating .env file...');
                const envFilePath = path.join(process.cwd(), '.env');
                const envFileExists = fs.existsSync(envFilePath);
                if (!envFileExists) {
                    LogInfo('Creating .env file...');
                    fs.writeFileSync(envFilePath, `NEXT_PUBLIC_SOCKIT_URL=${sockitDefaultJson.url}\nNEXT_PUBLIC_SOCKIT_PORT=${sockitDefaultJson.port}`);
                    LogSuccess('.env file was created successfully.');
                } else {
                    LogInfo('.env file already exists...');
                    LogWarning('For production, please set: ')
                    LogInfo('  SOCKIT_URL= [...]')
                    LogInfo('  SOCKIT_PORT= [...]')
                    LogWarning('These values are used by @sockit/client. Make sure they match the values in your sockit.json file.')
                }
            } else {
                LogWarning('Skipping .env file generation...');
                LogWarning('You can modify the .env file manually.');
                LogWarning('For production, please set: ')
                LogInfo('  SOCKIT_URL= [...]')
                LogInfo('  SOCKIT_PORT= [...]')
                LogWarning('These values are used by @sockit/client. Make sure they match the values in your sockit.json file.')
            }

            // Modify package.json
            if (!options.skipScripts) {
                LogInfo('Modifying package.json...');
                const packageJsonPath = path.join(process.cwd(), 'package.json');
                const packageJsonExists = fs.existsSync(packageJsonPath);
                if (!packageJsonExists) {
                    LogError('package.json does not exist in your project.');
                    return;
                } else {
                    let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                    packageJson.scripts.dev = 'concurrently --raw "next dev" "sockit start"';
                    packageJson.scripts.start = 'concurrently --raw "next start" "sockit start"';
                    try {
                        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
                        LogSuccess('package.json was modified successfully.');
                    } catch (error) {
                        LogError('Failed to modify package.json');
                        return;
                    }
                }
            } else {
                LogWarning('Skipping package.json modification...');
                console.log('\n');
                LogWarning('You can modify the package.json scripts manually.');
                LogWarning('Add the following scripts to your package.json:');
                LogInfo('  Scripts: {');
                LogInfo('    "dev": "concurrently --raw "next dev" "sockit start"');
                LogInfo('    "start": "concurrently --raw "next start" "sockit start"');
                LogInfo('  }');
                console.log('\n');
            }

            console.log('\n');
            console.log('\n');
            console.log('\n');
            LogInfo('SocKit server will start automatically along with your Next.js project.');
            LogInfo(`Start the server with: ${chalk.blue('npm run dev')} or ${chalk.blue('npm run start')}. (Use ${chalk.blue('sockit start')} to start only the SocKit server)`);
            console.log('\n');
            LogInfo('You can now start using SocKit in your project!');
            console.log('\n');
            console.log('\n');
            console.log('\n');
            LogSuccess('SocKit has been successfully installed in your project.');
            console.log('\n');
            console.log('\n');
        });
}
