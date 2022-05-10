const express = require("express");

const {
  createItemBook,
  getItemBook,
  deleteItemBook,
} = require("../../controller/item_book");
const itemBookRouter = express.Router();

itemBookRouter.post("/itembook/create", createItemBook);
itemBookRouter.get("/itembook", getItemBook);
itemBookRouter.patch("/itembook/delete", deleteItemBook);

module.exports = itemBookRouter;
