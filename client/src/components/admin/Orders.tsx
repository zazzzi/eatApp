import { Box, Button, CircularProgress, Divider, makeStyles, Tab, Tabs, Theme, Typography} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrdersContext";
import { MenuItemType, Order, User } from "../../types/types";


interface Iprops {
  orders: Order[];
  userId: string | null;
  userInfo: User | null
}


function Orders({orders, userId, userInfo}: Iprops) {
  const classes = useStyles(); 
  const {confirmOrderDelivery} = useContext(OrderContext)
  const [value, setValue] = useState('one');
  const [filteredOrders, setFilteredOrders] = useState<Array<Order> | null>(null)

  useEffect(() => {
    if(!userInfo || !orders) return
    if(userInfo!.role === "owner"){
      const filtered = orders.filter((order:Order)=>{
        if(!order.delivered && value === "one"){
          return order
        } else if (order.delivered && value === "two"){
          return order
        }
      })
      setFilteredOrders(filtered)
    }
  },[value])

  console.log(filteredOrders)

  if(!orders){
    return (
    <Box className={classes.loader}>
      <CircularProgress/>
    </Box>
  )}

  const handleConfirm = (order: Order) => {
    confirmOrderDelivery(order)
  }

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

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
     <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        variant="fullWidth"
      >
        <Tab value="one" label="Olevererat" />
        <Tab value="two" label="Levererat" />
      </Tabs>
    </Box>
     <Typography> {userInfo?.role === "owner" ? "Bestälningar" : "Tidigare bestälningar"} </Typography>
       {filteredOrders!.map((order: Order) => 
         order.extId === userId || userInfo?.role === "owner" ? (
         <Box className={classes.containerStyle}>
          <Box className={classes.textBox}>
           <Typography> {order.restaurantData.restaurantName}: Bord {order.restaurantData.table} </Typography>
           <Typography> {order.priceTotal} kr</Typography>
          </Box>
          <Box className={classes.textBox}>
           <Box>{listCart(order.cart)}</Box>
           <Typography> {order.orderDate} </Typography>
          </Box>
          <Divider className={classes.divider}/>
          {userInfo?.role === "owner" ? (
            <Box className={classes.adminButton}>
              <Typography className={classes.orderStatus}>Status:{" "}{order.delivered ? 
              (<Typography style={{color: "green"}}> Levererat</Typography>) : 
              (<Typography style={{color: "red"}}> Olevererat</Typography>)}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={()=> handleConfirm(order)}
                disabled={order.delivered}
              >Leverera</Button>
            </Box>
          ) : null}
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
  },
  adminButton: {
    padding: '0.5rem 1.5rem 0.5rem 1.5rem',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  orderStatus: {
    display: "flex",
  }
}));


export default Orders; 