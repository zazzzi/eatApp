import {
  Box,
  Button,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { User } from "../../types/types";

interface Iprops {}

function CreateUserForm(props: Iprops) {
  const classes = useStyles();

  const [userToCreate, setUserToCreate] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    role: "user",
    password: "",  
  });



  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserToCreate({
      ...userToCreate,
      [event.target.id]: event.target.value,
    });
  }

  function sendUser() {
    console.log('====================================');
    console.log(userToCreate);
    console.log('====================================');
  }

  function passwordValidation(){
      //123
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
          onChange={handleChange}
        /> 
        <TextField
        className={classes.inputField}
        id="password2"
        disabled={true}
        label="Lösenord"
        type="password"
        autoComplete="current-password"
        onChange={handleChange}
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
