const book = require("../../model/book/book");
const ItemBook = require("../../model/book/item_book");

module.exports = {
  async createItemBook(req, res, next) {
    try {
      const tmp = await req.body;

      const dataItemBook = {
        amount: tmp.amount,
        price: tmp.price,
        book: tmp.book,
      };
      if (tmp.amount < 0) {
        res.status(403).json({ message: "amount > 0" });
      } else {
        const itemBook = new ItemBook(dataItemBook);
        await itemBook.save();
        res.json({
          message: "ItemBook created successfully",
          data: dataItemBook,
        });
      }
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },

  async getItemBook(req, res, next) {
    try {
      const response = await ItemBook.find();
      res.json({
        data: response,
      });
    } catch (error) {
      res.status.json(error);
    }
  },
};
