import { execa } from 'execa';
import pc from 'picocolors';

async function installDependencies() {
    console.log(pc.cyan('Installing dependencies...'));
    try {
        await execa('npm', ['install', 'tailwindcss', '@tailwindcss/vite'], { stdio: 'inherit' });
        console.log(pc.greenBright('✅ Dependencies installed successfully.'));
    } catch (error) {
        console.error(pc.redBright('❌ An error occurred while installing dependencies.'));
        console.error(error);
        throw error;
    }
}

export { installDependencies };