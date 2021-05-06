const express = require('express');
const path = require('path');
const db = require('./db.js');

const app = express();
const port = 3000;

app.use(express.json());

// ROUTES //
app.get('/', (req, res) => {
  res.send('hello world!')
})

// GET product
app.get('/products/:product_id', (req, res) => {
  // console.log('PARAMS:', req.params)
  let product;
  db.getProduct((err, currentProduct) => {
    if (err) {
      console.log('err getting product from db');
    } else {
      product = currentProduct[0]
      db.getFeatures((err, currentFeatures) => {
        if (err) {
          console.log('err getting features from db')
        } else {
          product.features = []
          currentFeatures.forEach(feature => product.features.push(feature));
         res.send(product);
        }
      }, req.params.product_id)
    }
  }, req.params.product_id);
})

// GET product info
// app.get()

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