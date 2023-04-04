const core = require('@actions/core');
const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');

async function createFile (){
  try{
    const filePath = core.getInput('path');
    const name = core.getInput('name')
    const params = core.getInput('params')
    const absolutePath = path.join(process.cwd(),filePath.split('/')[0])
    const file = filePath.split('/')[1]
    let obj = yaml.load(params);

    let yamlStr = yaml.dump({
      apiVersion: 'v1',
      kind: 'ConfigMap',
      metadata: {
        name: name
      },
      data: obj
    });
    
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
    await fs.writeFile(path.join(absolutePath, file), yamlStr, 'utf8')
  }catch (error) {
    core.setFailed(error.message);
  }
}

createFile();