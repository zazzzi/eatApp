export { };
import express from "express";
const accountRouter = express.Router();
const cors = require('cors');
const controller = require("./controller");

accountRouter
  .post('/paymentrequests/', cors(), controller.paymentRequests)
  .get('/paymentrequests/:requestId', cors(), controller.paymentRequestsId)
  .post('/refunds', cors(), controller.refunds)
  .get('/refunds/:refundId', cors(), controller.refundsId)
  
export default accountRouter;