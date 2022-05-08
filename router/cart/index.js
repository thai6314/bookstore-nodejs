const express = require("express");
const cart = require("../../controller/cart");
const requireLogin = require("../../middleware/auth");
const { createCart, getCart, deleteCart } = require("../../controller/cart");

const cartRouter = express.Router();

cartRouter.post("/cart/add", createCart);
cartRouter.get("/cart", getCart);
cartRouter.delete("/cart/delete", deleteCart);
module.exports = cartRouter;
