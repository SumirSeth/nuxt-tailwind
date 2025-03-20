import { execa } from 'execa';
import { existsSync } from 'fs';
import pc from 'picocolors';
import { resolve } from 'path';

async function detectPackageManager() {
    const cwd = process.cwd();
    if (existsSync(resolve(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
    if (existsSync(resolve(cwd, 'yarn.lock'))) return 'yarn';
    return 'npm';
}

async function installDependencies() {
    const packageManager = await detectPackageManager();
    console.log(pc.cyan('Installing dependencies...'));
    try {
        await execa(packageManager, ['install', 'tailwindcss', '@tailwindcss/vite'], { stdio: 'inherit' });
        console.log(pc.greenBright('✅ Dependencies installed successfully.'));
    } catch (error) {
        console.error(pc.redBright('❌ An error occurred while installing dependencies.'));
        console.error(error);
        throw error;
    }
}

export { installDependencies };