const express = require("express");
const { createBook, getBook, getOneBook } = require("../../controller/book/");
const {
  createCategory,
  getCategory,
} = require("../../controller/book/category");
const bookRouter = express.Router();

bookRouter.get("/book", getBook);
bookRouter.get("/book/detail", getOneBook);
bookRouter.post("/book/create", createBook);
bookRouter.post("/category/create", createCategory);
bookRouter.get("/category", getCategory);
module.exports = bookRouter;
