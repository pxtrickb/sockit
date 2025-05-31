import chalk from "chalk";

export function LogInfo(message: string) {
    console.log(chalk.blueBright('[SocKit]'), message);
}

export function LogError(message: string) {
    console.log(chalk.redBright('[SocKit]'), message);
}

export function FatalError(message: string) {
    console.log(chalk.redBright('[SocKit] =================================================================='));
    console.log(chalk.redBright('[SocKit] SocKit has encountered a fatal error. The server has been stopped.'));
    console.log(chalk.redBright('[SocKit] =================================================================='));
    console.log(chalk.redBright('[SocKit]'), message);
    console.log(chalk.redBright('[SocKit] =================================================================='));
    process.exit(1);
}

export function LogWarning(message: string) {
    console.log(chalk.yellowBright('[SocKit]'), message);
}

export function LogSuccess(message: string) {
    console.log(chalk.greenBright('[SocKit]'), message);
}