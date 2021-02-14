const {exec} = require('child_process');

const options = process.argv[2];
const where = process.argv[3];

if (options == '--help' ) {
  console.log('\nRun with: node .build App.js && node yumrun --min --web \n');
  process.exit(22);
}


let cmd = `node .build App.js && node .yumrun --min --web `;
let yourfile = 'out/chunk.js';
if (where === '--web' ) {
  if (options !== '--min') {
    cmd = `node .build App.js && node .yumrun -- --web`;
  } else {
    cmd = `node .build App.js && node .yumrun --min --web`;
    yourfile = 'out/chunk.min.js';
    console.log(`\n\nYour file is ${yourfile} - visit http://localhost:3000 now. CTRL C to stop!\n\n`);
  }
  exec(`${cmd}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`\n\n${stdout}`);
  });
}

if (where !== '--web') {
  if (options !== '--min') {
    cmd = `node .build App.js && node .yumrun`;
  } else {
    cmd = `node .build App.js && node .yumrun --min`;
  }
  exec(`${cmd}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`\n\n\n${stdout}`);
  });
}
