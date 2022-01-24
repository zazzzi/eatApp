import { Box, makeStyles, Theme, Typography, Button, Divider} from "@material-ui/core";
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
     <Box className={classes.center}>
      <Box className={classes.confirmText}>
        <Typography>Tack för din beställning, din order är på väg!</Typography>
      </Box>
        <Box className={classes.containerStyle}>
          <Box className={classes.textSpacing}>
            <Typography>Din Order:</Typography>
            
            <Typography>{order.orderDate}</Typography>
          </Box>
          <Divider className={classes.divider}/>
          <Box className={classes.padding}>
            {order.cart.map((item: MenuItem, index: number) => (
              <Box key={index}>
                <Typography>{item.quantity} {item.title} {item.price * item.quantity} kr</Typography>
              </Box>
            ))}
          </Box>
          <Divider className={classes.divider}/>
            <Typography>Bord: {order.restaurantData.table}</Typography>
            <Box className={classes.textSpacing}>
              <Typography>Betallsätt: {order.paymentType}</Typography>
              <Typography>Totalpris: {order.priceTotal} kr</Typography>
            </Box>
        </Box>
      </Box>
     <Box>
      <Button variant="contained"><Link className={classes.link} to={`/menu/${restaurantId.restaurantId}?table=${restaurantId.table}`}>Tillbaks till menyn</Link></Button>
    </Box>
   </Box>
</Box>
  );
}

const useStyles = makeStyles(() => ({
  height: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100vh"
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
    padding: "1rem",
    boxShadow: "1px 2px 6px 1px rgba(0,0,0,0.12)",
    flexDirection: "column",
    width: "80%"
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  confirmText: {
    padding: '2rem'
  },
  size: {
    margin: "auto"
  },
  divider: {
    margin: "auto",
    width: "100%"
  },
  padding: {
    padding: "1rem 1rem 1rem 1rem"
  },
  textSpacing: {
    display: "flex",
    justifyContent: "space-between"
  }
}));


export default OrderConfirmation; 