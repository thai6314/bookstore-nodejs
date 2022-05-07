const mongoose = require("mongoose");

const Address = new mongoose.Schema({
  no_home: {
    type: String,
    trim: true,
  },
  street: {
    type: String,
    trim: true,
  },
  district: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Address", Address);
