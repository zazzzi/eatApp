import { Box, makeStyles, Theme, Typography, Button} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MenuItem, CartContext } from "../../context/CartContext";
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
     <Box className={classes.containerStyle}>
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
  height: {
    height: "100%"
  },
  link: {
    paddingTop: "0.2rem",
    color: "black",
    textDecoration: "none"
  },
  container: {
    height: "100vh",
    backgroundColor: "white",
    margin: "1rem",
  },
  containerStyle: {
    borderRadius: "0.2rem",
    display: "flex",
    margin: "0.5rem 0rem 0.5rem 0rem",
    boxShadow: "1px 2px 6px 1px rgba(0,0,0,0.12)",
    flexDirection: "column"
  },
}));


export default OrderConfirmation; 