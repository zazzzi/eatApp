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
  restaruantTitleIsBlack: boolean;
}

interface ContextValue extends IState {
  sendUrlParam: (param: string, table: string) => void;
  updateItemData: (itemId: string, value: any) => void;
  createNewMenuItem: (value: any) => void;
  deleteMenuItem: (value: any, itemId: string) => void;
  fetchDatabaseWithId: (id: string) => void;
  addTable: (table: string) => void;
  deleteTable: (table: string) => void;
  updateRestaurantColor: (hex: any) => void;
  updateRestaurantNameColor: (value: boolean) => void;
}

export const MenuContext = createContext<ContextValue>({
  restaurantId: {},
  restaurantData: {},
  restaruantTitleIsBlack: true,
  sendUrlParam: () => {},
  updateItemData: () => {},
  createNewMenuItem: () => {},
  deleteMenuItem: () => {},
  fetchDatabaseWithId: () => {},
  addTable: () => {},
  deleteTable: () => {},
  updateRestaurantColor: () => {},
  updateRestaurantNameColor: () => {},
});

interface Props {
  children: Object;
}

function MenuProvider(props: Props) {
  const [id, setId] = useState<string>("");
  const [table, setTable] = useState<number>(0);
  const [restaurantData, setRestaurantdata] = useState<any>(null);
  const [restaurantColor, setRestaurantColor] = useState<any>(null);
  const [restaruantTitleIsBlack, setRestaruantTitleIsBlack] =
    useState<boolean>(true);
  const [currentTableAndRestaurant, setcurrentTableAndRestaurant] = useState<
    any | null
  >(null);
  const { userInformation } = useContext(UserAuthContext);
  const [currentRestaurant, setCurrentRestaurant] = useState<any | null>(null)

  console.log(restaurantData)

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

  useEffect(() => {
    if(!restaurantData) return
    const currentRestaurant = {
      restaurantId: id,
      table: table,
      restaurantName: restaurantData.restaurantName
    };
    localStorage.setItem("restaurant", JSON.stringify(currentRestaurant));
  }, [restaurantData])

  const urlParam = (param: string, table: string) => {
    setTable(Number(table));
    setId(param);
  };

  const fetchDatabaseWithId = (id: string) => {
    setId(id);
  };

  async function updateItemData(itemId: string, value: any) {
    const docRef = doc(db, "restaurants", `${id}`);
    const menu: object = restaurantData.menu.map((obj: any) => {
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

  const addTable = async (table: string) => {
    const docRef = doc(db, "restaurants", `${id}`);
    restaurantData.tables.push(table);
    const tables = restaurantData.tables;
    await updateDoc(docRef, {
      tables,
    });
  };

  const deleteTable = async (table: string) => {
    const docRef = doc(db, "restaurants", `${id}`);
    const tables = restaurantData.tables.filter((t: string) => t !== table);
    restaurantData.tables = tables;
    await updateDoc(docRef, {
      tables,
    });
  };

  async function updateRestaurantColor(hex: any) {
    const docRef = doc(db, "restaurants", `${id}`);
    console.log(hex.background);

    const color = hex.background;
    setRestaurantColor(color);
    await updateDoc(docRef, {
      color,
    });
    console.log("color set to", color);
  }

  async function updateRestaurantNameColor(value: boolean) {
    const docRef = doc(db, "restaurants", `${id}`);

    const isNameBlack = value;
    await updateDoc(docRef, {
      isNameBlack,
    });
    setRestaruantTitleIsBlack(value);
    console.log("name is black", isNameBlack);
  }

  return (
    <MenuContext.Provider
      value={{
        restaurantId: currentTableAndRestaurant,
        restaurantData: restaurantData,
        sendUrlParam: urlParam,
        updateItemData: updateItemData,
        createNewMenuItem: createNewMenuItem,
        deleteMenuItem: deleteMenuItem,
        fetchDatabaseWithId: fetchDatabaseWithId,
        addTable: addTable,
        deleteTable: deleteTable,
        restaruantTitleIsBlack: restaruantTitleIsBlack,
        updateRestaurantColor: updateRestaurantColor,
        updateRestaurantNameColor: updateRestaurantNameColor,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
}

export const MenuConsumer = MenuContext.Consumer;
export default MenuProvider;
