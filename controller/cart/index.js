const Cart = require("../../model/cart/cart");
const ItemBook = require("../../model/book/item_book");
function calculateTotal(array) {
  const sum = array.reduce((acc, currentValue) => {
    return acc + currentValue;
  }, 0);
  return sum;
}
module.exports = {
  async createCart(req, res, next) {
    try {
      const tmp = req.body;

      const isUser = await Cart.findOne({ user: tmp.user }).lean();
      if (isUser) {
        const rs = await Cart.findByIdAndUpdate(isUser._id, {
          quantity: tmp.quantity,
          book: tmp.book,
        });
        for (let [idx, check] of tmp.book.entries()) {
          const isQuantity = await ItemBook.findOne({ book: check }).lean();
          if (tmp.quantity[idx] > isQuantity.amount || tmp.quantity[idx] < 0) {
            res.json({
              message: "Quantity book is invaild",
            });
          }
        }
        res.json({
          message: "Update card successfully",
          data: rs,
        });
      } else {
        let total = [];
        for (let i = 0; i < tmp.quantity.length; i++) {
          const itembook = await ItemBook.findOne({ book: tmp.book[i] }).lean();
          const sum = itembook.price * tmp.quantity[i];
          total.push(sum);
        }
        const dataCart = {
          quantity: [...tmp.quantity],
          total_price: calculateTotal(total),
          book: [...tmp.book],
          user: tmp.user,
        };

        const cart = new Cart(dataCart);
        console.log(cart);
        await cart.save();
        res.json({
          message: "Add to cart successfully",
        });
      }
      return;
    } catch (error) {
      res.status(403).json({ error: error });
    }
  },
  async getCart(req, res, next) {
    try {
      const { user } = req.query;
      const rs = await Cart.findOne({ user: user }, "-__v").lean();

      let dt = [];
      for (let [idx, bks] of rs.book.entries()) {
        const itembook = await ItemBook.findOne(
          { book: bks },
          "-amount"
        ).populate("book");
        const value = {
          book: itembook,
          quantity: rs.quantity[idx],
          total_price: itembook.price * rs.quantity[idx],
        };
        dt.push(value);
      }
      res.json({
        message: "Get cart successfully",
        data: dt,
      });
    } catch (error) {
      res.status.json(error);
    }
  },

  async deleteCart(req, res, next) {
    try {
      const { user } = req.query;
      const rs = await Cart.findOne({ user: user }).lean();
      await Cart.findByIdAndRemove(rs._id);
      res.json({
        message: "Delete successful",
      });
    } catch (error) {
      res.status(403).json(error);
    }
  },

  // async updateCart(req, res, next) {
  //   try {
  //     const { user } = req.query;
  //   } catch (error) {
  //     res.status(403).json({ error });
  //   }
  // },
};
