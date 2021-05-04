const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'namaste1',
  database : 'product_details'
});

connection.connect();

module.exports = db;