const app = require('./server/server.js');
const port = 3000

// SERVER SPIN UP
app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
})