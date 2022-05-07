const mongoose = require("mongoose");

const Role = new mongoose.Schema({
  name: {
    type: String,
    enum: ["admin", "manager", "customer"],
    default: "customer",
  },
});
module.exports = mongoose.model("Role", Role);
