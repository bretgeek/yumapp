const port = 3000;
// const open = require('opn');
const {exec} = require('child_process');
const fs = require('fs');

version = process.argv[2];
console.log('check port');

http = require('http'),
httpStatus = require('http-status-codes'),
app = http.createServer((request, response) => {
  console.log('Received an incoming request!');
  response.writeHead(httpStatus.OK, {
    'Content-Type': 'text/html',
  });


  let script = '';
  fs.readFile(version, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    script = data;


    const responseMessage = `<!doctype html>
          <html lang="en-us" >
          <head><meta charset="UTF-8"> </head>
          <body> 
          <style>
          #root {
          background-color: #CCCCCC;
          padding: 20px;
          position: absolute;
          left: 35%;
          top: 25%;
          border-radius: 10px;
          border: 1px solid #333333;
          }
          #heading {
          position: absolute;
          left: 35%;
          top: 1px;
          }
          #version {
          position: absolute;
          left: 25%;
          bottom: 20px;
          }


          </style>
          <div id='heading'><img src='https://raw.githubusercontent.com/bretgeek/yumjs/main/images/yumlogo.png' alt='logo' /><p><strong>boilerplate App</strong></p></div>
          <div id='root'></div>
          <script src='https://cdn.jsdelivr.net/gh/bretgeek/yumjs@main/yum.min.js?s=1'></script>
          <script>${script}</script>
          <div id='version'> Grab <strong> https://cdn.jsdelivr.net/gh/bretgeek/yumjs@main/yum.min.js</strong>  and <strong>${version}</strong> for use in your own page.</div>
          </body></html>  `;
    response.write(responseMessage);
    response.end();
    console.log(`Sent a response : ${responseMessage}`);
  });
});

app.listen(port);
console.log(`The server has started and is listening on port number:
 ${port}`);

const url = `http://localhost:${port}`;
const start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
exec(start + ' ' + url, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`\n\nStarting....Your output file is in: ../out/chunk.min.js\n\n`);
});


