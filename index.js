#!/usr/bin/env node
console.log("Script started!");
import { installDependencies } from './utils/installDeps.js';
import { modifyNuxtConfig, createCSSFile } from './utils/modifyFiles.js';
import { checkExistingTailwind } from './utils/checkExisting.js';
import pc from 'picocolors';


async function main() {
    console.log(pc.blueBright('🚀Setting Up Tailwind CSS v4 for Nuxt...'));

    try {
        // check for existing configs.
        const hasExistingTailwind = await checkExistingTailwind();
        if (hasExistingTailwind) {
            console.log(pc.redBright('❌ Tailwind configuration already exists.'));
            process.exit(1);
        }

        // install Dependencies
        await installDependencies();

        // modify nuxt.config.ts
        await modifyNuxtConfig();

        // create CSS File
        await createCSSFile();

        console.log(pc.greenBright('✅ Tailwind CSS v4 has been set up for Nuxt.'));
        console.log(pc.greenBright('🎉 Start or restart your Nuxt Development Server to use Tailwind CSS v4.'));


    } catch (error) {
        console.error(pc.redBright('❌ An error occurred while setting up Tailwind CSS v4 for Nuxt.'));
        console.error(error);
        process.exit(1);
    }


}
main();