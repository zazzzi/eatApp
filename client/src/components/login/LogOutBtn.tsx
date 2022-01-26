import { Box, Button, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

interface Iprops {}

function LogOutBtn(props: Iprops) {
  const classes = useStyles();

  async function logOut() {
    await auth.signOut();
  }

  return (
    <Box style={{ margin: "1.5rem 0 0 0" }}>
      <Button
        size="small"
        color="secondary"
        variant="contained"
        onClick={logOut}
      >
        <a className={classes.logOutText} href="/login">
          Logga ut
        </a>
      </Button>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  logOutText: {
    fontSize: "18px",
    color: "#FFF",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    height: "2rem",
    padding: "0 2rem",
    textTransform: "none",
  },
}));

export default LogOutBtn;
