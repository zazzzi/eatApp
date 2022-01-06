export {}
import {Request, Response} from "express";
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);;

exports.stripePayment = async(req: Request, res: Response) => {
  let {amount, id} = req.body
  try{
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "SEK",
      description: "Food",
      payment_method: id,
      confirm: true
    })
    console.log("Payment", payment)
    res.json({
      message: "Payment successful",
      success: true,
      body: payment
    })
  }catch (error) {
    console.log("Error", error)
    res.json({
      message: "Payment failed",
      success: false
    })
  }
}