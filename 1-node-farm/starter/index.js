const http = require('http');
const url = require('url');
const fs = require('fs');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');
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
// console.log('Read file success'); const http = require('http); const url = require('url)

//Server_________________________________
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProducts = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //console.log(query, pathname);

  switch (pathname) {
    //Overview
    case '/':
      res.writeHead(200, { 'Content-type': 'text/html' });

      const cards = dataObj
        .map((card) => replaceTemplate(tempCard, card))
        .join('');
      const results = tempOverview.replace('{%PRODUCT_CARDS%}', cards);

      res.end(results);
      break;

    //Products
    case '/products':
      res.writeHead(200, { 'Content-type': 'text/html' });
      const product = dataObj[query.id];
      const output = replaceTemplate(tempProducts, product);
      res.end(output);
      //console.log(query);
      break;

    //API
    case '/api':
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(data);
      break;

    //NOT FOUND
    default:
      res.writeHead(404, { 'Content-type': 'text/html' });
      res.end('<h1>404: Page Not Found.</h1>');
      break;
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server Up and Running');
});
