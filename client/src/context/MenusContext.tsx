import { createContext, useEffect, useState } from "react";
import {db} from '../firebase'
import { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { MenuItemType } from "../types/types";


interface IState {
  menu: MenuItemType[];
}

interface ContextValue extends IState {
  sendUrlParam: (param: string) => void;
}

export const MenuContext = createContext<ContextValue>({
  menu: [],
  sendUrlParam: () => {},
});

interface Props {
  children: Object;
}

function MenuProvider(props: Props) {
  const [menu, setMenu] = useState<any>([]);
  const [id, setId] = useState<string>("")
  const [restaurantData, setRestaurantdata] = useState<any>(null)
  const usersCollectionRef = collection(db, 'menu')

  useEffect(() => {
    const getRestaurantData = async () => {
      const docRef = doc(db, "restaurants", `${id}`);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setRestaurantdata(docSnap.data())
      } else {
        console.log("No such restaurant!");
      }
    }
    getRestaurantData()
  }, [])

  useEffect(() => {
    const getMenu = async () => {
      const data = await getDocs(usersCollectionRef);
      setMenu(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getMenu()
  }, [])

const urlParam = (param: string) => {
  setId(param)
}

  function populateMenu(product: MenuItemType) {
    /* setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.name === product.name);
      if (isItemInCart) {
        return prev.map((item: CartItem) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    }); */
  }


  return (
    <MenuContext.Provider
      value={{
        menu: menu,
        sendUrlParam: urlParam
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
}

export const MenuConsumer = MenuContext.Consumer;
export default MenuProvider;