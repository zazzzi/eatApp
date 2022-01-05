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
  getUID: () => void;
}

export const UserAuthContext = createContext<ContextValue>({
  getUID: () => {},
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
        console.log(userID, " Logged in");
      } else {
        setUserID(null);
        setLoggedIn(false);
      }
    });
  });

  function getUID() {
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     console.log(user.uid);
        
    //     return user.uid

    //   } else {
    //     return null
    //   }
    // })
  }

  return (
    <UserAuthContext.Provider
      value={{
        loggedIn: loggedIn,
        userID: userID,

        getUID: getUID,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
}

export const UserAuthConsumer = UserAuthContext.Consumer;
export default UserAuthProvider;
