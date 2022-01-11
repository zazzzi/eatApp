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
import { User } from "../../types/types";
import LogOutBtn from "../login/LogOutBtn";

interface Iprops {}

function UserPage(props: Iprops) {
  const { userInformation } = useContext(UserAuthContext);
  const classes = useStyles();
  const [userInfoState, setUserInfoState] = useState<User | null>(null);

  console.log(userInfoState);

  useEffect(() => {
    setUserInfoState(userInformation);
  });

  return (
    <Box>
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
          <form className={classes.formStyling} action="">
            <TextField
              className={classes.textFieldStyling}
              id="email"
              label="Epostadress"
              defaultValue={userInfoState.email}
            />
            <TextField
              className={classes.textFieldStyling}
              label="Förnamn"
              defaultValue={userInfoState.firstName}
            />
            <TextField
              className={classes.textFieldStyling}
              defaultValue={userInfoState.lastName}
              label="Efternamn"
              id="user-lastName"
            />
            <TextField
              className={classes.textFieldStyling}
              label="Telefonnummer"
              id="user-phoneNumber"
              defaultValue={userInfoState.phoneNumber}
            />
            <Button
              color="primary"
              variant="contained"
              className={classes.formSubmitBtn}
            >
              Spara ändringar
            </Button>
          </form>
        ) : null}
      </Box>
      <Box>
        ORDERS HÄR
      </Box>
      <Box className={classes.buttonContainer}>
        <Button>Byt lösenord</Button>
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
    marginLeft: "2rem",
    marginTop: "1rem",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "25rem",
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
