import { createContext, useContext, useEffect, useState } from "react";
import {db} from '../firebase'
import { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Order, RestaurantTableData, UserDb } from "../types/types";
import { MenuItem } from "./CartContext";
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
  const {userID} = useContext(UserAuthContext)
  const [userData, setUserData] = useState<UserDb | null>(null)
  const ordersCollectionRef = collection(db, 'orders')
  const docRef = doc(db, "users", `${userID}`)


  useEffect(() => {
    const getUserData = async () => {
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setUserData(docSnap.data() as UserDb)
      } else {
        console.log("No such user!");
      }
    }
    getUserData()
  }, [])


  const createOrder = (paymentData: any, cart: MenuItem[], total: number, restaurantData: RestaurantTableData) => {
    console.log(paymentData)

    const order: Order = {
      orderDate: Date(),
      cart: cart,
      session: userData!,
      priceTotal: total,
      restaurantData: restaurantData,
      payment: paymentData.body,
      paymentType: paymentData.paymentType,
    }

    return order
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