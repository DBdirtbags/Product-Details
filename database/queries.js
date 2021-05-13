const pool = require('./db.js')

const getProduct = (product_id, cb) =>  {
  let queryString = `
    SELECT product_id, name, slogan, description, category, default_price,
    jsonb_agg (jsonb_build_object('feature', features.feature, 'value', features.feature_value)) features
    FROM products
    INNER JOIN features USING (product_id)
    WHERE product_id = ${product_id}
    GROUP BY product_id;
  `;
  pool.query(queryString, (err, productsData) => {
    if (err) {
      console.log('err in getAllProducts query:', err);
    } else {
      cb(null, productsData.rows);
    }
  });
}

const getStyles = (product_id, cb) =>  {
  let queryString = `
    SELECT styles.style_id, name, product_id, original_price, sale_price, default_style,
    jsonb_agg (distinct jsonb_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) photos,
    jsonb_agg (distinct jsonb_build_object('sku_id',skus.sku_id,'size',skus.size,'quantity', skus.quantity)) skus
    FROM styles
    INNER JOIN photos ON styles.style_id = photos.style_id
    INNER JOIN skus ON styles.style_id = skus.style_id
    WHERE product_id=${product_id}
    GROUP BY styles.style_id
  `;
  pool.query(queryString, (err, stylesData) => {
    if (err) {
      console.log('err in getStyles query:', err);
    } else {
      cb(null, stylesData.rows);
    }
  });
}


const getRelated = (product_id, cb) => {
  let queryString = `SELECT * FROM related_ids where product_id=${product_id}`;
  pool.query(queryString, (err, relatedData) => {
    if (err) {
      console.log('err in getRelated query:', err);
    } else {
      cb(null, relatedData.rows);
    }
  })
}


module.exports = {
  getProduct,
  getStyles,
  getRelated
};


/*===== CODE GRAVEYARD =====*/

// const getProduct = (product_id, cb) =>  {
//   let queryString = `SELECT * FROM products WHERE product_id=${product_id}`;
//   pool.query(queryString, (err, productsData) => {
//     if (err) {
//       console.log('err in getAllProducts query:', err);
//     } else {
//       cb(null, productsData.rows);
//     }
//   });
// }

//A function which returns a promise, which resolves to a db query
// const queryPromise = function(queryString) {
//   return new Promise((resolve, reject) => {
//     pool.query(queryString, (err, data) => {
//       if (err) {
//         return reject(err);
//       } else {
//         return resolve(data.rows);
//       }
//     });
//   });
// }

//A function to generate an array of photo query promises
// const generatePhotoPromises = function(styles) {
//   var promiseArray = [];
//   for (let x = 0; x < styles.length; x++) {
//     let queryString = `SELECT * FROM photos WHERE style_id=${styles[x].style_id}`;
//     promiseArray.push(queryPromise(queryString));
//   }
//   return promiseArray;
// }

// const generateSkuPromises = function(styles) {
//   var promiseArray = [];
//   for (let x = 0; x < styles.length; x++) {
//     let queryString = `SELECT * FROM skus WHERE style_id=${styles[x].style_id}`;
//     promiseArray.push(queryPromise(queryString));
//   }
//   return promiseArray;
// }

// const getStyles = (product_id, cb) =>  {
//   let queryString = `SELECT * FROM styles WHERE product_id=${product_id}`;
//   pool.query(queryString, (err, stylesData) => {
//     if (err) {
//       console.log('err in getStyles query:', err);
//     } else {
//       cb(null, stylesData.rows);
//     }
//   });
// }

// SELECT * FROM styles
// INNER JOIN skus ON styles.style_id = skus.style_id
// INNER JOIN photos ON styles.style_id = photos.style_id
// WHERE styles.product_id = ${product_id}`;

// const getFeatures = (product_id, cb) => {
//   let queryString = `SELECT feature, feature_value FROM features WHERE product_id=${product_id}`;
//   pool.query(queryString, (err, featuresData) => {
//     if (err) {
//       console.log('err in getFeatures query:', err);
//     } else {
//       cb(null, featuresData.rows);
//     }
//   })
// }