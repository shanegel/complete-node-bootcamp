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
    //Process
    fs.writeFile(file, data, (err) => {
      if (err) reject('Cannot read file.');
      resolve('Success');
    });
  });
};

const getDog = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    //console.log(`Breed: ${data}`);
    const img1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const img2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const img3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const imgs = await Promise.all([img1, img2, img3]);
    const images = imgs.map((el) => el.body.message);
    console.log(images);
    //console.log(img.body.message);
    //const urls = images;
    await writeFilePromise('dog-images.txt', images.join('\n'), () =>
      console.log('Link saved to file')
    );
  } catch (error) {
    console.log(error);
  }
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
