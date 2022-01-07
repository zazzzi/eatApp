import { Box, Button, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement, 
  useElements, 
  useStripe
} from "@stripe/react-stripe-js"
import { useEffect, useState } from "react";
import axios from "axios"
import StripeInput from "./StripeInput"

interface Iprops {
  paymentResponse: (status: string | undefined, response?: any) => void;
  priceTotal: number;
}

function PaymentForm({paymentResponse, priceTotal}: Iprops) {
  const [success, setSucces] = useState<boolean>(false)
  const stripe = useStripe()
  const elements = useElements()

    const cardsLogo = [
        "amex",
        "cirrus",
        "diners",
        "dankort",
        "discover",
        "jcb",
        "maestro",
        "mastercard",
        "visa",
        "visaelectron",
    ];

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const {error, paymentMethod} = await stripe!.createPaymentMethod({
      type: "card",
      card: elements!.getElement(CardNumberElement)!
    })
    //send in cart payment amount 
    if(!error) {
      try {
        const {id} = paymentMethod!
        const response = await axios.post("api/payment", {
        amount: priceTotal,
        id: id
      })
      if(response.data.success) {
        paymentResponse("Successful card payment", response.data)
        setSucces(true)
      }
      } catch (error){
        console.log("Error", error)
      }
    } else {
      paymentResponse(error.message)
    }
  } 

  return (
   <Box>
       {!success ? 
       <form onSubmit={handleSubmit}>
        <Box>
          <TextField
                label="Credit Card Number"
                name="ccnumber"
                variant="outlined"
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{ 
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardNumberElement
              }, 
                }}
            />
            <TextField
                  label="Expiration Date"
                  name="ccexp"
                  variant="outlined"
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                      inputComponent: StripeInput,
                      inputProps: {
                          component: CardExpiryElement
                      },
                  }}
              />
              <TextField
                  label="CVC"
                  name="cvc"
                  variant="outlined"
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                      inputComponent: StripeInput,
                      inputProps: {
                          component: CardCvcElement
                      },
                  }}
              />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >Pay
        </Button>
       </form>
       :
       <Box>
         <Typography>Payment Succesful!</Typography>
       </Box>
       }
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default PaymentForm; 