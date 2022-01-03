import { 
  Box, 
  makeStyles, 
  Theme, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography
} from "@material-ui/core";
import { useEffect, useState } from "react";
import PaymentMethod from "./PaymentMethod"
import CardPayment from "./CardPayment"
import SwishPayment from "./Swish"
import OrderConfirmation from "./OrderConfirmation"
import React from "react";


interface Iprops {
 
}

const steps = ['Betala', 'Betalning', 'Klart'];

function Checkout(props: Iprops) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const classes = useStyles();

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box className={classes.topContainer}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography className={classes.stepsCompleted}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography className={classes.stepsCompleted}>Step {activeStep + 1}</Typography>
          <Box className={classes.back}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
 /*  return (
   <Box>
      <PaymentMethod/>
      <CardPayment/>
      <SwishPayment/>
      <OrderConfirmation/>
   </Box>
  ); 
  }*/


const useStyles = makeStyles((theme: Theme) => ({
  topContainer: {
    width: '100%' 
  }, 
  stepsCompleted: {
    mt: 2, 
    mb: 1
  }, 
  back: {
    display: 'flex', 
    flexDirection: 'row', 
    pt: 2 
  },
  backButton: {
    mr: 1 
  }

}));


export default Checkout; 