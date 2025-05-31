import { execAsync } from "./exec";
import { LogError } from "./logger";
import { LogInfo } from "./logger";

export default async function checkDeps(packageName: string) {
    LogInfo(`Checking dep ${packageName}...`);
    const hasPackage = await execAsync(`npm list ${packageName}`);
    if (!hasPackage) {
        LogInfo(`Installing dep ${packageName}...`);
        const installPackage = await execAsync(`npm install ${packageName}`);
        if (!installPackage) {
            LogError(`Failed to install dep ${packageName}`);
            return;
        }
        LogInfo(`Successfully installed dep ${packageName}`);
    } else {
        LogInfo(`Dep ${packageName} is already installed`);
    }
}   