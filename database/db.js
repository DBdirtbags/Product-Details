const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database : 'sdc',
  password : 'namaste1',
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.log('nope.')
  } else {
    console.log('Connected to PG database')
  }
})

module.exports = pool;
