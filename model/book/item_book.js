const mongoose = require("mongoose");

const ItemBook = mongoose.Schema({
  amount: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Book",
  },
});

module.exports = mongoose.model("ItemBook", ItemBook);
