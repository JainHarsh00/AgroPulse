const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const app = express();
const port = 5000

const connectDB = require('./db/mongo.js');
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));

// Serve the main React application for all other requests
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`AgroPulse listening on port ${port}`)
})