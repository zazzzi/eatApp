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
import { IncomingUser } from "../../types/types";

interface Iprops {}

function LoginInputForm(props: Iprops) {
  const classes = useStyles();
  const [incomingUser, setIncomingUser] = useState<IncomingUser>({
    email: "",
    password: ""
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIncomingUser({
      ...incomingUser,
      [event.target.id] : event.target.value,
    })
  }

  function sendUser(){
    //for sending login-request 
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
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
        />
      </Box>
      <Box>
        <Typography variant="body1">Problem med att logga in?</Typography>
        <Button onClick={sendUser}>Logga in ➡️</Button>
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

export default LoginInputForm;
