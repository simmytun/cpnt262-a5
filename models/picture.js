const mongoose = require('mongoose');

// Define our Schema

const gallerySchema = new mongoose.Schema(
  {
    id:           Number,
    title:        String,
    credit:       String,
    url:          String
  }
);

// Compile and export our model using the above Schema.
 
module.exports = mongoose.model('Picture', gallerySchema);

