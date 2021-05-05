const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database : 'product_details',
  password : 'namaste1',
  port: 5432,
});

const getAllProducts = (cb, product_id) =>  {
  let queryString = `SELECT * FROM products WHERE product_id=${product_id}`;
  pool.query(queryString, (err, productsData) => {
    if (err) {
      console.log('err in getAllProducts query:', err);
    } else {
      cb(null, productsData.rows);
    }
  });
}

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

module.exports = {
  getAllProducts,
  getStyles
};
