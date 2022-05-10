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
          cart_id: tmp.cart,
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
      const order = await Order.findOne({ cart: req.query.cart })
        .populate("cart")
        .lean();

      const dt = [];
      for ([idx, item] of order.cart.item_book.entries()) {
        const itemBook = await ItemBook.findById(item).lean();
        const b = await Book.findById(itemBook.book, "-__v")
          .populate("author", "-__v ")
          .populate("publisher", "-__v")
          .populate("category", "-__v")
          .lean();
        const value = {
          quantity: order.cart.quantity[idx],
          price: itemBook.price * order.cart.quantity[idx],
          book: b,
        };
        console.log(value);
        dt.push(value);
      }
      const dataOrder = {
        _id: order._id,
        item_book: dt,
        total_price: order.cart.total_price,
      };
      res.status(200).json({
        message: "Get cart successfully",
        data: dataOrder,
      });
    } catch (error) {
      res.status(403).json(error);
    }
  },
};
