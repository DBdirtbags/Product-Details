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

// GET styles
app.get('/products/:product_id/styles', (req, res) => {
  let styles = {
    product_id: req.params.product_id,
    results: []
  };

  // get array of styles
  // get array of photos
  // for each style
  //  add a photos key and set to empty array
  //  push each photo object into photos array if style_id's match
  // push each style into results array
  db.getStyles((err, currentStyles) => {
    if (err) {
      console.log('err getting current styles from db');
    } else {
      db.getPhotos((err, currentPhotos) => {
        if (err) {
          console.log('err getting current photos from db');
        } else {
          currentStyles.forEach(style => {
            style.photos = [];
            currentPhotos.forEach(photo => {
              if (photo.style_id === style.style_id) {
                style.photos.push({ thumbnail_url: photo.thumbnail_url, url: photo.url })
                // styles.results.push(style);
              }
            })
          })
        }
      }, req.params.product_id)
      res.send(styles);
    }

  // db.getPhotos((err, currentPhotos) => {
  //   let style_id;
  //   if (err) {
  //     console.log('err getting current photos from db');
  //   } else {
  //     let photos = []
  //     currentPhotos.forEach(photo => {
  //       photos.push({ style_id: photo.style_id, thumbnail_url: photo.thumbnail_url, url: photo.url })
  //     })
  //     res.send(currentPhotos);
  //   }
  }, req.params.product_id)
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
})