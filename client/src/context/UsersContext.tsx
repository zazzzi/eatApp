import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { User, UserInfoToUpdate } from "../types/types";
import { onAuthStateChanged, updatePassword } from "firebase/auth";

interface IState {
  loggedIn: boolean;
  userID: string | null;
  userInformation: User | null;
}

interface ContextValue extends IState {
  updateUserPassword: (password: string) => void;
  updateUserInformation: (userID: string, data: UserInfoToUpdate) => void;
}

export const UserAuthContext = createContext<ContextValue>({
  updateUserInformation: () => {},
  updateUserPassword: () => {},
  loggedIn: false,
  userID: null,
  userInformation: {} as User,
});

interface Props {
  children: Object;
}

function UserAuthProvider(props: Props) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userID, setUserID] = useState<string | null>(null);
  const [userInformation, setUserInformation] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUserID(user.uid);
        getUserInformation(user.uid);
      } else {
        setUserID(null);
        setLoggedIn(false);
      }
    });
  }, []);

  // COMMENT OUT DURING STYLING
  async function getUserInformation(userID: string) {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInformation(docSnap.data().userInformation);
    }
  }

  async function updateUserPassword(password: string) {
    const user = auth.currentUser;
    if (user) {
      await updatePassword(user, password);
    }
  }

  async function updateUserInformation(userID: string, data: UserInfoToUpdate) {
    const docRef = doc(db, "users", userID);
    await updateDoc(docRef, {
      "userInformation.email": data.email,
      "userInformation.firstName": data.firstName,
      "userInformation.lastName": data.lastName,
      "userInformation.phoneNumber": data.phoneNumber,
      "userInformation.role": data.role,
      "userInformation.rID": data.rID,
    });
  }

  return (
    <UserAuthContext.Provider
      value={{
        loggedIn: loggedIn,
        userID: userID,
        userInformation: userInformation,
        updateUserInformation: updateUserInformation,
        updateUserPassword: updateUserPassword,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
}

export const UserAuthConsumer = UserAuthContext.Consumer;
export default UserAuthProvider;
