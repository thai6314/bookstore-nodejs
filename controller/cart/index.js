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
      //   for(let b of tmp.book ){
      //     const itembook = await ItemBook.findOne({ book: b }).lean();

      //   }
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
        const itembook = await ItemBook.findOne({ book: bks }).populate("book");
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
};
