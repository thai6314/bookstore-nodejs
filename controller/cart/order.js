const Order = require("../../model/cart/order");
const Cart = require("../../model/cart/cart");
const User = require("../../model/user/user");
const ItemBook = require("../../model/book/item_book");
const Book = require("../../model/book/book");
module.exports = {
  async createOrder(req, res, next) {
    try {
      const tmp = await req.body;

      const cart = await Cart.findOne({ user: tmp.user }).lean();
      if (!cart) {
        res.status(403).json({ message: "Cart is not found" });
      } else {
        const dataOrder = {
          user: tmp.user,
          //status: false,
        };

        const order = new Order(dataOrder);
        await order.save();
        res.json({
          message: "Create order successfully",
          user: dataOrder,
        });
      }
    } catch (error) {
      res.status(403).json(error);
    }
  },

  async getOrder(req, res, next) {
    try {
      const { user } = req.query;

      const c = await Cart.findOne({ user: user });
      const userFind = await User.findById(user).populate("address");
      let dt = [];
      for (let [idx, bks] of c.book.entries()) {
        const itembook = await ItemBook.findOne(
          { book: bks },
          "-amount"
        ).populate({
          path: "book",

          populate: [
            {
              path: "author",
            },
            {
              path: "category",
            },
            {
              path: "publisher",
            },
          ],
        });

        const value = {
          book: itembook,
          quantity: c.quantity[idx],
          total_price: c.quantity[idx] * itembook.price,
          // status: order.status
        };
        console.log(value);
        dt.push(value);
      }
      res.json({ user: userFind, cart: dt, total: c.total_price });
    } catch (error) {
      res.status(403).json(error);
    }
  },
};
