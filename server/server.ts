import express from "express";
import bodyParser from "body-parser";
const app = express();
require("dotenv").config();
import stripePayment from "./resources/stripe/router";
import paymentRequests from "./resources/swish/router";
import paymentRequestsId from "./resources/swish/router";
import refunds from "./resources/swish/router";
import refundsId from "./resources/swish/router";

const PORT = process.env.PORT || 6969;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json());
app.use("/api", stripePayment)
app.use("/api", paymentRequests)
app.use("/api", paymentRequestsId)
app.use("/api", refunds)
app.use("/api", refundsId)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});