const {exec} = require('child_process');
const readline = require('readline');
const fs = require('fs');

const min = process.argv[2];
const where = process.argv[3];


const outfile = '../out/chunk.js';

fs.unlink(outfile, function(err) {
  if (err && err.code == 'ENOENT') {
    // file doens't exist
    console.info('Looks like a first run ...');
  } else if (err) {
    // other errors, e.g. maybe we don't have enough permission
    console.error(` An error occurred while trying to remove file ${outfile}. Please remove ${outfile} manually and try again.`);
  } else {
    console.info(`output file prepared successfully, continuing...`);
  }
});

fs.unlink('../out/chunk.min.js', function(err) {
  if (err && err.code == 'ENOENT') {
    // file doens't exist
    console.info('No min files to delete ...');
  } else if (err) {
    // other errors, e.g. maybe we don't have enough permission
    console.error(` An error occurred while trying to remove file ${outfile}. Please remove ${outfile} manually and try again.`);
  } else {
    console.info(`min output file prepared successfully, continuing...`);
  }
});


function clean() {
  fs.unlink('../.churn.js', function(err) {
    if (err && err.code == 'ENOENT') {
    // file doens't exist
      console.info('Looks like a first run ...');
    } else if (err) {
    // other errors, e.g. maybe we don't have enough permission
      console.error(` An error occurred while trying to remove file ${outfile}. Please remove ${outfile} manually and try again.`);
    } else {
      console.info('logging and cleaning up ...\n');
    }
  });
}


let dat = '';
fs.readFile('../.churn.js', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  data = data.replace(/\,$/, '').trim();
  dat = data.split(',');
  dat = dat.reverse();
  let inc = 0;
  for (let el of dat) {
    el = el.trim();

    inc++;

    const readInterface = readline.createInterface({
      input: fs.createReadStream(el),
      // output: process.stdout,
      console: false,
    });


    readInterface.on('line', function(line) {
      if (!line.match('import')) {
        //      console.log('Found import directive,  '+line);
        fs.appendFileSync(outfile, line+'\n');
      }
    });

    readInterface.on('close', function() {
      // do something on finish here
      // console.log('Added lines from ' +el);
    });


    if (inc === dat.length) {
      clean();
      run(outfile);
    }
  }// end for of dat
});
function kill() {
  exec(`npx kill-port 3000 `, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`Restarting localhost...\n\n visit http://localhost:3000 now. CTRL C to stop!`);
      return;
    }
    console.log(`\nrestarting localhost... \n\n${stdout}`);
  });
}

function run(outfile) {
// if --web launch webserver and create the html/script
  let runwhere = outfile;

  if (min === '--min') {
    runwhere = 'node ../out/chunk.min.js';

    if (where === '--web') {
      runwhere = ' node index.js ../out/chunk.min.js';
      kill();
    }

    console.log('do min');
    // terser --c -m -- chunk.js >chunk.min.js

    exec(`terser --c -m --  ${outfile} >../out/chunk.min.js`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`\nminifiying... \n\n${stdout}`);
      console.log(`\n\nYour output file is in: ../out/chunk.min.js\n\n`);
    });


    if (where === '--web') {
    // run minifed version
      setTimeout( (t) => {
        exec(`${runwhere} `, (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
        });
      }, 3000);
    }
  }// end if min
  else {
    if (where === '--web') {
      runwhere = 'node index.js ../out/chunk.js';

      exec(`${runwhere}`, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message} `);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`\nrunning... \n\n${stdout}`);
      });
    }
  }
  if (min !== '--min') {
    console.log(`\n\nYour output file is in: ../out/chunk.js\n\n`);
  }
}

