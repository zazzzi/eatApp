import { Box, makeStyles, Theme} from "@material-ui/core";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import { useEffect, useState } from "react";
import axios from "axios"

const CARD_OPTIONS: any = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

interface Iprops {
 
}

function PaymentForm(props: Iprops) {
  const [success, setSucces] = useState<boolean>(false)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const {error, paymentMethod} = await stripe!.createPaymentMethod({
      type: "card",
      card: elements!.getElement(CardElement)!
    })

    if(!error) {
      try {
        const {id} = paymentMethod!
        const response = await axios.post("api/payment", {
        amount: 1000,
        id: id
      })
  
      if(response.data.success) {
        console.log("Successful payment")
        setSucces(true)
      }
      } catch (error){
        console.log("Error", error)
      }
    } else {
      console.log(error.message)
    }
  } 

  

  return (
   <Box>
       {!success ? 
       <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <CardElement options={CARD_OPTIONS}/>
          </div>
        </fieldset>
        <button>Pay</button>
       </form>
       :
       <div>
         <h2>You just bought something cool</h2>
       </div>
       }
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default PaymentForm; 