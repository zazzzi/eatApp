import { Box, CircularProgress, makeStyles, Theme, Typography} from "@material-ui/core";
import { useEffect, useState } from "react";
import { MenuItemType, Order, User } from "../../types/types";


interface Iprops {
  orders: Order[];
  userId: string | null;
  userInfo: User | null
}


function Orders({orders, userId, userInfo}: Iprops) {
  const classes = useStyles(); 

  if(!orders){
    return (
    <Box className={classes.loader}>
      <CircularProgress/>
    </Box>
  )}

  const listCart = (cart: MenuItemType[]) => {
    return (
      <Box >
           {cart.map((item:MenuItemType) => (
             <Box>
               {item.title} x{item.quantity}
             </Box>
           ))}
      </Box>
    )
  }

  return (
   <Box className={classes.container}>
     <Typography> Tidigare bestälningar </Typography>
       {orders.map((order: Order) => (
         <Box className={classes.containerStyle}>
           {order.priceTotal}
           {listCart(order.cart)}
         </Box>
       ))}
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  container: {
    margin: "1rem",
  },
  containerStyle: {
    borderRadius: "0.2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.5rem 0rem 0.5rem 0rem",
    boxShadow: "1px 2px 6px 1px rgba(0,0,0,0.12)"
  }
}));


export default Orders; 