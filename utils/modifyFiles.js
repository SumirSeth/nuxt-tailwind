const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');


async function modifyNuxtConfig() {

}

async function createCSSFile() {
    console.log(chalk.cyan('Creating tailwind.css file...'));
    const cssFilePath = path.resolve(process.cwd(), 'assets/css/main.css');
    try {
        await fs.ensureDir(path.dirname(cssFilePath));
        await fs.writeFile(cssFilePath, '@import "tailwindcss";\n', 'utf-8');
        console.log(chalk.greenBright('✅ tailwind.css file created successfully.'));
    } catch (error) {
        console.error(chalk.redBright('❌ An error occurred while creating tailwind.css file.'));
        console.error(error);
        throw error;
    }
}

module.exports = { modifyNuxtConfig, createCSSFile };