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

      let total = [];
      for (let i = 0; i < tmp.quantity.length; i++) {
        const itembook = await ItemBook.findOne({ book: tmp.book[i] }).lean();
        const sum = itembook.price * tmp.quantity[i];
        total.push(sum);
      }

      const user = tmp.user;
      const rs = await Cart.findOne({ user: user }).lean();
      if (!rs) {
        const dataCart = {
          quantity: [...tmp.quantity],
          total_price: calculateTotal(total),
          book: [...tmp.book],
          user: tmp.user,
        };

        const cart = new Cart(dataCart);
        await cart.save();
        res.json({
          message: "Add to cart successfully",
        });
      } else {
        for (let i = 0; i < rs.book.length; i++) {
          for (let j = 0; j < tmp.book.length; j++) {
            if (rs.book[i] === tmp.book[j]) {
              rs.quantity[i] = rs.quantity[i] + tmp.quantity[j];
              tmp.book.removeAt(j);
              console.log(rs);
            } else {
              rs.book.push(tmp.book[j]);
              rs.quantity.push(tmp.quantity[j]);
            }
          }
        }
        let totalUpdate = [];

        for (let i = 0; i < rs.book.length; i++) {
          const itembook = await ItemBook.findOne({ book: rs.book[i] }).lean();
          const sum = itembook.price * rs.quantity[i];
          console.log(sum);
          totalUpdate.push(sum);
        }
        const cartUpdate = await Cart.findByIdAndUpdate(rs._id, {
          quantity: rs.quantity,
          total_price: calculateTotal(totalUpdate),
          book: rs.book,
        });
        res.json({
          message: "Update cart successfully",
          data: cartUpdate,
        });
      }
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
