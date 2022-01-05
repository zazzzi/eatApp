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
} from "firebase/firestore";
import LogOutBtn from "./LogOutBtn";
import { signInWithEmailAndPassword } from "firebase/auth";

interface Iprops {}

function Login(props: Iprops) {
  const classes = useStyles();

  async function loginDataCallback(user: IncomingUser) {
    console.log(user);
    await signInWithEmailAndPassword(auth, user.email, user.password).then(
      (cred) => {
        console.log(cred, " Logged in");
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

export default Login;
