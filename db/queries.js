const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'namaste1',
  database : 'product_details',
});

connection.connect((err, data) => {
  if (err) {
    console.log('err connecting to database');
  } else {
    console.log('connected to database!');
  }
});
