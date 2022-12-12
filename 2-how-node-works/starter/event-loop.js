const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //   fs.readFile('test-file.txt', 'utf-8', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //   const readable = fs.createReadStream('testx-file.txt');
  //   readable.on('data', (peaces) => {
  //     res.write(peaces);
  //   });
  //   readable.on('end', () => {
  //     res.end();
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File Not Found.');
  //   });
  //Pipe: Best appproach for streams
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server Up and Running.');
});
