const request = require('supertest');
const express = require('express');
const path = require('path');
const db = require('../database/queries.js');

const app = express();
const port = 3000;

app.use(express.json());

// ROUTES //
app.get('/', (req, res) => {
  res.json( {message: 'hello world!'} );
})

// GET product
// app.get('/products/:product_id', (req, res) => {
//   let product;
//   db.getProduct(req.params.product_id, (err, currentProduct) => {
//     if (err) {
//       console.log('err getting product from db');
//     } else {
//       product = currentProduct[0]
//       db.getFeatures(req.params.product_id, (err, currentFeatures) => {
//         if (err) {
//           console.log('err getting features from db')
//         } else {
//           product.features = [];
//           currentFeatures.forEach(feature => product.features.push(feature));
//          res.send(product);
//         }
//       })
//     }
//   });
// })
app.get('/products/:product_id', (req, res) => {
  db.getProduct(req.params.product_id, (err, currentProduct) => {
    if (err) {
      console.log('err');
    } else {
      res.send(currentProduct[0])
    }
  })
})

// GET related
app.get('/products/:product_id/related', (req, res) => {
  db.getRelated(req.params.product_id, (err, relatedIds) => {
    if (err) {
      console.log('err getting related ids from db');
    } else {
      let ids = [];
      relatedIds.forEach(id => ids.push(id.related_id));
      res.send(ids);
    }
  })
})

//GET styles
app.get('/products/:product_id/styles', (req, res) => {
  let styles = {
    product_id: req.params.product_id,
    results: []
  };

  db.getStyles(req.params.product_id, (err, currentStyles) => {
    if (err) {
      console.log('err getting current styles from db');
    } else {
      let photoPromises = db.generatePhotoPromises(currentStyles)
      let skuPromises = db.generateSkuPromises(currentStyles)
      styles.results.push(currentStyles);
      Promise.all(skuPromises)
      .then((skus) => {
        skus.forEach((sku, index) => {
          let skuObj = {}
          sku.forEach(currenSku => {
            skuObj[currenSku.sku_id] = currenSku;
          })
          styles.results[0][index].skus = skuObj;
        })
      })
      .then(Promise.all(photoPromises)
      .then((photos) => {
        photos.forEach((photo, index) => {
          styles.results[0][index].photos = photo;
        })
      }))
      .then(() => {
        styles.results = styles.results.flat();
        res.send(styles);
      })
      .catch(err => {
        console.log('err in styles promise')
      })
    }
  })
})

// POST to cart
app.post('/cart', (req, res) => {
  res.sendStatus(201);
})

module.exports = app;
