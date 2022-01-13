import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  deleteField,
} from "firebase/firestore";
import { MenuItemType } from "../types/types";
import { UserAuthContext } from "./UsersContext";
import { keys } from "@material-ui/core/styles/createBreakpoints";

interface IState {
  restaurantId: any;
  restaurantData: any;
}

interface ContextValue extends IState {
  sendUrlParam: (param: string, table: string) => void;
  updateItemData: (itemId: string, value: any) => void;
  createNewMenuItem: (value: any) => void;
  deleteMenuItem: (value: any, itemId: string) => void;
}

export const MenuContext = createContext<ContextValue>({
  restaurantId: {},
  restaurantData: {},
  sendUrlParam: () => {},
  updateItemData: () => {},
  createNewMenuItem: () => {},
  deleteMenuItem: () => {},
});

interface Props {
  children: Object;
}

function MenuProvider(props: Props) {
  const [id, setId] = useState<string>("");
  const [table, setTable] = useState<number>(0);
  const [restaurantData, setRestaurantdata] = useState<any>(null);
  const [currentTableAndRestaurant, setcurrentTableAndRestaurant] = useState<
    any | null
  >(null);
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
    const currentRestaurant = {
      restaurantId: param,
      table: table,
    };
    setTable(Number(table));
    setId(param);
    localStorage.setItem("restaurant", JSON.stringify(currentRestaurant));
  };

  async function updateItemData(itemId: string, value: any) {
    const docRef = doc(db, "restaurants", `${id}`);

    const menu: any = restaurantData.menu.map((obj: any) => {
      if (obj.title === itemId) {
        Object.keys(value).map((key: string) => {
          obj[key] = value[key];
          return obj;
        });
        return { ...obj };
      } else {
        return obj;
      }
    });
    await updateDoc(docRef, {
      menu,
    }).then(() => {
      console.log(value);
    });
  }

  async function createNewMenuItem(value: any) {
    const newItem = restaurantData;
    newItem.menu.push(value);
    await setDoc(doc(db, "restaurants", `${id}`), newItem);
  }

  async function deleteMenuItem(value: any, itemId: string) {
    const docRef = doc(db, "restaurants", `${id}`);
    const menu = restaurantData.menu.filter((obj: any) => obj.id !== itemId);
    restaurantData.menu = menu;

    await updateDoc(docRef, {
      menu,
    });
  }

  /* function clearCart() {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  } */

  return (
    <MenuContext.Provider
      value={{
        restaurantId: currentTableAndRestaurant,
        restaurantData: restaurantData,
        sendUrlParam: urlParam,
        updateItemData: updateItemData,
        createNewMenuItem: createNewMenuItem,
        deleteMenuItem: deleteMenuItem,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
}

export const MenuConsumer = MenuContext.Consumer;
export default MenuProvider;
