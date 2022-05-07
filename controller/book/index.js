const Book = require("../../model/book/book");
const Author = require("../../model/book/author");
const Publisher = require("../../model/book/publisher");
const Category = require("../../model/book/category");
const AuthorBook = require("../../model/book/author_book");
module.exports = {
  async createBook(req, res, next) {
    try {
      const tmp = await req.body;

      const dataAuthor = {
        name: tmp.author_name,
        biography: tmp.biography,
      };
      const author = new Author(dataAuthor);

      const dataPublisher = {
        name: tmp.publish_name,
      };
      const publisher = new Publisher(dataPublisher);

      const dataBook = {
        title: tmp.title,
        number_of_pages: tmp.number_of_pages,
        language: tmp.language,
        publication_date: tmp.publication_date,
        image: tmp.image,
        author: author._id,
        publisher: publisher._id,
        category: tmp.category_id,
        is_active: true,
      };

      const book = new Book(dataBook);
      const authorBook = new AuthorBook({
        book: book._id,
        author: author._id,
      });
      await author.save();
      await publisher.save();
      await book.save();
      await authorBook.save();
      res.json({
        message: "Book is created successfully",
        data: authorBook,
      });
    } catch (errorr) {
      res.status(403).json({ error: errorr });
    }
  },

  async getBook(req, res, next) {
    try {
      const response = await AuthorBook.find();
      console.log(response);
      let data = [];
      for (let tmp of response) {
        const rs = await Book.findById(tmp.book, "-__v")
          .populate("author", "-__v")
          .populate("publisher", "-__v")
          .populate("category", "-__v")
          .lean();
        data.push(rs);
      }
      res.json({
        data,
      });
    } catch (error) {
      res.status(404).json({ error: error });
    }
  },
  async getOneBook(req, res, next) {
    try {
      const { book_id } = req.query;
      const data = await Book.findById(book_id, "-__v")
        .populate("author", "-__v ")
        .populate("publisher", "-__v")
        .lean();
      res.json({
        data,
      });
    } catch (error) {
      res.statu(404).json(error);
    }
  },
};
