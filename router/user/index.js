const express = require("express");
const user = require("../../controller/user");
const requireLogin = require("../../middleware/auth");
const {
  createUser,
  createRole,
  getRole,
  getUser,
  getOneUser,
} = require("../../controller/user");
const userRouter = express.Router();

userRouter.post("/user/register", createUser);
userRouter.get("/user", getUser);
userRouter.post("/user/role/create", createRole);
userRouter.get("/user/role", getRole);
userRouter.get("/user/detail", requireLogin, getOneUser);

module.exports = userRouter;
