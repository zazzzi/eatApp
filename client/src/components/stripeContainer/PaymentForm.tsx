import { Box, Divider, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement, 
 /*  useElements, 
  useStripe */
} from "@stripe/react-stripe-js"
/* import axios from "axios" */
import StripeInput from "./StripeInput"
import CreditCardIcon from '@material-ui/icons/CreditCard';
import mastercard from "../../assets/img/mastercard.png"
import visa from "../../assets/img/visa.png"
import maestro from "../../assets/img/maestro.png"
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";

interface Iprops {
  paymentResponse: (status: string | undefined, response?: any) => void;
  priceTotal: number;
}

function PaymentForm({paymentResponse, priceTotal}: Iprops) {
  const classes = useStyles();
  /* const stripe = useStripe()
  const elements = useElements() */
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const cardPayment = {  
      message: "Payment successful",
      success: true,
      body: {
        priceTotal,
        currency: "SEK",
        description: "Food",
        confirm: true},
      paymentType: "card"
    }

    setLoading(true)
    paymentResponse("Successful card payment", cardPayment)
    /* const {error, paymentMethod} = await stripe!.createPaymentMethod({
      type: "card",
      card: elements!.getElement(CardNumberElement)!
    })
    if(!error) {
      try {
        const {id} = paymentMethod!
        const response = await axios.post("api/payment", {
        amount: priceTotal * 1000,
        id: id
      })
      if(response.data.success) {
        paymentResponse("Successful card payment", response.data)
      }
      } catch (error){
        console.log("Error", error)
      }
    } else {
      paymentResponse(error.message)
    } */
  } 

  return (
   <Box>
       <form onSubmit={handleSubmit}>
       <Box className={classes.cardImagesContainer}>
            <Box className={classes.cardText}>
              <CreditCardIcon/>
              <Typography className={classes.text}>Betala med Kort</Typography>
            </Box >
            <Box className={classes.imgs}> 
              <img src={visa} className={classes.cardImg}/>
              <img src={mastercard} className={classes.cardImg}/>
              <img src={maestro} className={classes.cardImg}/>
            </Box>
        </Box>
        <Divider className={classes.divider}/>
        <Box className={classes.textfieldContainer}>
          <TextField
                className={classes.textfield}
                label="Kort Nummer"
                name="ccnumber"
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{ 
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardNumberElement
              }, 
                }}
            />
            <Box className={classes.monthCvc}> 
              <TextField
                    className={classes.textfield}
                    label="Utgångsdatum"
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
                    className={classes.textfield}
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
        </Box>
        <Box className={classes.payButton}>
          <LoadingButton
            className={classes.submitButton}
            type="submit"
            variant="contained"
            color="primary"
            loading={loading}
          >Betala
          </LoadingButton>
        </Box>
       </form>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    margin: "auto",
    width: "95%"
  },
  cardImg: {
    width: "30px",
    padding: "0 5px"
  },
  cardImagesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: '0.5rem 0.5rem 0.5rem 0.5rem'
  },
  cardText: {
    display: "flex",
    flexDirection: "row",
  }, 
  imgs: {
    display: "flex",
    alignItems: 'center'
  }, 
  text: {
    paddingLeft: "0.5rem"
  },
  monthCvc: {
    display: "flex",
    flexDirection: "row",
  },
  textfield: {
    margin: "0.5rem 0.5rem 0.5rem 0.5rem"
  },
  textfieldContainer: {
    marginTop: "0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  submitButton: {
    margin: '0.5rem 0.5rem 1rem 1rem'
  },
  payButton: {
    marginRight: '0.5rem',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));


export default PaymentForm; 