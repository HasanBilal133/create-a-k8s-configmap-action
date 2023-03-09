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
    let obj = yaml.load(params);

    // let configMapdata = yaml.load();
    let yamlStr = yaml.dump({
      apiVersion: 'v1',
      kind: 'ConfigMap',
      metadata: {
        name: file
      },
      data: obj
    });
    console.log(yamlStr);
    console.log(typeof yamlStr);
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
    await fs.writeFile(absolutePath,file, yamlStr, 'utf8')
  }catch (error) {
    core.setFailed(error.message);
  }
}

createFile();