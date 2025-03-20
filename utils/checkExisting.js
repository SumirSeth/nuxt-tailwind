const fs = require('fs-extra');
const path = require('path');
const pc = require('picocolors')

async function checkExistingTailwind() {
    console.log(pc.cyan("Checking the package.json file..."));
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    try{
        const packageJsonContent = await fs.readJson(packageJsonPath);
        return (
            packageJsonContent.dependencies &&
            (packageJsonContent.dependencies.tailwindcss || packageJsonContent.dependencies['@tailwindcss/vite'])
        );
    }catch(error){
      console.log(pc.red("No package.json file detected, please run this command inside your nuxt project."))
      throw error
    }
}



module.exports = { checkExistingTailwind };