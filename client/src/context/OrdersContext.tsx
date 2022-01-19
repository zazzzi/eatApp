import { createContext, useContext, useEffect, useState } from "react";
import {db} from '../firebase'
import { collection, doc, setDoc, addDoc, getDocs, updateDoc} from "firebase/firestore";
import { Order, RestaurantTableData, User } from "../types/types";
import  {  MenuItem } from "./CartContext";
import { UserAuthContext } from "./UsersContext";

interface ContextValue{
  orders: any;
  order: any;
  createOrder: (
    response: any, 
    cart: MenuItem[], 
    total: number, 
    restaurantData: RestaurantTableData
  ) => void;
  confirmOrderDelivery: (order: Order) => void
}

export const OrderContext = createContext<ContextValue>({
  orders: [],
  order: {},
  createOrder: () => {},
  confirmOrderDelivery: () => {}
});

interface Props {
  children: Object;
}

function OrderProvider(props: Props) {
  const [order, setorder] = useState<Order | null>(null);
  const { userInformation, userID } = useContext(UserAuthContext)
  const [orders, setOrders] = useState<any | null>(null)

  useEffect(()=> {
    if(!userInformation) return
    const getOrders = async () => {
      const OrdersCollectionRef = collection(db, 'orders')
      const data = await getDocs(OrdersCollectionRef);
      if (data) {
        setOrders(data.docs.map((doc) => (
          {...doc.data(), id: doc.id}
        )));
      } else {
        console.log("No Orders!");
      }
    }
    getOrders();
  },[userInformation])

  const createOrder = (paymentData: any, cart: MenuItem[], total: number, restaurantData: RestaurantTableData) => {
    const order: Order = {
      extId: !userID ? "guest" : userID,
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

  const confirmOrderDelivery = async (order: Order) => {
    const docRef = doc(db, "orders", `${order.id}`);
    await updateDoc(docRef, {
      "delivered": true,
    });
    orders.map((o: Order) => {
      if(o.extId === order.id){
        o.delivered = true
      }
    })
  }

  return (
    <OrderContext.Provider
      value={{
        orders: orders,
        order: order,
        createOrder: createOrder,
        confirmOrderDelivery: confirmOrderDelivery
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}

export const OrderConsumer = OrderContext.Consumer;
export default OrderProvider;