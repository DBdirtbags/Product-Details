const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database : 'product_details',
  password : 'namaste1',
  port: 5432,
});

pool.connect(() => {
  console.log('Connected to PG database')
})

module.exports = pool;
