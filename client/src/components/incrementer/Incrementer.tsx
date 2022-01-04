import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { CartContext } from "../../context/CartContext";
import { MenuItemType } from "../../types/types";

interface IProps {
  menuItem: any;
}

function GroupedButtons({menuItem}:IProps) {
  const { addToCart, removeProductFromCart, clearCart } = useContext(CartContext);

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button
        onClick={() => {
          removeProductFromCart(menuItem[0]);
        }}
      >
        -
      </Button>
      <Button>0</Button>
      <Button
        onClick={() => {
          addToCart(menuItem[0]);
        }}
      >
        +
      </Button>
      <Button
        onClick={() => {
          clearCart();
        }}
      >
        clear
      </Button>
    </ButtonGroup>
  );
}

export default GroupedButtons;