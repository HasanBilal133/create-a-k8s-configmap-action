# Create A File
action to create a file in the actions workflow
## path
```yaml
with:
    path: value
```
Path where you want to create the file relative to the cwd (default: root of your repository)
## name
```yaml
with:
    name: value
```
Name of the file without the extention
## params
```yaml
with:
    params: value
```
Content of the params (default: empty)

## Example Usage

An example of a workflow for some documentation.

````yml
name: Create A File
# This workflow is triggered on pushes to the repository.
on:
  push:
    branches:
      - master

jobs:
  createFile:
    name: Create A File
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: LabNodeELN/configmap-action@master
        with:
          path: 'src'
          name: 'foo'
          params: |
            PARAM1: VALUE1
            PARAM2: VALUE2
````
