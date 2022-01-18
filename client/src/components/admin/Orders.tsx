import { Box, CircularProgress, makeStyles, Theme} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Order, User } from "../../types/types";

interface Iprops {
  orders: Order[];
  userId: string | null;
  userInfo: User | null
}



function Orders({orders, userId, userInfo}: Iprops) {
  const classes = useStyles(); 

  console.log(userId)
  console.log(userInfo)
console.log(orders)

  if(!orders){
    return (
    <Box className={classes.loader}>
      <CircularProgress/>
    </Box>
  )}

  return (
   <Box>
       TEST
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
  }
}));


export default Orders; 