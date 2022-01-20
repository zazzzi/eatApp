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
import { Navigate } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

interface Iprops {}

function Login(props: Iprops) {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [uid, setUid] = useState<string>();
  const [wrongPasswordOrEmail, setWrongPasswordOrEmail] = useState<boolean>(false);

  console.log(uid, isLoggedIn);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setIsLoggedIn(true);
      }
    });
  }, []);

  //async funtion to log the user in
  async function loginDataCallback(user: IncomingUser) {
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(async (cred) => {
      })
      .catch((err) => {
        if (err) {
          setWrongPasswordOrEmail(true);
        }
      });
  }

  return (
    <Box>
      {isLoggedIn ? <Navigate to={`/user/${uid}`} /> : null}
      <Box
        sx={{ position: "absolute", top: "0", zIndex: 100 }}
        display="flex"
        justifyContent="center"
      >
        <Link href="/">
          <HomeIcon htmlColor="#000000" fontSize="large" />
        </Link>
      </Box>
      <Box className={classes.logoContainer}>
        <img className={classes.logo} src={eatAppLogo} alt="eatAppLogo.png" />
      </Box>
      <Box className={classes.welcomeTextContainer}>
        <Typography variant="h4">Välkommen</Typography>
        <Typography variant="body2">Logga in på ditt konto här.</Typography>
      </Box>
      <Box>
        <LoginInputForm incorrectInfo={wrongPasswordOrEmail} loginDataCallback={loginDataCallback} />
      </Box>

      <Box className={classes.noAccountOuterContainer}>
        <Box className={classes.noAccountInnerContainer}>
          <Typography>
            Inget konto?&nbsp;
            <Link href="/create-user" underline="always">
              Skapa ett här!
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: "flex",
    width: "100vw",
  },
  logoContainer: {
    display: "flex",
    marginTop: "5rem",
  },
  welcomeTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "2rem",
  },
  noAccountOuterContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    left: "50%",
    bottom: "20px",
    transform: "translate(-50%, -50%)",
    margin: "0 auto",
  },
  noAccountInnerContainer: {
    border: "1px solid grey",
    padding: "0.3rem .8rem",
    borderRadius: "10px",
  },
}));

export default Login;
