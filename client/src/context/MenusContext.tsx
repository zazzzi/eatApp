import { createContext, useEffect, useState } from "react";
import {db} from '../firebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { MenuItemType } from "../types/types";


interface IState {
  menu: MenuItemType[];
}

interface ContextValue extends IState {
  populateMenu: (product: MenuItemType) => void;
}

export const MenuContext = createContext<ContextValue>({
  menu: [],
  populateMenu: () => {},
});

interface Props {
  children: Object;
}

function MenuProvider(props: Props) {
  const [menu, setMenu] = useState<any>([]);
  const usersCollectionRef = collection(db, 'menu')

  useEffect(() => {
    const getMenu = async () => {
      const data = await getDocs(usersCollectionRef);
      setMenu(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getMenu()
  }, [])

  

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
        populateMenu: populateMenu
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
}

export const MenuConsumer = MenuContext.Consumer;
export default MenuProvider;