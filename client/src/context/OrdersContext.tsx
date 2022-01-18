import { createContext, useContext, useEffect, useState } from "react";
import {db} from '../firebase'
import { collection, doc, setDoc, addDoc, getDocs} from "firebase/firestore";
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
  const [orders, setOrders] = useState<any | null>(null)
  const {clearCart} = useContext(CartContext)

  console.log(orders)

  useEffect(()=> {
    if(!userInformation) return
    if(userInformation.role === "owner"){
    const getOrders = async () => {
      /* const docRef = doc(db, "orders");
      const snapShot = await collection('orders').get()
      const docSnap = await getDocs(docRef)); */
      /* if (docSnap.exists()) {
        setOrders(docSnap.data());
      } else {
        console.log("No Orders!");
      } */
    };
    getOrders();
    }
    //if owner, get all orders
    //if customer, get only customer orders
  },[])

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