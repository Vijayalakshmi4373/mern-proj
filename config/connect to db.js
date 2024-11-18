const mongoose = require('mongoose');

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      throw new Error(`Could not connect to MongoDB: ${err}`);
    });
};

module.exports = connectToDB;
require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const connectToDB = require('./db'); // Import the database connection function

const app = express();
const PORT = 3000;

// Connect to the database
connectToDB();

app.use(express.json()); // Middleware to parse JSON data

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
