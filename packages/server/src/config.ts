// Loads and validates sockit.json
import fs from 'fs';
import path from 'path';
import { FatalError, LogInfo } from './utils/logger';

const validateConfig = (config: any) => {
    if (!config.url) {
        FatalError('Invalid sockit.json file. Please specify a valid url.');
    }

    if (!config.url.startsWith('http')) {
        FatalError('Invalid url. Please specify a valid url.');
    }

    if (config.url.endsWith('/')) {
        FatalError('Invalid url. Please do not include a trailing slash.');
    }

    if (config.url.includes(' ')) {
        FatalError('Invalid url. Please do not include a space in the url.');
    }

    if (config.url.split(':').length > 2) {
        FatalError('Invalid url. Please do not include the port in the url.');
    }

    if (!config.port) {
        FatalError('Invalid sockit.json file. Please specify a valid port.');
    }

    if (config.port < 1 || config.port > 65535) {
        FatalError('Invalid port number. Please specify a port between 1 and 65535.');
    }

    if (config.verbose !== undefined && typeof config.verbose !== 'boolean') {
        FatalError('Invalid verbose value. Please specify a valid boolean value.');
    }

    if (config.cors !== undefined && typeof config.cors !== 'object') {
        FatalError('Invalid cors value. Please specify a valid object value.');
    }
};

export const getConfig = () => {
    const sockitJsonPath = path.join(process.cwd(), 'sockit.json');
    const sockitJson = JSON.parse(fs.readFileSync(sockitJsonPath, 'utf8'));

    if (!fs.existsSync(sockitJsonPath)) {
        FatalError('Could not find sockit.json file. Run sockit init to create one.');
    }

    const config = {
        url: sockitJson.url,
        port: sockitJson.port,
        verbose: sockitJson.verbose,
        cors: sockitJson.cors
    };

    LogInfo('Validating config...');
    validateConfig(config);
    return config;
};