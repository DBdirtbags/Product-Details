const express = require('express');
const path = require('path');
const pool = require('./db');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, './frontend/build')));

// ROUTES //

// GET products

// GET styles

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
})