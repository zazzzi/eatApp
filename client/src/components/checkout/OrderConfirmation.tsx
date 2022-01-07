import { Box, makeStyles, Theme, Typography} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Order } from "../../types/types";

interface Iprops {
 order: Order
}

function OrderConfirmation({order}: Iprops) {
  console.log(order)
  const classes = useStyles();

  if(!order){
    return (
      <Box>
        nothing here bruh
      </Box>
    )
  }

  return (
   <Box className={classes.height}>
     <Box>
      <Typography>Tack för din beställning, din order är på väg!</Typography>
     </Box>
     <Box className={classes.box}>
      <Typography>{order.priceTotal} hi</Typography>
      <Typography>{order.priceTotal} hi</Typography>
     </Box>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    outline: "0.01rem solid"
  }, 
  height: {
    height: "100%"
  }
}));


export default OrderConfirmation; 