export { };
import express from "express";
const accountRouter = express.Router();
const cors = require('cors');
const controller = require("./controller");

accountRouter
  .post("/payment", cors(), controller.stripePayment)

export default accountRouter;