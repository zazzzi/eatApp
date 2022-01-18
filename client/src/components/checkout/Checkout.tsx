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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PaymentMethod from "./PaymentMethod"
import OrderConfirmation from "./OrderConfirmation"
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import StripeContainer from "../stripeContainer/StripeContainer";
import Cart from '../cart/Cart'
import Swish from "./Swish";
import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrdersContext";
import { Order, RestaurantTableData } from "../../types/types";


interface Iprops {
 restaurantId: RestaurantTableData;
}

function Checkout({restaurantId}:Iprops) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [order, setOrder] = useState<Order | null>(null)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const { cart, clearCart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);

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
    if(activeStep === 0){return}
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePaymentMethod = (method: string) => {
    setActiveStep(2)
    setPaymentMethod(method)
  }

  const paymentResponse = (status: string | undefined, response?: any) => {
    if(status === "Successful card payment" || status === "Successful swish payment"){
      const order = createOrder(response, cart, totalPrice, restaurantId)
      setOrder(order!)
      setActiveStep(3)
      clearCart()
    }
  }

  if(!restaurantId){
    return (<></>)
  }

  if(Object.keys(restaurantId).length === 0) {
    return (
      <>
        Please scan a QR code to make an order.
      </>
    )
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
            <OrderConfirmation
              restaurantId={restaurantId}
              order={order!}
            />
          </Box>
        )
      default:
        return "How did you end up here???";
    }
  }

  return (
    <Box 
    height="100%"
    className={classes.height}>
      <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={activeStep}
        className={classes.style}
        nextButton={
          <Button 
            className={classes.button}
            size="small" 
            onClick={handleNext} 
            disabled={
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
          <Button 
            className={classes.button}
            size="small" 
            onClick={handleBack} 
            disabled={
              order !== null
            }>
            {activeStep === 3 ? null : activeStep === 0 ? (<RestaurantMenuIcon className={classes.icon}/>) : (<KeyboardArrowLeft />)}
            {activeStep === 3 ? "" : activeStep === 0 ? 
              (<Link className={classes.link} to={`/menu/${restaurantId.restaurantId}?table=${restaurantId.table}`}>Meny</Link>) : "Tillbaka"}
          </Button>
        }
      />
      <Box>
        <Box>
            <Box>
              {getStepContent(activeStep)}
            </Box>
            <Box className={classes.align}>
            <Divider className={classes.divider}/>
            { activeStep === 3 ? 
              null
              :
              <Box className={classes.priceTotal}>
                <Typography>
                  Summa
                </Typography>
                <Typography>
                  {totalPrice} kr
                </Typography>
              
              </Box>
            }
            </Box>
        </Box>
      </Box>
    </Box> 
  );
}

const useStyles = makeStyles(() => ({
  divider: {
    margin: "auto",
    width: "90%"
  },
  icon: {
    paddingRight: "0.4rem"
  },
  button: {
    display: "flex",
    alignItems: "center",
    width: "30%"
  },
  link: {
    paddingTop: "0.2rem",
    color: "black",
    textDecoration: "none"
  },
  style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 400, 
    height: '1.5rem'
  }, 
  height: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FEFEFE",
  },
  priceTotal: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 1rem 1rem 1rem"
  },
  align: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    bottom: "2px",
    position: "relative",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export default Checkout; 