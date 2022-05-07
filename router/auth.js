const express = require("express");
const { login } = require("../controller/auth");
const authRoute = express.Router();

authRoute.post("/auth/login", login);

module.exports = authRoute;
