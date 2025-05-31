import { Command } from 'commander';
import { LogInfo } from '../utils/logger';
import { start } from '@sockit/server';

export function registerStartCommand(program: Command) {

    program
        .command('start')
        .description('Start the SocKit server')
        .action(async () => {
            LogInfo('Starting SocKit server...');
            start();
        });
}
