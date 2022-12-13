const mongoose = require('mongoose');
const env = require('dotenv');

env.config({ path: './.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose.set('strictQuery', true);
mongoose
  .connect(DB)
  .then(() => console.log('DB Connection Established'))
  .catch((err) => console.log(err));

//SERVER
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
