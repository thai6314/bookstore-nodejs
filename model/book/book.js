const mongoose = require("mongoose");

const Book = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  number_of_pages: {
    type: Number,
    trim: true,
  },
  language: {
    type: String,
    trim: true,
  },
  publication_date: {
    type: Date,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    default: "",
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Author",
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Publisher",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Category",
  },
});
module.exports = mongoose.model("Book", Book);
