import { execSync } from 'child_process';
import { LogError } from './logger';

function log(error: Error, command: string) {
    LogError(`Failed to execute command: ${command}`);
    LogError(`==== ${(error as Error).name} ====`);
    LogError((error as Error).message);
    // LogError((error as Error).stack || '');
    LogError(`==================================`);
    return null;
}

export function exec(command: string) {
    try {
        const result = execSync(command);
        return result.toString();
    } catch (error) {
        log(error as Error, command);
        return null;
    }
}

export async function execAsync(command: string) {
    try {
        const result = await exec(command);
        return result;
    } catch (error) {
        log(error as Error, command);
        return null;
    }
}