import { Box, Button, makeStyles, Theme, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import logo from "../../assets/logos/eatAppLogo.png";
import qrBtn from "../../assets/img/qrBtn.png";

interface Iprops {}

function Hero(props: Iprops) {
  const classes = useStyles();

  return (
    <Box>
      <img className={classes.logo} src={logo} alt="eatApp.png" />
      <Box className={classes.qrBtnContainer}>
        <Box>
          <Button>
            <img src={qrBtn} alt="qrCode.png" />
          </Button>
        </Box>
        <Box className={classes.ctaTextContainer}>
          <Typography variant="body1">Scanna restaurangens QR-kod för att komma igång.</Typography>
        </Box>
      </Box>
      <Box>
        
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: "flex",
    width: "100vw",
    marginTop: "100px",
  },
  qrBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    marginTop: "4rem",
    flexDirection: "column"
  },
  ctaTextContainer: {
    marginTop: "1rem",
    maxWidth: "14rem",
    textAlign: "center"
  }
}));

export default Hero;
