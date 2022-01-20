import {
  Box,
  Link,
  makeStyles,
  Theme,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { ChangeEventHandler, useEffect, useState } from "react";
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
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Navigate } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";

interface Iprops {}

function ResetPassword(props: Iprops) {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [uid, setUid] = useState<string>();
  const [resetEmail, setResetEmail] = useState<string | null>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setIsLoggedIn(true);
      }
    });
  }, []);

  function sendResetEmail(event: React.SyntheticEvent) {
    event.preventDefault();
    const auth = getAuth();

    if (resetEmail) {
      sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setResetEmail(event.target.value);
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
        <Typography variant="h4">Återställ lösenord</Typography>
        <Typography className={classes.textAlignCenter} variant="body2">
          Skriv in din email så skickar vi <br />
          ett mail med instructioner!
        </Typography>
      </Box>
      <Box>
        <form className={classes.formStyling} onSubmit={sendResetEmail}>
          <TextField
            className={classes.inputField}
            id="email"
            label="E-mail"
            variant="outlined"
            size="small"
            type="email"
            autoComplete="current-email"
            onChange={handleChange}
          ></TextField>
          <Box className={classes.loginBtnContainer}>
            <Button endIcon={<SendIcon />} size="large" type="submit">
              Skicka{" "}
            </Button>
          </Box>
        </form>
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
  textAlignCenter: {
    textAlign: "center",
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
  },
  noAccountInnerContainer: {
    border: "1px solid grey",
    padding: "0.3rem .8rem",
    borderRadius: "10px",
  },
  inputField: {
    width: "15rem",
    marginTop: "1rem",
  },
  formStyling: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtnContainer: {
    display: "flex",
    justifyContent: "end",
    width: "15rem",
    margin: "4rem 0 2rem 0",
  },
}));

export default ResetPassword;
