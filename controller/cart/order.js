const Order = require("../../model/cart/order");
const Cart = require("../../model/cart/cart");
const User = require("../../model/user/user");
const ItemBook = require("../../model/book/item_book");
const Book = require("../../model/book/book");
module.exports = {
  async createOrder(req, res, next) {
    try {
      const tmp = req.body;

      const isCart = await Order.findOne({ cart: tmp.cart });
      if (isCart) {
        res.status(403).json({ message: "Order has already exits" });
      } else {
        const order = new Order({
          cart: tmp.cart,
        });
        await order.save();
        await Cart.findByIdAndUpdate(tmp.cart, {
          is_order: true,
        });
        res.json({
          message: "Create order successfully",
          data: order,
        });
      }
    } catch (error) {
      res.status(403).json(error);
    }
  },

  async getOrder(req, res, next) {
    try {
      const isCart = await Order.findOne({ cart: req.query.cart }).populate(
        "cart"
      );

      res.status(200).json({
        message: "Get cart successfully",
        data: isCart,
      });
    } catch (error) {
      res.status(403).json(error);
    }
  },
};
