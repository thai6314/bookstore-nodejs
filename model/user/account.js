const mongoose = require("mongoose");

const Account = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Role",
  },
  is_active: {
    type: Boolean,
    dafault: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Account", Account);
