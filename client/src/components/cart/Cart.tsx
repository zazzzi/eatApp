import { Box, makeStyles, Theme, Typography} from "@material-ui/core";
import { useContext} from "react";
import { Link } from "react-router-dom";
import MenuItems from "../menu/MenuItem"
import { CartContext } from "../../context/CartContext";
import { RestaurantTableData } from "../../types/types";

interface Iprops {
  restaurantData: RestaurantTableData
}

function Cart({restaurantData}: Iprops) {
  const classes = useStyles();
  const { cart } = useContext(CartContext);

  return (
   <Box>
      <Typography 
        className={classes.cartText}
        variant="h5" 
        gutterBottom component="div"
      >
          Cart
        </Typography>
        {!cart.length ? 
          <Box className={classes.boxContainer}>
          <Typography variant="h4" gutterBottom component="div">
            Din vagn är tom.
          </Typography> 
          <Link to={`/menu/${restaurantData.restaurantId}?table=${restaurantData.table}`}>
            <Typography variant="h6" gutterBottom component="div">
              Tillbaka till menyn
            </Typography> 
          </Link>
          </Box>
          :
          <MenuItems menuItems = {cart}/>
        }
   </Box>
  );
}

const useStyles = makeStyles(() => ({
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
  },
  cartText: {
    padding: "1rem 0rem 0rem 1rem"
  },
  boxContainer: {
    padding: "5rem 0rem 5rem 0rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
}));


export default Cart; 