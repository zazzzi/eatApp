import { createContext, useContext, useEffect, useState } from "react";
import {db} from '../firebase'
import { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Order, UserDb } from "../types/types";
import { MenuItem } from "./CartContext";
import { UserAuthContext } from "./UsersContext";

interface IState {
  order: any
}
interface ContextValue extends IState {
  createOrder: (response: any, cart: MenuItem[], total: number) => void;
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


  const createOrder = (response: any, cart: MenuItem[], total: number) => {
    console.log(userData)
    console.log(response)
    console.log(cart)
    console.log(total)
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