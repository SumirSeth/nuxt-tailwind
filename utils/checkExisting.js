import pkg from 'fs-extra';
const { readJson } = pkg;
import { resolve } from 'path';
import pc from 'picocolors';

async function checkExistingTailwind() {
    console.log(pc.cyan("Checking the package.json file..."));
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    try{

        const packageJsonContent = await readJson(packageJsonPath);
        
        return (
            packageJsonContent.dependencies &&
            (packageJsonContent.dependencies.tailwindcss || packageJsonContent.dependencies['@tailwindcss/vite'])
        );
    }catch(error){
      console.log(pc.red("No package.json file detected, please run this command inside your nuxt project."))
      console.error(error);
      throw error
    }
}



export { checkExistingTailwind };