import {
  Box,
  Button,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserAuthContext } from "../../context/UsersContext";
import { auth } from "../../firebase";
import { User, UserInfoToUpdate } from "../../types/types";
import LogOutBtn from "../login/LogOutBtn";
import PasswordModal from "./PasswordModal";

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

  return (
    <Box style={{ backgroundColor: "#FEFEFE" }}>
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
      {userInfoState && userInfoState.role === "customer" ? (
        <Box>ORDERS HÄR</Box>
      ) : null}
      <Box className={classes.buttonContainer}>
        <Button onClick={openModal}>Byt lösenord</Button>
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
  welcomeMessageContainer: {
    marginTop: "5rem",
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
  },
  textFieldStyling: {
    width: "15rem",
    margin: ".5rem 0",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2rem",
  },
}));

export default UserPage;
