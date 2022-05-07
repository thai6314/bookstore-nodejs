const mongoose = require("mongoose");

const Author = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  biography: {
    type: String,
    require: true,
    trim: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Book",
  },
});
module.exports = mongoose.model("Author", Author);
