const readline = require('readline');
const fs = require('fs');
let filepath = process.argv[2];

const options = process.argv[2];

if (options == '--help' || process.argv.length <= 2) {
  console.log('\nRun with: node build App.js && node yumrun --min --web \n');
  process.exit(22);
}

// run with: node build App.js && node yumrun

filepath= '../src/'+filepath;

const readInterface = readline.createInterface({
  input: fs.createReadStream(filepath),
  // output: process.stdout,
  console: false,
});

const outfile = '../.churn.js';

fs.unlink(outfile, function(err) {
  if (err && err.code == 'ENOENT') {
    // file doens't exist
    console.info('Looks like a first run, I will prep a fresh output file for you...');
  } else if (err) {
    // other errors, e.g. maybe we don't have enough permission
    console.error(` An error occurred while trying to remove file ${outfile}. Please remove ${outfile} manually and try again.`);
  } else {
    console.info(`output file prepared successfully, continuing...`);
  }
});


function mainReader() {
  let fileImport = filepath +','; // App.js
  fs.appendFileSync(outfile, fileImport);

  readInterface.on('line', function(line) {
    if (line.match('import')) {
      console.log('Found import directive,  '+line);

      fileImport = line.split('import');
      fileImport = fileImport[1].replace(/['";]/g, '').trim();
      fileImport += ',';
      fs.appendFileSync(outfile, fileImport);
      importReader(line);
      // push line onto array of other files to fetch and create chunks of those
    }
  });

  readInterface.on('close', function() {
  // do something on finish here
    console.log('Found initial imports...proceeding');
  });
}
// kickoff with main reader
mainReader();


function importReader(importpath) {
  let filepath = importpath.split('import');

  filepath = filepath[1].trim();
  filepath = filepath.replace(/['";]/g, '');

  const readInterface = readline.createInterface({
    input: fs.createReadStream(filepath),
    // output: process.stdout,
    console: false,
  });

  readInterface.on('line', function(line) {
    if (line.match('import')) {
      console.log('Found another import directive,  '+line);
      // push line onto array of other files to fetch and create chunks of those

      fileImport = line.split('import');
      fileImport = fileImport[1].replace(/['";]/g, '').trim();
      fileImport += ',';
      fs.appendFileSync(outfile, fileImport);
      importReader(line);
    }
  });

  console.log('Importing: '+importpath);
}
