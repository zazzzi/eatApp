import { createContext, useContext, useEffect, useState } from "react";
import {db} from '../firebase'
import { collection, doc, setDoc, addDoc, getDocs} from "firebase/firestore";
import { Order, RestaurantTableData, User } from "../types/types";
import  {  MenuItem } from "./CartContext";
import { UserAuthContext } from "./UsersContext";
import { MenuContext } from "./MenusContext";
interface ContextValue{
  orders: any;
  order: any;
  createOrder: (
    response: any, 
    cart: MenuItem[], 
    total: number, 
    restaurantData: RestaurantTableData
  ) => void;
}

export const OrderContext = createContext<ContextValue>({
  orders: [],
  order: {},
  createOrder: () => {},
});

interface Props {
  children: Object;
}

function OrderProvider(props: Props) {
  const [order, setorder] = useState<Order | null>(null);
  const { userInformation, userID } = useContext(UserAuthContext)
  const {restaurantData} = useContext(MenuContext)
  const [orders, setOrders] = useState<any | null>(null)


  useEffect(()=> {
    if(!userInformation) return
    const getOrders = async () => {
      const OrdersCollectionRef = collection(db, 'orders')
      const data = await getDocs(OrdersCollectionRef);
      if (data) {
        setOrders(data.docs.map((doc) => (
          {...doc.data()}
        )));
      } else {
        console.log("No Orders!");
      }
    }
    getOrders();
  },[userInformation])

  const createOrder = (paymentData: any, cart: MenuItem[], total: number, restaurantData: RestaurantTableData) => {

    const order: Order = {
      id: !userID ? "guest" : userID,
      orderDate: new Date().toLocaleDateString(),
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
        orders: orders,
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