const express = require("express");
const cart = require("../../controller/cart");
const requireLogin = require("../../middleware/auth");
const { createCart, getCart, deleteCart } = require("../../controller/cart");
const order = require("../../controller/cart/order");
const { createOrder, getOrder } = require("../../controller/cart/order");

const cartRouter = express.Router();

cartRouter.post("/cart/add", createCart);
cartRouter.get("/cart", getCart);
cartRouter.delete("/cart/delete", deleteCart);
cartRouter.post("/cart/create-order", createOrder);
cartRouter.get("/cart/order", getOrder);
module.exports = cartRouter;
