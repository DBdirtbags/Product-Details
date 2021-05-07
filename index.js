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
  db.getProduct(req.params.product_id, (err, currentProduct) => {
    if (err) {
      console.log('err getting product from db');
    } else {
      product = currentProduct[0]
      db.getFeatures(req.params.product_id, (err, currentFeatures) => {
        if (err) {
          console.log('err getting features from db')
        } else {
          product.features = []
          currentFeatures.forEach(feature => product.features.push(feature));
         res.send(product);
        }
      })
    }
  });
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
      styles.results.push(currentStyles);
      // console.log(styles.results);
      let photoPromises = db.generatePhotoPromises(currentStyles);
      Promise.all(photoPromises)
      .then((results) => {
        results.forEach((result, index) => {
          //May need to add logic to ensure style_id of style and photos match
          styles.results[0][index].photos = result;
        })
      })
      .then(() => {
        styles.results = styles.results.flat();
        res.send(styles);
      })
    }
  })
})

// GET styles
// app.get('/products/:product_id/styles', (req, res) => {
//   let styles = {
//     product_id: req.params.product_id,
//     results: []
//   };
//   db.getStyles(req.params.product_id, (err, currentStyles) => {
//     if (err) {
//       console.log('err getting current styles from db');
//     } else {
//       currentStyles.forEach(style => {
//         db.getPhotos(style.style_id, (err, currentPhotos) => {
//           if (err) {
//             console.log('err getting current photos from db');
//           } else {
//             style.photos = currentPhotos.filter(photo => photo.style_id === style.style_id);
//             console.log(style);
//             styles.results.push(style);
//           }
//         })
//       })
//       setTimeout(() => res.send(styles), 10000)
//     }
//   })

  // db.getPhotos(style.style_id, (err, currentPhotos) => {
  //   let photos = [];
  //   if (err) {
  //     console.log('err getting current photos from db');
  //   } else {
      // res.send(currentPhotos);
      // currentPhotos.forEach(photo => photos.push(photo));
      // db.getStyles(styles.product_id, (err, currentStyles) => {
      //   if (err) {
      //     res.send('err getting current styles from db');
      //   } else {
      //     currentStyles.forEach(style => {
      //       style.photos = photos;
      //       results.push(style);
      //       styles.results = results;
      //     })
      //     res.send(styles);
      //   }
      // })
    // }

  // get array of styles
  // get array of photos
  // for each style
  //  add a photos key and set to empty array
  //  push each photo object into photos array if style_id's match
  // push each style into results array
  // db.getStyles((err, currentStyles) => {
  //   if (err) {
  //     console.log('err getting current styles from db');
  //   } else {
  //     db.getPhotos((err, currentPhotos) => {
  //       if (err) {
  //         console.log('err getting current photos from db');
  //       } else {
  //         currentStyles.forEach(style => {
  //           style.photos = [];
  //         });
  //         currentPhotos.forEach(photo => {
  //           let p = style.photos;
  //           style.photos[pstyle_id].photos.push({ thumbnail_url: photo.thumbnail_url, url: photo.url })
  //           styles.results.push(currentStyles);
  //           res.send(styles);
  //         })
  //       }
  //     }, req.params.product_id)
  //   }

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
  // }, req.params.product_id)
// })

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
})