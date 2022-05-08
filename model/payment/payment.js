const mongoose = require("mongoose");
const Payment = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Order",
  },
  bank_code: {
    type: String,
    trim: true,
  },
  transaction_no: {
    type: Number,
    trim: true,
  },
  // timestamps: {
  //   createAt: "createAt",
  // },
});
module.exports = mongoose.model("Payment", Payment);
