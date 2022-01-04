import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { CartContext, MenuItem} from "../../context/CartContext";
import { MenuItemType } from "../../types/types";

interface IProps {
  menuItem: MenuItemType | MenuItem;
}


function GroupedButtons({menuItem}:IProps) {
  const { addToCart, removeProductFromCart, clearCart, cart } = useContext(CartContext);

  const cartQuantity = (item: MenuItemType) => {
    const quantityInCart = cart.find((c: MenuItem) => c.title === item.title)
    if(!quantityInCart ){
      return 0
    }
    return quantityInCart!.quantity
  }

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button
        onClick={() => {
          removeProductFromCart(menuItem);
        }}
      >
        -
      </Button>
        <Button>
          {!menuItem.quantity ? cartQuantity(menuItem) : menuItem.quantity}
        </Button>
      <Button
        onClick={() => {
          addToCart(menuItem);
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