import { createContext, useEffect, useState } from "react";
import { MenuItemType } from "../types/types";


export interface CartItem extends MenuItemType{
  quantity: number;
}

interface IState {
  cart: CartItem[];
}
interface ContextValue extends IState {
  addToCart: (product: MenuItemType) => void;
  removeProductFromCart: (id: CartItem) => void;
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
  const [cartItems, setCartItems] = useState([] as CartItem[]);

  function addProductToCart(product: MenuItemType) {
    /* setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.name === product.name);
      if (isItemInCart) {
        return prev.map((item: CartItem) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    }); */
  }

  function removeProductFromCart(productName: MenuItemType) {
    /* setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.name === productName.name) {
          if (item.quantity === 1) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItem[])
    ); */
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
