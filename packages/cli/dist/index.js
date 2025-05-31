"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Main entrypoint for @sockit/cli
const commander_1 = require("commander");
const init_1 = require("./commands/init");
const start_1 = require("./commands/start");
const program = new commander_1.Command();
program.name('sockit');
(0, init_1.registerInitCommand)(program);
(0, start_1.registerStartCommand)(program);
program.parse(process.argv);
