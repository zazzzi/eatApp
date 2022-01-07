import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { MenuItemType } from "../types/types";
import { onAuthStateChanged } from "firebase/auth";

interface IState {
  loggedIn: boolean;
  userID: string | null;
}

interface ContextValue extends IState {
  checkForRestaurantAuth: (userID: string) => void;
}

export const UserAuthContext = createContext<ContextValue>({
  checkForRestaurantAuth: () => {},
  loggedIn: false,
  userID: null,
});

interface Props {
  children: Object;
}

function UserAuthProvider(props: Props) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUserID(user.uid);
        console.log("Logged in to: ", user.email);
      } else {
        setUserID(null);
        setLoggedIn(false);
        console.log("Not logged in.");
      }
    });
  });

  function checkForRestaurantAuth(userID: string) {
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     if (user.uid === userID) {
    //       console.log("RESTAURANTEEEE");
    //     }
    //   } else {
    //     return null;
    //   }
    // });
  }

  return (
    <UserAuthContext.Provider
      value={{
        loggedIn: loggedIn,
        userID: userID,
        checkForRestaurantAuth: checkForRestaurantAuth,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
}

export const UserAuthConsumer = UserAuthContext.Consumer;
export default UserAuthProvider;
