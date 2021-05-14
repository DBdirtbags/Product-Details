const { Pool } = require('pg');
const pass = require('./config.js')
const port = 5432
const ip = '13.59.11.196'

const pool = new Pool({
  user: 'postgres',
  host: ip,
  database : 'sdc',
  password : pass,
  port: port,
});

pool.connect((err) => {
  if (err) {
    console.log('nope:', err)
  } else {
    console.log(`Connected to database on port ${port}!`)
  }
})

module.exports = pool;
