const express = require("express");

const { createItemBook, getItemBook } = require("../../controller/item_book");
const itemBookRouter = express.Router();

itemBookRouter.post("/itembook/create", createItemBook);
itemBookRouter.get("/itembook", getItemBook);

module.exports = itemBookRouter;
