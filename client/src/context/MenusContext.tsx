import { createContext, useEffect, useState } from "react";
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

interface IState {
  menu: MenuItemType[];
  restaurantData: any;
}

interface ContextValue extends IState {
  sendUrlParam: (param: string) => void;
}

export const MenuContext = createContext<ContextValue>({
  menu: [],
  restaurantData: {},
  sendUrlParam: () => {},
});

interface Props {
  children: Object;
}

function MenuProvider(props: Props) {
  const [menu, setMenu] = useState<any>([]);
  const [id, setId] = useState<string>("");
  const [restaurantData, setRestaurantdata] = useState<any>(null);

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
    const getMenu = async () => {
      const usersCollectionRef = collection(db, "menu");
      const data = await getDocs(usersCollectionRef);
      setMenu(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMenu();
  }, []);

  const urlParam = (param: string) => {
    setId(param);
  };

  /* async function getTabs() {
    const usersCollectionRef = collection(db, "restaurants", `${id}`);
    const data = await getDocs(usersCollectionRef);
  } */

  return (
    <MenuContext.Provider
      value={{
        menu: menu,
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
