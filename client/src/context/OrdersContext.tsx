import { createContext, useEffect, useState } from "react";
import {db} from '../firebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Order } from "../types/types";

interface IState {
  order: any
}
interface ContextValue extends IState {
  createOrder: (product: any) => void;
}

export const OrderContext = createContext<ContextValue>({
  order: [],
  createOrder: () => {},
});

interface Props {
  children: Object;
}

function OrderProvider(props: Props) {
  const [order, setorder] = useState<any>([]);
  const usersCollectionRef = collection(db, 'orders')

  /* useEffect(() => {
    const getMenu = async () => {
      const data = await getDocs(usersCollectionRef);
      setMenu(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getMenu()
  }, []) */

  

  function createOrder(product: any) {
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


  return (
    <OrderContext.Provider
      value={{
        order: order,
        createOrder: createOrder
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}

export const OrderConsumer = OrderContext.Consumer;
export default OrderProvider;