const mongoose = require("mongoose");

const Order = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  // timestamps: {
  //   createAt: "createAt",
  // },
});
module.exports = mongoose.model("Order", Order);
