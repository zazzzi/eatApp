import { createContext, useEffect, useState } from "react";
import { MenuItemType } from "../types/types";


export interface MenuItem extends MenuItemType{
  quantity: number;
}

interface IState {
  cart: MenuItem[];
}
interface ContextValue extends IState {
  addToCart: (product: MenuItemType) => void;
  removeProductFromCart: (id: MenuItem) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ContextValue>({
  cart: [],
  addToCart: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
});

interface Props {
  children: Object;
}

function CartProvider(props: Props) {
  const [cartItems, setCartItems] = useState([] as MenuItem[]);

  function addProductToCart(menuItem: MenuItemType) {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.title === menuItem.title);
      if (isItemInCart) {
        return prev.map((item: MenuItem) =>
          item.title === menuItem.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...menuItem, quantity: 1 }];
    });
  }

  function removeProductFromCart(menuItem: MenuItemType) {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.title === menuItem.title) {
          if (item.quantity === 1) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as MenuItem[])
    );
  }

  function clearCart() {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  });

  return (
    <CartContext.Provider
      value={{
        cart: cartItems,
        addToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
        clearCart: clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export const CartConsumer = CartContext.Consumer;
export default CartProvider;
