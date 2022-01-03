import React from "react";
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
import CardPayment from "./CardPayment"
import SwishPayment from "./Swish"
import OrderConfirmation from "./OrderConfirmation"
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Link } from "react-router-dom";
import food from "../../food"


interface Iprops {
 
}

function Checkout() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = useStyles();

  const total = () => {
    return food.reduce((total, item) => item.price + total, 0)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (stepIndex: number) => {
    switch(stepIndex){
      case 0:
        return(
          <Box>
            <PaymentMethod/>
          </Box>
        );
      case 1: 
      //change this depending on payment method chosen
        return(
        <Box>
          <SwishPayment/>
        </Box>
      )
      case 2: 
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
        steps={3}
        position="static"
        activeStep={activeStep}
        className={classes.style}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 2}>
            {activeStep === 0 ? "Payment" : activeStep === 1 ? "Swish" : "Confirm"}
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
        <Box className={classes.height}>
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
                  {total()} kr
                </Typography>
              </Box>
              { activeStep === 2 ? 
              <Box className={classes.buttonContainer}>
                <Button variant="outlined" className={classes.button}>Cancel</Button>
                <Button variant="outlined" className={classes.button}>Checkout</Button>
              </Box>
              : null
              }
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
    height: "100vh"
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