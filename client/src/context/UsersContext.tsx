import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { MenuItemType, User } from "../types/types";
import { onAuthStateChanged } from "firebase/auth";

interface IState {
  loggedIn: boolean;
  userID: string | null;
  userInformation: User
}

interface ContextValue extends IState {
  checkForRestaurantAuth: (userID: string ) => void;
}

export const UserAuthContext = createContext<ContextValue>({
  checkForRestaurantAuth: () => {},
  loggedIn: false,
  userID: null,
  userInformation: {} as User
});

interface Props {
  children: Object;
}

function UserAuthProvider(props: Props) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userID, setUserID] = useState<string | null>(null);
  const [userInformation, setUserInformation] = useState<User>({} as User);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUserID(user.uid);
        getUserInformation(user.uid)
        console.log("Logged in to: ", user.email);
      } else {
        setUserID(null);
        setLoggedIn(false);
        console.log("Not logged in.");
      }
    });
  },[]);
  

  // COMMENT OUT DURING STYLING
  async function getUserInformation(userID: string) {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log( docSnap.data());
      setUserInformation(docSnap.data().userInformation)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

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
        userInformation: userInformation
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
}

export const UserAuthConsumer = UserAuthContext.Consumer;
export default UserAuthProvider;
