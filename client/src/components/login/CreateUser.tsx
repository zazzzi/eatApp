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
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import LogOutBtn from "./LogOutBtn";
interface Iprops {}

function CreateUser(props: Iprops) {
  const classes = useStyles();
  const [userToCreate, setUserToCreate] = useState<User>();
  const usersCollectionRef = collection(db, "users");

  // CREATES NEW USER WITH DATA FROM CHILD
  async function userDataCallback(user: User) {
    setUserToCreate(user);
    console.log(user);
    await createUserWithEmailAndPassword(auth, user.email, user.password).then(
      async (cred) => {
        return await setDoc(doc(db, "users", cred.user.uid), {user})
      }
    );
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user){
        console.log(user.email, " Logged in")
      } else {
        console.log("Logged out");
        
      }
    })
  })

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
        <LogOutBtn/>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: "flex",
    width: "100vw",
    marginTop: "100px",
  },
}));

export default CreateUser;
