import { Box, makeStyles, Theme, Button, Typography, Divider} from "@material-ui/core";
import { useEffect, useState } from "react";
import food from "../../food"
import MenuItem from "../menu/MenuItem"

interface Iprops {
 
}

function Cart(props: Iprops) {

  const orderTotal = () => {
    return food.reduce((total, item) => item.price + total, 0)
  }

  return (
   <Box>
     <Typography variant="h3" gutterBottom component="div">
        Cart
      </Typography>
      <MenuItem menuItem = {food}/>
      <Divider />
      <Typography>
        Summa
      </Typography>
      <Typography>
        {orderTotal()} kr
      </Typography>
      <Button variant="outlined">hello</Button>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default Cart; 