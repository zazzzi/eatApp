import { Box, CircularProgress, Divider, makeStyles, Theme, Typography} from "@material-ui/core";
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

  console.log(orders)

  const listCart = (cart: MenuItemType[]) => {
    return (
      <Box >
           {cart.map((item:MenuItemType) => (
             <Typography className={classes.fontSize}>
              {item.quantity}st  {item.title} - {item.price * item.quantity} kr
             </Typography>
           ))}
      </Box>
    )
  }

  return (
   <Box className={classes.container}>
     <Typography> Tidigare bestälningar </Typography>
       {orders.map((order: Order) => 
         order.id === userId ? (
         <Box className={classes.containerStyle}>
          <Box className={classes.textBox}>
           <Typography> {order.restaurantData.restaurantName}: Bord {order.restaurantData.table} </Typography>
           <Typography> {order.priceTotal} kr</Typography>
          </Box>
          <Divider className={classes.divider}/>
          <Box className={classes.textBox}>
           <Box>{listCart(order.cart)}</Box>
           <Typography> {order.orderDate} </Typography>
          </Box>
        </Box>) : null
        )}
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  container: {
    margin: "1rem",
  },
  containerStyle: {
    borderRadius: "0.2rem",
    display: "flex",
    margin: "0.5rem 0rem 0.5rem 0rem",
    boxShadow: "1px 2px 6px 1px rgba(0,0,0,0.12)",
    flexDirection: "column"
  },
  textBox: {
    padding: "1rem 1.5rem 1rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end"
  }, 
  fontSize: {
    fontSize: "0.7rem"
  },
  divider: {
    margin: "auto"
  }
}));


export default Orders; 