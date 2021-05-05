const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database : 'product_details',
  password : 'namaste1',
  port: 5432,
});

const getAllProducts = cb =>  {
  let queryString = 'SELECT * FROM products WHERE product_id<=10';
  pool.query(queryString, (err, productsData) => {
    if (err) {
      console.log('err in getAllProducts query:', err);
    } else {
      cb(null, productsData.rows);
    }
  });
}

module.exports = {
  getAllProducts
};
