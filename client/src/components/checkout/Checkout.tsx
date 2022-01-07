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
import { Order } from "../../types/types";


interface Iprops {
 
}

function Checkout() {
  const theme = useTheme();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [order, setOrder] = useState<Order | null>(null)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const { cart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);

  console.log(activeStep)

  useEffect(()=>{
    if(activeStep === 1){
      setPaymentMethod(null)
    }
  },[activeStep])

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
    if(status === "Successful card payment" || status === "Successful swish payment"){
      const order = createOrder(response, cart, totalPrice)
      setOrder(order!)
      setActiveStep(3)
    }
  }

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
            <Swish 
              paymentResponse={paymentResponse}
              priceTotal={totalPrice}
            /> 
            : 
            <StripeContainer 
              paymentResponse={paymentResponse}
              priceTotal={totalPrice}
            />
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
            activeStep ===  0 && !cart.length ||
            activeStep === 1 && paymentMethod === null ||
            activeStep === 3 || 
            order === null && activeStep === 2 
          }>
            {activeStep === 0 ? "Betalsätt" : activeStep === 1 || activeStep === 2 ? "Betala" : ""}
            {activeStep === 3 ? null : (<KeyboardArrowRight />)}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={
            activeStep === 0 ||
            order !== null
            }>
            {activeStep === 3 || activeStep === 0 ? null : (<KeyboardArrowLeft />)}
            {activeStep === 3 || activeStep === 0 ? "" : "Tillbaka"}
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