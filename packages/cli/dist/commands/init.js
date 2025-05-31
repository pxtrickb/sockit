"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerInitCommand = registerInitCommand;
const logger_1 = require("../utils/logger");
const exec_1 = require("../utils/exec");
const checkDeps_1 = __importDefault(require("../utils/checkDeps"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
function registerInitCommand(program) {
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
        (0, logger_1.LogInfo)('Starting SocKit in your Next.js project...');
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
        (0, logger_1.LogInfo)('Checking if the project is a Next.js project...');
        const isNextJsProject = await (0, exec_1.execAsync)('npx next --version');
        if (!isNextJsProject) {
            (0, logger_1.LogError)('Next.js is not properly installed in your project.');
            return;
        }
        else {
            (0, logger_1.LogSuccess)('Next.js is properly installed in your project.');
        }
        // Check if the project is using TypeScript
        (0, logger_1.LogInfo)('Checking if the project is using TypeScript...');
        const isTypescriptProject = await (0, exec_1.execAsync)('npx tsc --version');
        if (!isTypescriptProject) {
            (0, logger_1.LogError)('TypeScript is not properly installed in your project.');
            return;
        }
        else {
            (0, logger_1.LogSuccess)('TypeScript is properly installed in your project.');
        }
        // Check & install dependencies
        if (!options.skipDeps) {
            await (0, checkDeps_1.default)('@sockit/client');
            await (0, checkDeps_1.default)('concurrently');
        }
        // Generate events directory
        (0, logger_1.LogInfo)('Generating events directory...');
        const eventsDirPath = path.join(process.cwd(), 'events');
        const eventsDirExists = fs_1.default.existsSync(eventsDirPath);
        if (!eventsDirExists) {
            (0, logger_1.LogInfo)('Creating events directory...');
            fs_1.default.mkdirSync(eventsDirPath);
            (0, logger_1.LogSuccess)('Events directory was created successfully.');
        }
        else {
            (0, logger_1.LogInfo)('Events directory already exists...');
        }
        // Generate sockit.json
        (0, logger_1.LogInfo)('Generating sockit.json...');
        const sockitJsonPath = path.join(process.cwd(), 'sockit.json');
        const sockitJsonExists = fs_1.default.existsSync(sockitJsonPath);
        if (!sockitJsonExists) {
            (0, logger_1.LogInfo)('Creating sockit.json...');
            fs_1.default.writeFileSync(sockitJsonPath, JSON.stringify(sockitDefaultJson, null, 2));
            (0, logger_1.LogSuccess)('sockit.json was created successfully.');
        }
        else {
            (0, logger_1.LogInfo)('sockit.json already exists...');
        }
        // Generate .env file
        if (!options.skipEnv) {
            (0, logger_1.LogInfo)('Generating .env file...');
            const envFilePath = path.join(process.cwd(), '.env');
            const envFileExists = fs_1.default.existsSync(envFilePath);
            if (!envFileExists) {
                (0, logger_1.LogInfo)('Creating .env file...');
                fs_1.default.writeFileSync(envFilePath, `NEXT_PUBLIC_SOCKIT_URL=${sockitDefaultJson.url}\nNEXT_PUBLIC_SOCKIT_PORT=${sockitDefaultJson.port}`);
                (0, logger_1.LogSuccess)('.env file was created successfully.');
            }
            else {
                (0, logger_1.LogInfo)('.env file already exists...');
                (0, logger_1.LogWarning)('For production, please set: ');
                (0, logger_1.LogInfo)('  SOCKIT_URL= [...]');
                (0, logger_1.LogInfo)('  SOCKIT_PORT= [...]');
                (0, logger_1.LogWarning)('These values are used by @sockit/client. Make sure they match the values in your sockit.json file.');
            }
        }
        else {
            (0, logger_1.LogWarning)('Skipping .env file generation...');
            (0, logger_1.LogWarning)('You can modify the .env file manually.');
            (0, logger_1.LogWarning)('For production, please set: ');
            (0, logger_1.LogInfo)('  SOCKIT_URL= [...]');
            (0, logger_1.LogInfo)('  SOCKIT_PORT= [...]');
            (0, logger_1.LogWarning)('These values are used by @sockit/client. Make sure they match the values in your sockit.json file.');
        }
        // Modify package.json
        if (!options.skipScripts) {
            (0, logger_1.LogInfo)('Modifying package.json...');
            const packageJsonPath = path.join(process.cwd(), 'package.json');
            const packageJsonExists = fs_1.default.existsSync(packageJsonPath);
            if (!packageJsonExists) {
                (0, logger_1.LogError)('package.json does not exist in your project.');
                return;
            }
            else {
                let packageJson = JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf8'));
                packageJson.scripts.dev = 'concurrently --raw "next dev" "sockit start"';
                packageJson.scripts.start = 'concurrently --raw "next start" "sockit start"';
                try {
                    fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
                    (0, logger_1.LogSuccess)('package.json was modified successfully.');
                }
                catch (error) {
                    (0, logger_1.LogError)('Failed to modify package.json');
                    return;
                }
            }
        }
        else {
            (0, logger_1.LogWarning)('Skipping package.json modification...');
            console.log('\n');
            (0, logger_1.LogWarning)('You can modify the package.json scripts manually.');
            (0, logger_1.LogWarning)('Add the following scripts to your package.json:');
            (0, logger_1.LogInfo)('  Scripts: {');
            (0, logger_1.LogInfo)('    "dev": "concurrently --raw "next dev" "sockit start"');
            (0, logger_1.LogInfo)('    "start": "concurrently --raw "next start" "sockit start"');
            (0, logger_1.LogInfo)('  }');
            console.log('\n');
        }
        console.log('\n');
        console.log('\n');
        console.log('\n');
        (0, logger_1.LogInfo)('SocKit server will start automatically along with your Next.js project.');
        (0, logger_1.LogInfo)(`Start the server with: ${chalk_1.default.blue('npm run dev')} or ${chalk_1.default.blue('npm run start')}. (Use ${chalk_1.default.blue('sockit start')} to start only the SocKit server)`);
        console.log('\n');
        (0, logger_1.LogInfo)('You can now start using SocKit in your project!');
        console.log('\n');
        console.log('\n');
        console.log('\n');
        (0, logger_1.LogSuccess)('SocKit has been successfully installed in your project.');
        console.log('\n');
        console.log('\n');
    });
}
