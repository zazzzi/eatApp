import { Box, makeStyles, Theme, Typography, Button} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "../../context/CartContext";
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
  <Box>
   <Box className={classes.height}>
     <Box>
      <Typography>Tack för din beställning, din order är på väg!</Typography>
     </Box>
     <Box className={classes.box}>
      <Typography>Din Order:</Typography>
       {order.cart.map((item: MenuItem) => (
         <Box>
           <Typography>{item.quantity} {item.title} {item.price * item.quantity} kr</Typography>
         </Box>
       ))}
      <Typography>Betallsätt: {order.paymentType}</Typography>
      <Typography>Till: {order.table}</Typography>
      <Typography>Totalpris: {order.priceTotal}</Typography>
     </Box>
   </Box>
  <Box>
  <Button><Link className={classes.link} to={"/menu"}>Tillbaks till menyn</Link></Button>
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
  },
  link: {
    paddingTop: "0.2rem",
    color: "black",
    textDecoration: "none"
  },
}));


export default OrderConfirmation; 