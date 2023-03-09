const core = require('@actions/core');
const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');

async function createFile (){
  try{
    const filePath = core.getInput('path');
    const file = core.getInput('name')
    const params = core.getInput('params')
    const absolutePath = path.join(process.cwd(),filePath)
    console.log(`absolutePath: ${absolutePath}`)
    console.log(`file: ${file}`)
    console.log(`params: ${params}`)
    let obj = yaml.load(params)
    console.log(obj)
    console.log(typeof obj)
    try{
      await fs.access(absolutePath)
    }catch(error){
      await fs.mkdir(absolutePath, {recursive: true})
    }
    try{
      await fs.access(absolutePath)
    }catch(error){
      core.setFailed("couldn't create directory structure");
    }
    await fs.writeFile(path.join(absolutePath,file), params)
  }catch (error) {
    core.setFailed(error.message);
  }
}

createFile();