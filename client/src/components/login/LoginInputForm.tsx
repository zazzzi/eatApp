import {
  Box,
  Button,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React, {  useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { IncomingUser} from "../../types/types";
interface Iprops {
  loginDataCallback(user: IncomingUser): void;
  incorrectInfo: boolean;
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
            error={props.incorrectInfo}
            helperText={props.incorrectInfo ? "Fel epost eller lösenord" : null}
            onChange={handleChange}
          />
          <Box className={classes.loginHelperContainer}>
            <a className={classes.linkStyle} href="/reset-password">
              <p className={classes.problems}>Problem med att logga in?</p>
            </a>
          </Box>
          <Box className={classes.loginBtnContainer}>
            <Button className={classes.buttonStyling} variant="contained" endIcon={<SendIcon />} size="large" type="submit">
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
    backgroundColor: "#F9F9F9",
    borderRadius: "8px"
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
    margin: "2rem",
    padding: "0 0 2rem 0"
  },
  problems: {
    fontFamily: "Roboto",
    fontSize: "12px",
    fontWeight: 500,
    margin: ".2rem 0 0 0",
    padding: "0 .5rem 0 0"
    },
    linkStyle: {
      textDecoration: "none",
      color: "#F9F9F9"
    },
    buttonStyling: {
      display: "flex",
      alignItems: "center",
      height: "2rem",
      padding: "0 .5rem",
      textTransform: "none"
    },
}));

export default LoginInputForm;
