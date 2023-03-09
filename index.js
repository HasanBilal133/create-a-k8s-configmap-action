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

    let configMapdata = yaml.load({
      apiVersion: 'v1',
      kind: 'ConfigMap',
      metadata: {
        name: file
      },
      data: obj
    });
    let yamlStr = yaml.dump(configMapdata);
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
    await fs.writeFile(path.join(absolutePath,file), yamlStr)
  }catch (error) {
    core.setFailed(error.message);
  }
}

createFile();