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
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import AddIcon from "@material-ui/icons/Add";

interface Iprops {
  userDataCallback(user: User): void;
}

function CreateUserForm(props: Iprops) {
  const classes = useStyles();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean>();

  const [userToCreate, setUserToCreate] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    password: "",
    role: "customer"
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

  function handleChange(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    updateUserObject(event.target.id, event.target.value);
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    props.userDataCallback(userToCreate);
  }

  function passwordValidation(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    setConfirmPassword(event.target.value);
    if (confirmPassword === userToCreate.password) {
      console.log("True");
    }
  }

  return (
    <Box>
      <form className={classes.formStyling} onSubmit={handleSubmit}>
        <TextField
          className={classes.inputField}
          id="email"
          label="Epostadress"
          type="email"
          autoComplete="current-email"
          onBlur={handleChange}
          variant="outlined"
        />
        <TextField
          className={classes.inputField}
          id="firstName"
          label="Förnamn"
          variant="outlined"
          type="name"
          autoComplete="current-email"
          onBlur={handleChange}
        />
        <TextField
          className={classes.inputField}
          id="lastName"
          label="Efternamn"
          variant="outlined"
          type="name"
          autoComplete="current-email"
          onBlur={handleChange}
        />
        <TextField
          className={classes.inputField}
          id="phoneNumber"
          label="Telefonnummer"
          variant="outlined"
          type="phone"
          autoComplete="current-email"
          onBlur={handleChange}
        />
        <TextField
          className={classes.inputField}
          id="password"
          variant="outlined"
          label="Lösenord"
          type="password"
          autoComplete="current-password"
          onChange={passwordValidation}
          onBlur={handleChange}
        />
        <TextField
          className={classes.inputField}
          id="password2"
          variant="outlined"
          label="Lösenord"
          type="password"
          autoComplete="current-password"
          helperText={!passwordMatch ? "Lösenorden matchar inte" : null}
          onChange={passwordValidation}
          onBlur={passwordValidation}
          error={!passwordMatch}
        />
        <Box className={classes.submitBtnStyling}>
          <Button variant="contained" endIcon={<AddIcon />} type="submit">Skapa användare</Button>
        </Box>
      </form>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  formStyling: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    width: "15rem",
    margin: "0.5rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  submitBtnStyling: {
    marginTop: "1rem"
  }
}));

export default CreateUserForm;
