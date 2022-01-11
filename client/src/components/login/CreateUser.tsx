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
import { Navigate } from "react-router-dom";
interface Iprops {}

function CreateUser(props: Iprops) {
  const classes = useStyles();
  const usersCollectionRef = collection(db, "users");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [uid, setUid] = useState<string>();



  // CREATES NEW USER WITH DATA FROM CHILD
  async function userDataCallback(user: User) {
    await createUserWithEmailAndPassword(auth, user.email, user.password).then(
      async (cred) => {
        const userInformation = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: "customer"
        }
        return await setDoc(doc(db, "users", cred.user.uid), { userInformation });
      }
    );
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email, " Logged in");
        setUid(user.uid);
        setIsLoggedIn(true);
      } else {
        console.log("Logged out");
      }
    });
  });

  return (
    <Box>
      {isLoggedIn ? <Navigate to={`/user/${uid}`} /> : null}
      <Box>
        <img className={classes.logo} src={eatAppLogo} alt="eatAppLogo.png" />
      </Box>
      <Box className={classes.welcomeTextContainer}>
        <Typography variant="h4">Skapa nytt konto</Typography>
        <Typography variant="body2">Fyll i dina uppgifter här.</Typography>
      </Box>
      <Box className={classes.formContainer}>
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
    marginTop: "2rem"
  },
  welcomeTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem 0 1rem 0",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
}));

export default CreateUser;
