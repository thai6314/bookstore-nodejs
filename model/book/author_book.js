const mongoose = require("mongoose");

const AuthorBook = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Author",
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Book",
  },
});
module.exports = mongoose.model("AuthorBook", AuthorBook);
