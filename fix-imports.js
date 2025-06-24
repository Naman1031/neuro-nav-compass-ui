const fs = require('fs');
const path = require('path');
const dir = require('node-dir');

dir.files('./src-converted', (err, files) => {
  if (err) throw err;
  
  files.forEach(file => {
    if (path.extname(file) === '.jsx' || path.extname(file) === '.js') {
      let content = fs.readFileSync(file, 'utf8');
      content = content.replace(/\.tsx/g, '.jsx');
      content = content.replace(/\.ts/g, '.js');
      fs.writeFileSync(file, content);
    }
  });
  
  console.log('Import statements updated successfully!');
});
