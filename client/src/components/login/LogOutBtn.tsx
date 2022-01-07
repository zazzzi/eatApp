import { Box, Button, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

interface Iprops {}

function LogOutBtn(props: Iprops) {
  async function logOut() {
    await auth.signOut().then(() => {
      console.log("User logged out");
    });
  }

  return (
    <Box>
      <Button onClick={logOut}>
        <a href="/login">Logga ut</a>
      </Button>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));

export default LogOutBtn;
