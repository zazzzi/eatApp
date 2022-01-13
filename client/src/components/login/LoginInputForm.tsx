import {
  Box,
  Button,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { IncomingUser, User } from "../../types/types";

interface Iprops {
  loginDataCallback(user: IncomingUser): void;
}

function LoginInputForm(props: Iprops) {
  const classes = useStyles();
  const [incomingUser, setIncomingUser] = useState<IncomingUser>({
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIncomingUser({
      ...incomingUser,
      [event.target.id]: event.target.value,
    });
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    props.loginDataCallback(incomingUser);
  }

  return (
    <Box>
      <Box>
        <form className={classes.formStyling} onSubmit={handleSubmit}>
          <TextField
            className={classes.inputField}
            id="email"
            label="E-mail"
            variant="outlined"
            size="small"
            type="email"
            autoComplete="current-email"
            onChange={handleChange}
          />
          <TextField
            className={classes.inputField}
            id="password"
            label="Password"
            size="small"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Box className={classes.loginHelperContainer}>
            <a href="/reset-password">
              <Typography variant="body2">Problem med att logga in?</Typography>
            </a>
          </Box>
          <Box className={classes.loginBtnContainer}>
            <Button endIcon={<SendIcon />} size="large" type="submit">
              Logga in{" "}
            </Button>
          </Box>
        </form>
      </Box>
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
    marginTop: "1rem",
  },
  loginHelperContainer: {
    width: "15rem",
    textAlign: "end",
    marginTop: "0.3rem",
  },
  loginBtnContainer: {
    display: "flex",
    justifyContent: "end",
    width: "15rem",
    marginTop: "4rem",
  },
}));

export default LoginInputForm;
