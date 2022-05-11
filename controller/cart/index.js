const Cart = require("../../model/cart/cart");
const User = require("../../model/user/user");
const ItemBook = require("../../model/book/item_book");
const Book = require("../../model/book/book");
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
      const isUser = await Cart.findOne({ user: tmp.user });
      if (isUser) {
        if (!isUser.is_order) {
          let total = [];
          for (let [idx, item] of tmp.item_book.entries()) {
            const itemBook = await ItemBook.findById(item);
            if (itemBook.amount < tmp.quantity[idx] || tmp.quantity[idx] < 0) {
              res
                .status(200)
                .json({ message: "invalid quantity ", status: false });
            } else {
              const sum = itemBook.price * tmp.quantity[idx];
              total.push(sum);
            }
          }
          await Cart.findByIdAndUpdate(isUser._id, {
            quantity: tmp.quantity,
            item_book: tmp.item_book,
            total_price: calculateTotal(total),
          });
          res.status(200).json({
            message: "Update cart successfully",
            status: 200,
          });
        } else {
          let total = [];
          for (let [idx, item] of tmp.item_book.entries()) {
            const itemBook = await ItemBook.findById(item);
            if (itemBook.amount < tmp.quantity[idx] || tmp.quantity[idx] < 0) {
              res
                .status(200)
                .json({ message: "invalid quantity ", status: false });
            } else {
              const sum = itemBook.price * tmp.quantity[idx];
              total.push(sum);
            }
          }
          const newCart = new Cart({
            item_book: tmp.item_book,
            quantity: tmp.quantity,
            total_price: calculateTotal(total),
            user: tmp.user,
          });
          await newCart.save();
          res.status(200).json({
            message: "Create cart successfully",
            status: 200,
            data: newCart,
          });
        }
      } else {
        let total = [];
        for (let [idx, item] of tmp.item_book.entries()) {
          const itemBook = await ItemBook.findById(item);
          if (itemBook.amount < tmp.quantity[idx] || tmp.quantity[idx] < 0) {
            res
              .status(200)
              .json({ message: "invalid quantity ", status: false });
          } else {
            const sum = itemBook.price * tmp.quantity[idx];
            total.push(sum);
          }
        }
        const newCart = new Cart({
          item_book: tmp.item_book,
          quantity: tmp.quantity,
          total_price: calculateTotal(total),
          user: tmp.user,
        });
        await newCart.save();
        res.status(200).json({
          message: "Create cart successfully",
          status: 200,
          data: newCart,
        });
      }
    } catch (error) {
      res.json({ error: error });
    }
  },
  async getCart(req, res, next) {
    try {
      const { user } = req.query;
      const rs = await Cart.find({ user: user }).lean();
      let arr = rs;
      let arrCart = [];
      for ([idx, dataCart] of arr.entries()) {
        let itBook = [];
        for (let [i, dataItemBook] of arr[idx].item_book.entries()) {
          const itemBookFound = await ItemBook.findById(dataItemBook);

          const b = await Book.findById(itemBookFound.book, "-__v")
            .populate("author", "-__v ")
            .populate("publisher", "-__v")
            .populate("category", "-__v")
            .lean();

          const value = {
            _id: itemBookFound._id,
            price: itemBookFound.price,
            amount: itemBookFound.amount,
            quantity: dataCart.quantity[idx],
            book: b,
          };
          itBook.push(value);
        }
        console.log(dataCart);
        arrCart.push({
          _id: dataCart._id,
          is_order: dataCart.is_order,
          item_book: itBook,
          total: dataCart.total_price,
        });
      }

      res.json({
        carts: arrCart,
        // dt: arr,
      });

      // let sumPrice = 0;
      // let carts = [];
      // for (i of rs) {
      //   let dt = [];
      //   for (let [idx, bks] of i.item_book.entries()) {
      //     const itembook = await ItemBook.findById(bks, "-amount").populate(
      //       "book"
      //     );
      //     sumPrice += itembook.price * i.quantity[idx];
      //     const value = {
      //       book: itembook,
      //       quantity: i.quantity[idx],
      //       total_price: itembook.price * i.quantity[idx],
      //     };
      //     let itm = {
      //       item: value,
      //       total: sumPrice,
      //     };
      //     dt.push(itm);
      //   }
      //   carts = [{ cart_id: i._id, cart_is_order: i.is_order }];
      //   carts = [...carts, dt];
      // }
      // res.json({
      //   message: "Get cart successfully",
      //   carts,
      // });
    } catch (error) {
      res.status(403).json(error);
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
};
