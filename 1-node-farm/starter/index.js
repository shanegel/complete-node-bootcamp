const http = require('http');
const url = require('url');
const fs = require('fs');
//Files_________________________________
//const fs = require('fs');

// //Syncornous, blocking code
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// const textOut = `What I learned today ${Date.now()} about acovado is: ${textIn}`;

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// //Asyncornous, Non-blocking code
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   //console.log(data);
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('File has been writtenXXX');
//       });
//     });
//   });
// });
// console.log('Read file success'); const http = require('http') const = url = require('url')

//Server_________________________________
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const path = req.url;
  switch (path) {
    case '/' || '/overview':
      res.end('Path for OVERVIEW || HOME');
      break;
    case '/products':
      res.end('Path for PRODUCTS');
      break;
    case '/api':
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(data);
      //   fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
      //     //const prodData = JSON.parse(data);
      //     //console.log(prodData);
      //     res.writeHead(200, { 'Content-type': 'application/json' });
      //     res.end(data);
      //   });
      break;

    default:
      res.writeHead(404, {
        'Content-type': 'text/html',
      });
      res.end('<h1>404: Page Not Found</h1>');
      break;
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server Up and Running');
});
