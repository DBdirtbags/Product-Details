const express = require('express');
const app = express();
const path = require('path');

const queries = require('./db/queries.js')

const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, './frontend/build')));
