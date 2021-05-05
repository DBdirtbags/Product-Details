const express = require('express');
const path = require('path');
const db = require('./db.js');

const app = express();
const port = 3000;

app.use(express.json());

// ROUTES //

// GET product
app.get('/products/:product_id', (req, res) => {
  console.log('PARAMS:', req.params)
  db.getAllProducts((err, currentProduct) => {
    if (err) {
      console.log('err getting product from db');
    } else {
      console.log('success!')
      res.send(currentProduct);
    }
  }, req.params.product_id);
})

// GET styles
app.get('/products/:product_id/styles', (req, res) => {
  console.log('PARAMS:', req.params)
  db.getStyles((err, currentStyles) => {
    if (err) {
      console.log('err getting current styles from db');
    } else {
      res.send(currentStyles);
    }
  }, req.params.product_id);
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
})