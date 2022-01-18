import { createContext, useContext, useEffect, useState } from "react";
import {db} from '../firebase'
import { collection, doc, setDoc, addDoc} from "firebase/firestore";
import { Order, RestaurantTableData, User } from "../types/types";
import  { CartContext, MenuItem } from "./CartContext";
import { UserAuthContext } from "./UsersContext";
interface ContextValue{
  order: any
  createOrder: (
    response: any, 
    cart: MenuItem[], 
    total: number, 
    restaurantData: RestaurantTableData
  ) => void;
}

export const OrderContext = createContext<ContextValue>({
  order: {},
  createOrder: () => {},
});

interface Props {
  children: Object;
}

function OrderProvider(props: Props) {
  const [order, setorder] = useState<Order | null>(null);
  const { userInformation, userID } = useContext(UserAuthContext)
  const {clearCart} = useContext(CartContext)

  const createOrder = (paymentData: any, cart: MenuItem[], total: number, restaurantData: RestaurantTableData) => {
    const order: Order = {
      orderDate: Date(),
      cart: cart,
      session: !userInformation ? "guest" : {...userInformation, id: userID} as User,
      priceTotal: total,
      restaurantData: restaurantData,
      payment: paymentData.body,
      paymentType: paymentData.paymentType,
      delivered: false
    }
    logOrderToDatabase(order)
    return order
  }

  const logOrderToDatabase = async (order: Order) => {
    try {
      await addDoc(collection(db, 'orders'), order)
    } catch (err) {
      console.log(err)
    }
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