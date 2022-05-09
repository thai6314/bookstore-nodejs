const mongoose = require("mongoose");

const Order = mongoose.Schema(
  {
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Cart",
    },
    is_payment: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createAt: "createAt",
    },
  }
);
module.exports = mongoose.model("Order", Order);
