const express = require("express");
const authRoute = require("./auth");
const userRouter = require("./user");
const bookRouter = require("./book");
const itemBookRouter = require("./item_book");
const cartRouter = require("./cart");
const paymentRouter = require("./payment");
const router = express.Router();

router.use(authRoute);
router.use(userRouter);
router.use(bookRouter);
router.use(itemBookRouter);
router.use(cartRouter);
router.use(paymentRouter);

module.exports = router;
