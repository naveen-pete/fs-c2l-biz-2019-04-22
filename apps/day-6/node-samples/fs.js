const fs = require('fs');

console.log('begin');

// const files = fs.readdirSync('./');
// console.log('files:', files);

fs.readdir('./', (err, files) => {
  if (err) {
    console.log('Error:', err);
    return;
  }

  console.log('files:', files);
});


console.log('end');