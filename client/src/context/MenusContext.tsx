import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { MenuItemType } from "../types/types";
import { UserAuthContext } from "./UsersContext";

interface IState {
  restaurantId: any;
  restaurantData: any;
}

interface ContextValue extends IState {
  sendUrlParam: (param: string, table: string) => void;
}

export const MenuContext = createContext<ContextValue>({
  restaurantId: {},
  restaurantData: {},
  sendUrlParam: () => {},
});

interface Props {
  children: Object;
}

function MenuProvider(props: Props) {
  const [id, setId] = useState<string>("");
  const [table, setTable] = useState<number>(0)
  const [restaurantData, setRestaurantdata] = useState<any>(null);
  const [currentTableAndRestaurant, setcurrentTableAndRestaurant] = useState<any | null>(null)
  const { userInformation } = useContext(UserAuthContext);

  useEffect(() => {
    if (!id) return;
    const getRestaurantData = async () => {
      const docRef = doc(db, "restaurants", `${id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRestaurantdata(docSnap.data());
      } else {
        console.log("No such restaurant!");
      }
    };
    getRestaurantData();
  }, [id]);

  useEffect(() => {
    
    let restaurant = JSON.parse(localStorage.getItem("restaurant") || "{}");
    setcurrentTableAndRestaurant(restaurant); 
  
  }, []);


  const urlParam = (param: string, table: string) => {
    console.log(param, table)
    const currentRestaurant = {
      restaurantId: param,
      table: table
    }
    setTable(Number(table))
    setId(param);
    localStorage.setItem("restaurant", JSON.stringify(currentRestaurant));
  };

  /* function clearCart() {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  } */


  /* async function getTabs() {
    const usersCollectionRef = collection(db, "restaurants", `${id}`);
    const data = await getDocs(usersCollectionRef);
  } */

  return (
    <MenuContext.Provider
      value={{
        restaurantId: currentTableAndRestaurant,
        restaurantData: restaurantData,
        sendUrlParam: urlParam,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
}

export const MenuConsumer = MenuContext.Consumer;
export default MenuProvider;
