import { Box, makeStyles, Theme} from "@material-ui/core";
import { useEffect, useState } from "react";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm"
const PUBLIC_KEY = "pk_test_51KDphzHhpsgf3oRSfVl2tb074LwELGklnsvOPRUqFnONkJGSzMvoDkd1KfRqvKcp2lzEm9oFRf2l8gcghcG5gRN100hfr7PWXH"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

interface Iprops {
 
}

function StripeContainer(props: Iprops) {
  return (
   <Elements stripe={stripeTestPromise}>
       <PaymentForm/>
   </Elements>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default StripeContainer; 