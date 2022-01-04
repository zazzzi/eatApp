import { Box, makeStyles, Theme, Button, Typography, Divider} from "@material-ui/core";
import { SsidChartTwoTone } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import food from "../../food"
import MenuItems from "../menu/MenuItem"
import { CartContext } from "../../context/CartContext";

interface Iprops {
 
}

function Cart(props: Iprops) {
  const classes = useStyles();
  const { cart } = useContext(CartContext);

  const total = () => {
    return cart.reduce((total, item) => (item.price * item.quantity) + total, 0)
  }

  return (
   <Box className={classes.height}>
     <Typography variant="h4" gutterBottom component="div">
        Cart
      </Typography>
      {!cart.length ? 
        <Typography variant="h4" gutterBottom component="div">
          Your cart is empty
        </Typography> 
        :
        <MenuItems menuItems = {cart}/>
      }
      <Divider />
      <Box className={classes.align}>
        <Box className={classes.priceTotal}>
          <Typography>
            Summa
          </Typography>
          <Typography>
            {total()} kr
          </Typography>
        </Box>
        <Box className={classes.buttonContainer}>
          <Button variant="outlined" className={classes.button}>Tillbaks</Button>
          <Link to={"/checkout"}>
            <Button variant="outlined" className={classes.button}>Checkout</Button>
          </Link>
        </Box>
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
    width: "30%"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  }
}));


export default Cart; 