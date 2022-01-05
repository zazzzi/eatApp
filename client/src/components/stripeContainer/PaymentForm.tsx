import { Box, Button, makeStyles, TextField, Theme} from "@material-ui/core";
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
  cardResponse: (status: string | undefined, response?: any) => void;
}

function PaymentForm({cardResponse}: Iprops) {
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

    if(!error) {
      try {
        const {id} = paymentMethod!
        const response = await axios.post("api/payment", {
        amount: 1000,
        id: id
      })
      if(response.data.success) {
        cardResponse("Successful payment", response)
        setSucces(true)
      }
      } catch (error){
        console.log("Error", error)
      }
    } else {
      cardResponse(error.message)
    }
  } 

  return (
   <Box>
       {!success ? 
       <form onSubmit={handleSubmit}>
        <fieldset>
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
          <div>
           {/*  <CardElement options={CARD_OPTIONS}/> */}
          </div>
        </fieldset>
        <button>Pay</button>
       </form>
       :
       <div>
         <h2>Payment Succesful!</h2>
       </div>
       }
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default PaymentForm; 