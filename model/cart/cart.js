const mongoose = require("mongoose");
const Cart = mongoose.Schema({
  quantity: {
    type: Array,
    require: true,
  },
  total_price: {
    type: Number,
    require: true,
  },

  book: {
    type: Array,
    require: true,
    ref: "Book",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Cart", Cart);
