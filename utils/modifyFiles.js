import pkg from 'fs-extra';
const { readFile, writeFile, ensureDir } = pkg;
import { resolve, dirname } from 'path';
import pc from 'picocolors';


async function modifyNuxtConfig() {
    const nuxtConfigPath = resolve(process.cwd(), 'nuxt.config.ts');
    try {
        let configContent = await readFile(nuxtConfigPath, 'utf-8');
        if (!configContent.includes("import tailwindcss from \"@tailwindcss/vite\";")) {
            configContent = "import tailwindcss from \"@tailwindcss/vite\";\n" + configContent;
        }
        const pluginsRegex = /plugins:\s*\[/;
        if (pluginsRegex.test(configContent)) {
            configContent = configContent.replace(pluginsRegex, 'plugins: [\n    tailwindcss(),');
        } else {
            // Handle cases where 'plugins' array doesn't exist.  Add it within 'vite'.
            const viteRegex = /vite:\s*\{/;
            if (viteRegex.test(configContent)) {
                configContent = configContent.replace(viteRegex, 'vite: {\n    plugins: [\n      tailwindcss(),\n    ],');
            } else {
              //handle cases where even vite does not exits.
              const defineNuxtConfigRegex = /export default defineNuxtConfig\(\{/;
                if(defineNuxtConfigRegex.test(configContent)){
                  configContent = configContent.replace(defineNuxtConfigRegex,
                  `export default defineNuxtConfig({
                    vite: {
                      plugins: [
                        tailwindcss(),
                        ],
                    },`);
                }
                else{
                throw new Error("Could not find defineNuxtConfig in nuxt.config.ts");
                }
            }
        }
        const cssRegex = /css:\s*\[/;
        if(cssRegex.test(configContent)){
          configContent = configContent.replace(cssRegex, 'css: [\n    \'~/assets/css/main.css\',')
        }else{
          const defineNuxtConfigRegex = /export default defineNuxtConfig\(\{/;
          if(defineNuxtConfigRegex.test(configContent)){
            configContent = configContent.replace(defineNuxtConfigRegex, `export default defineNuxtConfig({\n css: ['~/assets/css/main.css'],`)
          }else{
             throw new Error("Could not find defineNuxtConfig in nuxt.config.ts");
          }
        }
        const compatibilityDateRegex = /compatibilityDate:\s*["']\d{4}-\d{2}-\d{2}["']/;
        if(compatibilityDateRegex.test(configContent)){
          const currentDate = new Date().toISOString().split('T')[0];
          configContent = configContent.replace(compatibilityDateRegex, `compatibilityDate: "${currentDate}"`);
        }


        await writeFile(nuxtConfigPath, configContent, 'utf-8');
        console.log(pc.green("nuxt.config.ts modified successfully."));
    } catch (error) {
        console.error(pc.red("An error occurred while modifying nuxt.config.ts."));
        console.error(error);
        throw error;
    }
}

async function createCSSFile() {
    console.log(pc.cyan('Creating tailwind.css file...'));
    const cssFilePath = resolve(process.cwd(), 'assets/css/main.css');
    try {
        await ensureDir(dirname(cssFilePath));
        await writeFile(cssFilePath, '@import "tailwindcss";\n', 'utf-8');
        console.log(pc.greenBright('✅ tailwind.css file created successfully.'));
    } catch (error) {
        console.error(pc.redBright('❌ An error occurred while creating tailwind.css file.'));
        console.error(error);
        throw error;
    }
}

export { modifyNuxtConfig, createCSSFile };