import {
  Box,
  Button,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { auth, db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { User } from "../../types/types";
import CreateUserForm from "./CreateUserForm";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Navigate } from "react-router-dom";
import mainBackground from "../../assets/img/front_page_background.png";
import logoStanced from "../../assets/logos/EatApp_stansad.png";

function CreateUser() {
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
          role: "customer",
        };
        return await setDoc(doc(db, "users", cred.user.uid), {
          userInformation,
        });
      }
    );
  }

  useEffect(() => {
    document.title = "Skapa ny användare";
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setIsLoggedIn(true);
      }
    });
  });

  return (
    <Box
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          width: "100%",
          boxShadow: "-20px 0px 17px rgba(0, 0, 0, 0.03)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            margin: {
              md: "auto",
              lg: "auto",
              xl: "auto",
            },
            maxHeight: {
              xs: "100%",
              sm: "100%",
              md: "65rem",
              lg: "65rem",
              xl: "65rem",
            },
          }}
          className={classes.backgroundColor}
        >
          <Box className={classes.rootContainer}>
            {isLoggedIn ? <Navigate to={`/user/${uid}`} /> : null}
            <Box className={classes.logoContainer}>
              <img
                className={classes.logo}
                src={logoStanced}
                alt="eatApp logo"
              />
            </Box>
            <Box className={classes.welcomeTextContainer}>
              <Typography variant="h4">Skapa nytt konto</Typography>
              <Typography variant="body2">
                Fyll i dina uppgifter här.
              </Typography>
            </Box>
            <Box className={classes.formContainer}>
              <CreateUserForm userDataCallback={userDataCallback} />
            </Box>
            <Box className={classes.formContainer}>
              <Link href="/login">
                <Button style={{ margin: ".4rem 0" }}>Tillbaka</Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: "flex",
    width: "20rem",
  },
  backgroundColor: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${mainBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
  },
  logoContainer: {
    display: "flex",
    paddedTop: "5rem",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0 1rem 0",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rootContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
}));

export default CreateUser;
