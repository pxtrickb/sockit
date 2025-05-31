"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
// Loads and validates sockit.json
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("./utils/logger");
const validateConfig = (config) => {
    if (!config.url) {
        (0, logger_1.FatalError)('Invalid sockit.json file. Please specify a valid url.');
    }
    if (!config.url.startsWith('http')) {
        (0, logger_1.FatalError)('Invalid url. Please specify a valid url.');
    }
    if (config.url.endsWith('/')) {
        (0, logger_1.FatalError)('Invalid url. Please do not include a trailing slash.');
    }
    if (config.url.includes(' ')) {
        (0, logger_1.FatalError)('Invalid url. Please do not include a space in the url.');
    }
    if (config.url.split(':').length > 2) {
        (0, logger_1.FatalError)('Invalid url. Please do not include the port in the url.');
    }
    if (!config.port) {
        (0, logger_1.FatalError)('Invalid sockit.json file. Please specify a valid port.');
    }
    if (config.port < 1 || config.port > 65535) {
        (0, logger_1.FatalError)('Invalid port number. Please specify a port between 1 and 65535.');
    }
    if (config.verbose !== undefined && typeof config.verbose !== 'boolean') {
        (0, logger_1.FatalError)('Invalid verbose value. Please specify a valid boolean value.');
    }
    if (config.cors !== undefined && typeof config.cors !== 'object') {
        (0, logger_1.FatalError)('Invalid cors value. Please specify a valid object value.');
    }
};
const getConfig = () => {
    const sockitJsonPath = path_1.default.join(process.cwd(), 'sockit.json');
    const sockitJson = JSON.parse(fs_1.default.readFileSync(sockitJsonPath, 'utf8'));
    if (!fs_1.default.existsSync(sockitJsonPath)) {
        (0, logger_1.FatalError)('Could not find sockit.json file. Run sockit init to create one.');
    }
    const config = {
        url: sockitJson.url,
        port: sockitJson.port,
        verbose: sockitJson.verbose,
        cors: sockitJson.cors
    };
    (0, logger_1.LogInfo)('Validating config...');
    validateConfig(config);
    return config;
};
exports.getConfig = getConfig;
