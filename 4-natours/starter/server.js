const mongoose = require('mongoose');

const env = require('dotenv');

env.config({ path: './.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

const app = require('./app');

mongoose.set('strictQuery', true);
mongoose
  .connect(DB)
  .then(() => console.log('DB Connection Established'))
  .catch((err) => console.log(err));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  //...of tour property
});

const Tour = mongoose.model('Tour', tourSchema);
const testTour = new Tour({
  name: 'Final Destination',
  rating: 5,
  price: 2,
});
testTour.save().then((doc) => console.log(doc));

//SERVER
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
