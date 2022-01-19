import { Box, Button, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

interface Iprops {}

function LogOutBtn(props: Iprops) {
  const classes = useStyles();

  async function logOut() {
    await auth.signOut().then(() => {
      console.log("User logged out");
    });
  }

  return (
    <Box>
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
    color: "#FFF",
    textDecoration: "none",
  },
}));

export default LogOutBtn;
