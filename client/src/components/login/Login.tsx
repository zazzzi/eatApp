import {
  Box,
  CircularProgress,
  Hidden,
  Link,
  makeStyles,
  Theme,
} from "@material-ui/core";

import { useEffect, useState } from "react";
import { IncomingUser } from "../../types/types";
import LoginInputForm from "./LoginInputForm";
import { auth } from "../../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";
import blobDesktop from "../../assets/img/desktop_blob.png";
import mainBackground from "../../assets/img/front_page_background.png";
import sideImg from "../../assets/img/side_picture.png";
import logoStanced from "../../assets/logos/EatApp_stansad.png";

function Login() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [uid, setUid] = useState<string>();
  const [wrongPasswordOrEmail, setWrongPasswordOrEmail] =
    useState<boolean>(false);

  console.log(isLoggedIn);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setIsLoggedIn(true);
      }
    });
  }, []);

  useEffect(() => {
    document.title = "Logga in!";
  }, []);

  //async funtion to log the user in
  async function loginDataCallback(user: IncomingUser) {
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(async (cred) => {})
      .catch((err) => {
        if (err) {
          setWrongPasswordOrEmail(true);
        }
      });
  }

  // if (!isLoggedIn || isLoggedIn === undefined) {
  //   return (
  //     <Box className={classes.loader}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <Box className={classes.root}>
      <Box
        sx={{
          borderRadius: "50px",
          position: "relative",
          display: "flex",
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "100rem",
            lg: "100rem",
            xl: "100rem",
          },
          margin: {
            xs: "0rem auto",
            sm: "0rem auto",
            md: "0rem auto",
            lg: "0rem auto",
            xl: "0rem auto",
          },
          maxHeight: {
            xs: "100%",
            sm: "100%",
            md: "50rem",
            lg: "50rem",
            xl: "50rem",
          },
        }}
        className={classes.backgroundColor}
      >
        {isLoggedIn ? <Navigate to={`/user/${uid}`} /> : null}
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "50rem",
              lg: "50rem",
              xl: "100%",
            },
          }}
        >
          <Box className={classes.paperBackgroundImgStyling} sx={{}}>
            <Box className={classes.welcomeTextContainer}>
              <Link href="/">
                <img
                  className={classes.logo}
                  src={logoStanced}
                  alt="eatAppLogo.png"
                />
              </Link>
              <p className={classes.welcomeText}>Logga in på ditt konto här.</p>
            </Box>
            <Box>
              <LoginInputForm
                incorrectInfo={wrongPasswordOrEmail}
                loginDataCallback={loginDataCallback}
              />
            </Box>
          </Box>

          <Box className={classes.noAccountOuterContainer}>
            <Box className={classes.noAccountInnerContainer}>
              <p
                style={{
                  fontFamily: "Roboto",
                  fontSize: "15px",
                  fontWeight: 400,
                  margin: 0,
                  padding: ".2rem",
                  color: "#F9F9F9",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "#F9F9F9" }}
                  href="/create-user"
                  underline="always"
                >
                  Inget konto? Skapa ett här!
                </Link>
              </p>
            </Box>
          </Box>
        </Box>
        <Hidden lgDown>
          <Box className={classes.sideImgContainer}>
            <img
              style={{ objectFit: "cover" }}
              className={classes.sideImgContainer}
              src={sideImg}
              alt=""
            />
          </Box>
        </Hidden>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },

  logo: {
    display: "flex",
    width: "11rem",
    padding: "0 0 0 0",
  },
  backgroundColor: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${mainBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
    boxShadow: "-20px 0px 17px rgba(0, 0, 0, 0.03)",
  },
  logoContainer: {
    display: "flex",
    paddingTop: "5rem",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#FEFEFE",
  },
  welcomeTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // marginTop: "2rem",
    paddingTop: "5rem",
    // backgroundColor: "#FEFEFE",
  },
  welcomeText: {
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: 500,
    background:
      "-webkit-linear-gradient(90.63deg, #989082 15.88%, rgba(81, 77, 71, 0.70) 78.06%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: ".5rem 0 .4rem",
  },
  noAccountOuterContainer: {
    width: "100%",
    display: "flex",
    // alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    left: "25%",
    [theme.breakpoints.down("lg")]: {
      left: "50%",
    },
    bottom: "-18px",
    transform: "translate(-50%, -50%)",
    margin: "0 auto",
  },
  noAccountInnerContainer: {
    backgroundColor: "#C7C0AE",
    backgroundPosition: "center",
    backgroundSize: "fill",
    backgroundRepeat: "no-repeat",
    border: "1px solid transparent",
    padding: "0.3rem .8rem",
    borderRadius: "18px 18px 0 0",
  },
  paperBackgroundImgStyling: {
    backgroundImage: `url(${blobDesktop})`,
    backgroundPosition: "center",
    [theme.breakpoints.down("xs")]: {
      backgroundSize: "cover",
    },
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  sideImgContainer: {
    width: "100%",
    height: "100%",
    borderRadius: "150px 0 0 150px",
    boxShadow: "-20px 0px 20px 0px rgb(0 0 0 / 3%);",
  },
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default Login;
