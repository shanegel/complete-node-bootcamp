const app = require('./app');
//SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
