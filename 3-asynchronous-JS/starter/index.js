const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
  //Takes excuter fn{}
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('File Not Found');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  //Executer
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Cannot read file.');
      resolve('Success');
    });
  });
};

readFilePromise(`${__dirname}/dog.txt`)
  .then((res) => {
    return superagent.get(`https://dog.ceo/api/breed/${res}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePromise('dog-images.txt', res.body.message);
  })
  .catch((err) => console.log(err));
