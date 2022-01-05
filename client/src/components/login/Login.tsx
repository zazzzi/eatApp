import { Box, Link, makeStyles, Theme, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import eatAppLogo from "../../assets/logos/eatAppLogo.png";
import { IncomingUser, User } from "../../types/types";
import LoginInputForm from "./LoginInputForm";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import LogOutBtn from "./LogOutBtn";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

interface Iprops {}

function Login(props: Iprops) {
  const classes = useStyles();
  const [loggedInUser, setLoggedInUser] = useState<string>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email, " Logged in");
        console.log(user.uid);
        
      } else {
        console.log("Logged out");
      }
    });
  });

  //async funtion to log the user in
  async function loginDataCallback(user: IncomingUser) {
    console.log(user);

    await signInWithEmailAndPassword(auth, user.email, user.password).then(
      async (cred) => {
        //gets the db-doc that correlates to the UId of the logged in user
        const docRef = doc(db, "users", cred.user.uid);
        const docSnap = await getDoc(docRef);

        //checks if the data exist and then sends it in the log
        if (docSnap.exists()) {
          console.log("Data: ", docSnap.data());
        } else {
          console.log("ERROR");
        }
      }
    );
  }

  return (
    <Box>
      <Box>
        <img className={classes.logo} src={eatAppLogo} alt="eatAppLogo.png" />
      </Box>
      <Box>
        <Typography variant="h2">Välkommen</Typography>
        <Typography variant="body2">Logga in på ditt konto här.</Typography>
      </Box>
      <Box>
        <LoginInputForm loginDataCallback={loginDataCallback} />
      </Box>
      <Box>
        <Typography>
          Inget konto?&nbsp;
          <Link href="/create-user" underline="always">
            Skapa ett här!
          </Link>
        </Typography>
      </Box>
      <Box>
        <LogOutBtn />
      </Box>
      <Box>
        <Typography>Logged in as: {loggedInUser}</Typography>
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

export default Login;
