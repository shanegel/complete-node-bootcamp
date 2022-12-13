const mongoose = require('mongoose');

const env = require('dotenv');

env.config({ path: './.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

const app = require('./app');

mongoose.set('strictQuery', true);
mongoose.connect(DB).then(() => console.log('DB Connection Established'));
//SERVER
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
