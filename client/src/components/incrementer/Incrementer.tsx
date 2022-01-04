import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { CartContext, CartItem } from "../../context/CartContext";

/* interface IProps {
  product: CartItem;
} */

function GroupedButtons() {
  const { addToCart, removeProductFromCart } = useContext(CartContext);

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button
        onClick={() => {
          console.log('test')
         /*  addToCart(props.product); */
        }}
      >
        +
      </Button>
      <Button>1</Button>
      <Button
        onClick={() => {
          console.log('test')
          /* removeFromCart(props.product); */
        }}
      >
        -
      </Button>
    </ButtonGroup>
  );
}

export default GroupedButtons;