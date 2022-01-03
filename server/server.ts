import express from "express";
import path from "path";
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
import stripePayment from "./resources/stripe/router";

const PORT = process.env.PORT || 6969;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json());
app.use("/api", stripePayment)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});