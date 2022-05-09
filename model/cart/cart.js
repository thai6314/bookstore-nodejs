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

  item_book: {
    type: Array,
    require: true,
  },
  is_order: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Cart", Cart);
