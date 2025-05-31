// Main entrypoint for @sockit/cli
import { Command } from 'commander';
import { registerInitCommand } from './commands/init';
import { registerStartCommand } from './commands/start';

const program = new Command();
program.name('sockit');

registerInitCommand(program);
registerStartCommand(program);

program.parse(process.argv);

export { }; 