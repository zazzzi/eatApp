import {
  Box,
  Button,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import eatAppLogo from "../../assets/logos/eatAppLogo.png";
import { User } from "../../types/types";
import CreateUserForm from "./CreateUserForm";
import LoginInputForm from "./LoginInputForm";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import LogOutBtn from "./LogOutBtn";
interface Iprops {}

function CreateUser(props: Iprops) {
  const classes = useStyles();
  const usersCollectionRef = collection(db, "users");

  // CREATES NEW USER WITH DATA FROM CHILD
  async function userDataCallback(user: User) {
    await createUserWithEmailAndPassword(auth, user.email, user.password).then(
      async (cred) => {
        const userInformation = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber
        }
        return await setDoc(doc(db, "users", cred.user.uid), { userInformation });
      }
    );
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email, " Logged in");
      } else {
        console.log("Logged out");
      }
    });
  });

  return (
    <Box>
      <Box>
        <img className={classes.logo} src={eatAppLogo} alt="eatAppLogo.png" />
      </Box>
      <Box>
        <Typography variant="h2">Skapa nytt konto</Typography>
        <Typography variant="body2">Fyll i dina uppgifter här.</Typography>
      </Box>
      <Box>
        <CreateUserForm userDataCallback={userDataCallback} />
      </Box>
      <Box>
        <LogOutBtn />
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: "flex",
    width: "100vw",
  },
}));

export default CreateUser;
