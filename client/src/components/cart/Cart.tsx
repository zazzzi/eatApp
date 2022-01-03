import { Box, makeStyles, Theme, Button, Typography, Divider} from "@material-ui/core";
import { useEffect, useState } from "react";
import food from "../../food"
import MenuItem from "../menu/MenuItem"

interface Iprops {
 
}

function Cart(props: Iprops) {
  const classes = useStyles();

  const orderTotal = () => {
    return food.reduce((total, item) => item.price + total, 0)
  }

  return (
   <Box className={classes.height}>
     <Typography variant="h4" gutterBottom component="div">
        Cart
      </Typography>
      <MenuItem menuItem = {food} category={"all"} />
      <Divider />
      <Box className={classes.align}>
        <Box className={classes.priceTotal}>
          <Typography>
            Summa
          </Typography>
          <Typography>
            {orderTotal()} kr
          </Typography>
        </Box>
        <Button variant="outlined" className={classes.button}>Bekräfta</Button>
      </Box>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  height: {
    height: "100vh"
  },
  priceTotal: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 1rem 1rem 1rem"
  },
  align: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    margin: "auto",
    width: "30%"
  }
}));


export default Cart; 