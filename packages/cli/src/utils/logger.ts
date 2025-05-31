import chalk from "chalk";

export function LogInfo(message: string) {
    console.log(chalk.blueBright('[SocKit]'), message);
}

export function LogError(message: string) {
    console.log(chalk.redBright('[SocKit]'), message);
}

export function LogWarning(message: string) {
    console.log(chalk.yellowBright('[SocKit]'), message);
}

export function LogSuccess(message: string) {
    console.log(chalk.greenBright('[SocKit]'), message);
}