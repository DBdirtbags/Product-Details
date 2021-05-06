const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database : 'product_details',
  password : 'namaste1',
  port: 5432,
});

const getProduct = (cb, product_id) =>  {
  let queryString = `SELECT * FROM products WHERE product_id=${product_id}`;
  pool.query(queryString, (err, productsData) => {
    if (err) {
      console.log('err in getAllProducts query:', err);
    } else {
      cb(null, productsData.rows);
    }
  });
}

// const getProductInfo = (request, response) => {

// }


const getStyles = (cb, product_id) =>  {
  let queryString = `SELECT * FROM styles WHERE product_id=${product_id}`;
  pool.query(queryString, (err, stylesData) => {
    if (err) {
      console.log('err in getStyles query:', err);
    } else {
      cb(null, stylesData.rows);
    }
  });
}

const getFeatures = (cb, product_id) => {
  let queryString = `SELECT feature, feature_value FROM features WHERE product_id=${product_id}`;
  pool.query(queryString, (err, featuresData) => {
    if (err) {
      console.log('err in getFeatures query:', err);
    } else {
      cb(null, featuresData.rows);
    }
  })
}

const getPhotos = (cb, style_id) => {
  let photos = [];
  let queryString = `SELECT * FROM photos where style_id=${style_id}`;

  pool.query(queryString, (err, photosData) => {
    if (err) {
      console.log('err in getPhotos query:', err);
    } else {
      cb(null, photosData.rows);
    }
  })
}

module.exports = {
  getProduct,
  getStyles,
  getFeatures,
  getPhotos
};
