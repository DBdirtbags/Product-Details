const { Pool } = require('pg');
const pass = require('./config.js')
const port = 5432

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database : 'sdc',
  password : pass,
  port: port,
});

pool.connect((err) => {
  if (err) {
    console.log('nope.')
  } else {
    console.log(`Connected to database on port ${port}!`)
  }
})

module.exports = pool;
