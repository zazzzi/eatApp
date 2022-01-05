import { createContext, useEffect, useState } from "react";
import {db} from '../firebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Order } from "../types/types";
import { MenuItem } from "./CartContext";

interface IState {
  order: any
}
interface ContextValue extends IState {
  createOrder: (response: any, cart: MenuItem[]) => void;
}

export const OrderContext = createContext<ContextValue>({
  order: [],
  createOrder: () => {},
});

interface Props {
  children: Object;
}

function OrderProvider(props: Props) {
  const [order, setorder] = useState<Order | null>(null);
  const usersCollectionRef = collection(db, 'orders')

  /* useEffect(() => {
    const getMenu = async () => {
      const data = await getDocs(usersCollectionRef);
      setMenu(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getMenu()
  }, []) */

  

  const createOrder = (response: any, cart: MenuItem[]) => {
    console.log(response)
    console.log(cart)
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