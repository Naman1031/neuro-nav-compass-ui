const dir = require('node-dir');
const path = require('path');
const fs = require('fs');

dir.files('./src-converted', (err, files) => {
  if (err) throw err;
  
  files.forEach(file => {
    if (path.extname(file) === '.tsx') {
      const newPath = file.replace('.tsx', '.jsx');
      fs.renameSync(file, newPath);
    } else if (path.extname(file) === '.ts') {
      const newPath = file.replace('.ts', '.js');
      fs.renameSync(file, newPath);
    }
  });
  
  console.log('File extensions updated successfully!');
});
