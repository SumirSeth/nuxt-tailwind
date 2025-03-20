const execa = require('execa');
const chalk = require('chalk');

async function installDependencies() {
    console.log(chalk.cyan('Installing dependencies...'));
    try {
        await execa('npm', ['install', 'tailwindcss', '@tailwindcss/vite'], { stdio: 'inherit' });
        console.log(chalk.greenBright('✅ Dependencies installed successfully.'));
    } catch (error) {
        console.error(chalk.redBright('❌ An error occurred while installing dependencies.'));
        console.error(error);
        throw error;
    }
}

module.exports = { installDependencies };