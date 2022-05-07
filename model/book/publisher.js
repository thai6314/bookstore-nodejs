const mongoose = require("mongoose");

const Publisher = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
});
module.exports = mongoose.model("Publisher", Publisher);
