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

const getDog = async () => {
  const data = await readFilePromise(`${__dirname}/dog.txt`);
  console.log(`Breed: ${data}`);
  const img = await superagent.get(
    `https://dog.ceo/api/breed/${data}/images/random`
  );
  console.log(img.body.message);
  const url = img.body.message;
  await writeFilePromise('dog-images.txt', url, () =>
    console.log('Link saved to file')
  );
};

getDog();
/*
readFilePromise(`${__dirname}/dog.txt`)
  .then((res) => {
    return superagent.get(`https://dog.ceo/api/breed/${res}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePromise('dog-images.txt', res.body.message);
  })
  .then(() => {
    console.log('Link saved to file');
  })
  .catch((err) => console.log(err));
*/
