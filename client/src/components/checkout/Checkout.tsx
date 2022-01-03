import React from "react";
import { 
  Box, 
  makeStyles, 
  Theme, 
  Button, 
  Typography,
  MobileStepper,
  useTheme,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import PaymentMethod from "./PaymentMethod"
import CardPayment from "./CardPayment"
import SwishPayment from "./Swish"
import OrderConfirmation from "./OrderConfirmation"
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


interface Iprops {
 
}

function Checkout() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = useStyles();

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
            Next
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
        {getStepContent(activeStep)}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  style: {
    maxWidth: 400, 
    flexGrow: 1
  }, 
}));

export default Checkout; 