const mongoose = require("mongoose");

const Category = mongoose.Schema({
  type: {
    type: String,
    require: true,
    trim: true,
  },
});
module.exports = mongoose.model("Category", Category);
