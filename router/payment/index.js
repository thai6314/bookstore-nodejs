const express = require("express");
const { getListBank } = require("../../controller/payment/bank");
const { createPayment, getPayment } = require("../../controller/payment");

const paymentRouter = express.Router();

paymentRouter.get("/payment/bank", getListBank);
paymentRouter.get("/payment", getPayment);
paymentRouter.post("/payment/create-url", createPayment);

module.exports = paymentRouter;
