import React, { useContext } from "react";
import { 
  Box, 
  makeStyles, 
  Theme, 
  Button, 
  Typography,
  MobileStepper,
  useTheme,
  Divider,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import PaymentMethod from "./PaymentMethod"
import OrderConfirmation from "./OrderConfirmation"
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import StripeContainer from "../stripeContainer/StripeContainer";
import Cart from '../cart/Cart'
import Swish from "./Swish";
import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrdersContext";


interface Iprops {
 
}

function Checkout() {
  const theme = useTheme();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const { cart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);

  useEffect(()=>{
    setTotalPrice(cart.reduce((total, item) => (item.price * item.quantity) + total, 0))
  },[cart])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePaymentMethod = (method: string) => {
    setActiveStep(2)
    setPaymentMethod(method)
  }

  const paymentResponse = (status: string | undefined, response?: any) => {
    console.log(status)
    if(status === "Successful card payment" || status === "Successful swish payment"){
      createOrder(response, cart, totalPrice)
      setActiveStep(3)
    }
  }

  //go to the next page when card payment is completed and order response is sent from the orders context

  const getStepContent = (stepIndex: number) => {
    switch(stepIndex){
      case 0:
        return(
          <Box>
            <Cart/>
          </Box>
        );
      case 1:
        return(
          <Box>
            <PaymentMethod paymentMethod={handlePaymentMethod}/>
          </Box>
        );
      case 2: 
        return(
        <Box>
          {
            paymentMethod === "swish" ? 
            <Swish paymentResponse={paymentResponse}/> 
            : 
            <StripeContainer paymentResponse={paymentResponse}/>
          }
        </Box>
      )
      case 3: 
        return (
          <Box>
            <OrderConfirmation/>
          </Box>
        )
      default:
        return "Unknown stepIndex";
    }
  }
  

  return (
    <Box>
      <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={activeStep}
        className={classes.style}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={
            activeStep === 3 || 
            activeStep === 1 && 
            paymentMethod === null
          }>
            {activeStep === 0 ? "Payment" : activeStep === 1 ? "Confirm" : "Finished"}
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <Box>
        <Box>
            <Box>
              {getStepContent(activeStep)}
            </Box>
            <Divider />
            <Box className={classes.align}>
              <Box className={classes.priceTotal}>
                <Typography>
                  Summa
                </Typography>
                <Typography>
                  {totalPrice} kr
                </Typography>
              </Box>
              {/* { activeStep === 2 ? 
              <Box className={classes.buttonContainer}>
                <Button variant="outlined" className={classes.button}>Cancel</Button>
                <Button variant="outlined" className={classes.button}>Checkout</Button>
              </Box>
              : null
              } */}
            </Box>
        </Box>
      </Box>
    </Box> 
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  style: {
    maxWidth: 400, 
    flexGrow: 1
  }, 
  height: {
    height: "80vh"
  },
  priceTotal: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 1rem 1rem 1rem"
  },
  align: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    width: "30%"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  }
}));

export default Checkout; 