#!/usr/bin/env node
const { installDependencies } = require('./utils/installDeps');
const { modifyNuxtConfig, createCSSFile } = require('./utils/modifyFiles');
const { checkExistingTailwind } = require('./utils/checkExisting')
import chalk from 'chalk';


console.log(chalk.blueBright('🚀 Setting up Tailwind CSS v4 for Nuxt...'));

async function main() {
    console.log(chalk.blueBright('🚀Setting Up Tailwind CSS v4 for Nuxt...'));

    try {
        // check for existing configs.
        if (checkExistingTailwind()) {
            console.log(chalk.redBright('❌ Tailwind configuration already exists.'));
            process.exit(1);
        }

        // install Dependencies
        await installDependencies();

        // modify nuxt.config.ts
        await modifyNuxtConfig();

        // create CSS File
        await createCSSFile();

        console.log(chalk.greenBright('✅ Tailwind CSS v4 has been set up for Nuxt.'));
        console.log(chalk.greenBright('🎉 Start or restart your Nuxt Development Server to use Tailwind CSS v4.'));


    } catch (error) {
        console.error(chalk.redBright('❌ An error occurred while setting up Tailwind CSS v4 for Nuxt.'));
        console.error(error);
        process.exit(1);
    }


}

main();