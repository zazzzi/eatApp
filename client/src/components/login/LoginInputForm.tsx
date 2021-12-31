import {
  Box,
  Button,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Iprops {}

function LoginInputForm(props: Iprops) {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.outerContainer}>
        <TextField
          className={classes.inputField}
          id="emailInput"
          label="E-mail"
          variant="standard"
          type="email"
          autoComplete="current-password"
        />
        <TextField
          className={classes.inputField}
          id="passwordInput"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </Box>
      <Box>
        <Typography variant="body1">Problem med att logga in?</Typography>
        <Button>
          Logga in ➡️
        </Button>
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
