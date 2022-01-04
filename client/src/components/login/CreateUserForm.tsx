import {
  Box,
  Button,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { FocusEventHandler, useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { User } from "../../types/types";

interface Iprops {}

function CreateUserForm(props: Iprops) {
  const classes = useStyles();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean>();
  const [userToCreate, setUserToCreate] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    role: "user",
    password: "",
  });

  useEffect(() => {
    if (userToCreate.password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [confirmPassword, userToCreate.password]);

  function updateUserObject(id: string, value: string) {
    setUserToCreate({
      ...userToCreate,
      [id]: value,
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateUserObject(event.target.id, event.target.value);
  }

  function sendUser() {
    console.log("====================================");
    console.log(userToCreate);
    console.log("====================================");
  }

  function passwordValidation(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    setConfirmPassword(event.target.value);
    console.log(confirmPassword);
    if (confirmPassword === userToCreate.password) {
      console.log("True");
    }
  }

  return (
    <Box>
      <Box className={classes.outerContainer}>
        <TextField
          className={classes.inputField}
          id="email"
          label="E-mail"
          variant="standard"
          type="email"
          autoComplete="current-email"
          onChange={handleChange}
        />
        <TextField
          className={classes.inputField}
          id="firstName"
          label="Förnamn"
          variant="standard"
          type="name"
          autoComplete="current-email"
          onChange={handleChange}
        />
        <TextField
          className={classes.inputField}
          id="lastName"
          label="Efternamn"
          variant="standard"
          type="name"
          autoComplete="current-email"
          onChange={handleChange}
        />
        <TextField
          className={classes.inputField}
          id="phoneNumber"
          label="Telefonnummer"
          variant="standard"
          type="phone"
          autoComplete="current-email"
          onChange={handleChange}
        />
        <TextField
          className={classes.inputField}
          id="password"
          label="Lösenord"
          type="password"
          autoComplete="current-password"
          // onBlur={passwordValidation}
          onChange={handleChange}
        />
        <TextField
          className={classes.inputField}
          id="password2"
          label="Lösenord"
          type="password"
          autoComplete="current-password"
          helperText={!passwordMatch ? "Lösenorden matchar inte" : null}
          onChange={passwordValidation}
          onBlur={passwordValidation}
          error={!passwordMatch}
        />
      </Box>
      <Box>
        <Button onClick={sendUser}>Skapa användare➡️</Button>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    width: "15rem",
  },
}));

export default CreateUserForm;
