const mongoose = require("mongoose");

const User = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
    trim: true,
  },
  telephone: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Address",
  },
});
module.exports = mongoose.model("User", User);
