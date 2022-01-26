import {
  Box,
  Link,
  makeStyles,
  Theme,
  TextField,
  Button,
  Hidden,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Navigate } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import mainBackground from "../../assets/img/front_page_background.png";
import blobDesktop from "../../assets/img/desktop_blob.png";
import logoStanced from "../../assets/logos/EatApp_stansad.png";
import sideImg from "../../assets/img/side_picture.png";

function ResetPassword() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [uid, setUid] = useState<string>();
  const [resetEmail, setResetEmail] = useState<string | null>();
  const [resetSent, setResetSent] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setIsLoggedIn(true);
      }
    });
  }, []);

  useEffect(() => {
    document.title = "Återställ lösenord";
  }, []);

  function sendResetEmail(event: React.SyntheticEvent) {
    event.preventDefault();
    const auth = getAuth();

    if (resetEmail) {
      sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          setResetSent(true);
        })
        .catch((error) => {
          setResetSent(true);
        });
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setResetEmail(event.target.value);
  }

  return (
    <Box className={classes.root}>
      <Box
        sx={{
          position: "relative",
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
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100rem",
          },
        }}
        className={classes.backgroundColor}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "50rem",
              lg: "50rem",
              xl: "100%",
            },
            minWidth: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "31rem",
            },
          }}
        >
          {isLoggedIn ? <Navigate to={`/user/${uid}`} /> : null}
          <Box className={classes.paperBackgroundImgStyling}>
            <Box className={`${classes.welcomeTextContainer}`}>
              {resetSent ? null : (
                <Box>
                  <Box className={`${classes.logoContainer}`}>
                    <Link href="/">
                      <h1 style={{ margin: 0 }}>
                        <img
                          className={classes.logo}
                          src={logoStanced}
                          alt="eatApp"
                        />
                      </h1>
                    </Link>
                  </Box>
                  <Box className={classes.textAlignCenter}>
                    <p
                      className={`${classes.fontSizeL} ${classes.welcomeText}`}
                    >
                      Återställ lösenord
                    </p>
                    <p
                      className={`${classes.textAlignCenter} ${classes.welcomeText}`}
                    >
                      Skriv in din email så skickar vi <br />
                      ett mail med instructioner!
                    </p>
                  </Box>
                </Box>
              )}
            </Box>
            {resetSent ? (
              <Box className={classes.resetMessageSent}>
                <Box className={`${classes.logoContainerSent}`}>
                  <Link href="/">
                    <img
                      className={classes.logo}
                      src={logoStanced}
                      alt="eatApp Logo"
                    />
                  </Link>
                </Box>
                <p
                  style={{ width: "18rem" }}
                  className={`${classes.textAlignCenter} ${classes.welcomeText}`}
                >
                  Om epost-adressen existerar så har vi skickat ett email med
                  instruktioner om hur du återställer ditt lösenord.
                </p>
                <Link
                  href="/login"
                  underline="none"
                  className={classes.backToLoginBtn}
                >
                  <Button className={classes.buttonStyling} variant="contained">
                    Tillbaka till login
                  </Button>
                </Link>
              </Box>
            ) : (
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
                    <Button
                      className={classes.buttonStyling}
                      endIcon={<SendIcon />}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Skicka{" "}
                    </Button>
                  </Box>
                </form>
              </Box>
            )}
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
              alt="A picture of food"
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
    padding: "2rem 0 0 0",
  },
  textAlignCenter: {
    textAlign: "center",
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
    boxShadow: "-20px 0px 17px rgba(0, 0, 0, 0.03)",
  },
  logoContainer: {
    display: "flex",
    marginTop: "5rem",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainerSent: {
    display: "flex",
    marginTop: "2rem",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
  paperBackgroundImgStyling: {
    backgroundImage: `url(${blobDesktop})`,
    backgroundPosition: "center",
    [theme.breakpoints.down("xs")]: {
      backgroundSize: "cover",
    },
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
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
  inputField: {
    width: "15rem",
    marginTop: "1rem",
    backgroundColor: "#F9F9F9",
    borderRadius: "8px",
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
    margin: "1.5rem 0 5rem 0",
  },
  fontSizeL: {
    fontSize: "28px",
  },
  resetMessageSent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "1rem 0 1rem 0",
    padding: "3rem 0",
  },
  backToLoginBtn: {
    margin: "2rem 0",
  },
  buttonStyling: {
    display: "flex",
    alignItems: "center",
    height: "2rem",
    padding: "0 .5rem",
    textTransform: "none",
  },
  sideImgContainer: {
    width: "100%",
    height: "100%",
    borderRadius: "150px 0 0 150px",
    boxShadow: "-20px 0px 20px 0px rgb(0 0 0 / 3%);",
  },
}));

export default ResetPassword;
