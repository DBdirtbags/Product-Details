const express = require('express');
const path = require('path');
const db = require('./db.js');

const app = express();
const port = 3000;

app.use(express.json());

// ROUTES //

// GET products
app.get('/products', (req, res) => {
  db.getAllProducts((err, allProducts) => {
    if (err) {
      console.log('err gettin all products from db');
    } else {
      res.send(allProducts);
    }
  });
})

// GET styles

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
})