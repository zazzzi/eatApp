import {
  Box,
  Button,
  makeStyles,
  TextField,
  Link,
  Theme,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../../context/UsersContext";
import { User, UserInfoToUpdate } from "../../types/types";
import LogOutBtn from "../login/LogOutBtn";
import PasswordModal from "./PasswordModal";
import mainBackground from "../../assets/img/front_page_background.png";
import logoStanced from "../../assets/logos/EatApp_stansad.png";

interface Iprops {}

function UserPage(props: Iprops) {
  const { userInformation, updateUserInformation, userID } =
    useContext(UserAuthContext);
  const classes = useStyles();
  const [userInfoState, setUserInfoState] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [updatedInfo, setUpdatedInfo] = useState<UserInfoToUpdate>(
    {} as UserInfoToUpdate
  );

  useEffect(() => {
    setUserInfoState(userInformation);
  });

  function updateInfoState(id: string, value: string) {
    setUpdatedInfo({
      ...updatedInfo,
      [id]: value,
    });
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    document.title = `Välkommen, ${userInfoState?.firstName}`;
  }, [userInfoState]);

  function handleChange(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    console.log(event.target.value);
    updateInfoState(event.target.id, event.target.value);
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const user = {
      email: updatedInfo.email ? updatedInfo.email : userInfoState!.email,
      firstName: updatedInfo.firstName
        ? updatedInfo.firstName
        : userInfoState!.firstName,
      lastName: updatedInfo.lastName
        ? updatedInfo.lastName
        : userInfoState!.lastName,
      phoneNumber: updatedInfo.phoneNumber
        ? updatedInfo.phoneNumber
        : userInfoState!.phoneNumber,
      role: userInfoState!.role,
      rID: userInfoState!.rID ? userInformation!.rID! : "",
    };
    if (updatedInfo && userID) {
      updateUserInformation(userID, user);
      console.log(updatedInfo);
    }
  }

  if (!userInfoState) {
    return (
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: "24rem",
          lg: "24rem",
          xl: "24rem",
        },
        margin: {
          md: "2rem auto",
          lg: "2rem auto",
          xl: "2rem auto",
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
      <Link href="/">
        <img className={classes.logo} src={logoStanced} alt="eatAppLogo.png" />
      </Link>
      <Box className={classes.welcomeMessageContainer}>
        {userInfoState ? (
          <Typography variant="h4">
            Välkommen {userInfoState.firstName}
          </Typography>
        ) : null}
      </Box>
      <Box className={classes.informationMessageContainer}>
        <Typography>Ändra din kontoinformation här:</Typography>
      </Box>
      <Box className={classes.formContainer}>
        {userInfoState ? (
          <form
            onSubmit={handleSubmit}
            className={classes.formStyling}
            action=""
          >
            <TextField
              className={classes.textFieldStyling}
              id="email"
              label="Epostadress"
              type="email"
              variant="outlined"
              defaultValue={userInfoState.email}
              onChange={handleChange}
            />
            <TextField
              className={classes.textFieldStyling}
              label="Förnamn"
              id="firstName"
              variant="outlined"
              defaultValue={userInfoState.firstName}
              onChange={handleChange}
            />
            <TextField
              className={classes.textFieldStyling}
              defaultValue={userInfoState.lastName}
              label="Efternamn"
              id="lastName"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              className={classes.textFieldStyling}
              label="Telefonnummer"
              id="phoneNumber"
              variant="outlined"
              defaultValue={userInfoState.phoneNumber}
              onChange={handleChange}
            />
            <Button
              color="primary"
              variant="contained"
              className={classes.formSubmitBtn}
              type="submit"
            >
              Spara ändringar
            </Button>
          </form>
        ) : null}
      </Box>
      <Box className={classes.buttonContainer}>
        <Button className={classes.buttonStyling} variant="contained" onClick={openModal}>Byt lösenord</Button>
        {userInfoState && userInfoState.role === "customer" ? (
          <Link style={{ textDecoration: "none" }} href="/orders">
            <Button className={classes.buttonStyling} variant="contained">
              Tidigare beställnigar
            </Button>
          </Link>
        ) : null}
        {isOpen ? (
          <PasswordModal
            closeModal={() => setIsOpen(false)}
            editOpen={isOpen}
          />
        ) : null}
        {userInfoState && userInfoState.role === "owner" ? (
          <Button href={`/menu/${userInfoState.rID}?table=0`}>
            Redigera din restaurang
          </Button>
        ) : null}
        <LogOutBtn />
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: "flex",
    width: "20rem",
    padding: "1rem 0 0 0",
  },
  welcomeMessageContainer: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  informationMessageContainer: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    margin: "1rem 0",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
  formStyling: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formSubmitBtn: {
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    height: "2rem",
    padding: "0 .5rem",
    textTransform: "none",
    width: "10rem",
  },
  textFieldStyling: {
    width: "15rem",
    margin: ".5rem 0",
    backgroundColor: "#F9F9F9",
    borderRadius: "8px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
  backgroundColor: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    backgroundImage: `url(${mainBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  },
  buttonStyling: {
    margin: ".5rem 0 ",
    display: "flex",
    alignItems: "center",
    height: "2rem",
    padding: "0 .5rem",
    textTransform: "none",
  },
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default UserPage;
