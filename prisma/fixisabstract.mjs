
import path from 'path'
import fs from 'fs'
const replaceInFile = (filePath, searchValue, replaceValue) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const result = data.replace(searchValue, replaceValue);
    console.log(result)
    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`${filePath} updated successfully.`);
    });
  });
};

const traverseDirectory = (dirPath, searchValue, replaceValue) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((file) => {
      
      const filePath = path.join(dirPath, file);
      
      fs.stat(filePath, (err, stat) => {
//        console.log(filePath)
        if (err) {
          console.error(err);
          return;
        }
        if (stat.isDirectory()) {
          traverseDirectory(filePath, searchValue, replaceValue);

          //console.log('hihi2')
        } else {
          
          
            console.log('hihi')
            replaceInFile(filePath, searchValue, replaceValue);
          
        }
      });
    });
  });
};

//const dirPath = path.join(__dirname, 'src', 'server', 'graphql');
const dirPath = '/config/workspace/vm/js/NxTime/src/server/graphql'
const searchValue = 'isAbstract: true';
const replaceValue = 'description: \'\'';

traverseDirectory(dirPath, searchValue, replaceValue);