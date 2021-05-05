const { Pool } = require('pg');

const pool = new Pool({
  user: 'posgres',
  host: 'localhost',
  database : 'product_details',
  password : 'namaste1',
  port: 5432,
});

module.exports = pool;