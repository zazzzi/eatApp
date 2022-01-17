import { Box, makeStyles, Theme, Typography, Button} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "../../context/CartContext";
import { Order, RestaurantTableData } from "../../types/types";


interface Iprops {
 order: Order;
 restaurantId: RestaurantTableData;
}

function OrderConfirmation({order, restaurantId}: Iprops) {
  const classes = useStyles();

  if(!order || !restaurantId){
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
      {/* <Typography>Till: {order.table}</Typography> */}
      <Typography>Totalpris: {order.priceTotal} kr</Typography>
     </Box>
   </Box>
  <Box>
  <Button><Link className={classes.link} to={`/menu/${restaurantId.restaurantId}?table=${restaurantId.table}`}>Tillbaks till menyn</Link></Button>
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