import { Box, Button, makeStyles, Theme, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import eatAppLogo from "../../assets/logos/eatAppLogo.png";
import qrBtn from "../../assets/img/qrBtn.png";
import { RestaurantTableData } from "../../types/types";

interface Iprops {
  restaurantId: RestaurantTableData;
}

function Hero({ restaurantId }: Iprops) {
  const classes = useStyles();

  if (!restaurantId) {
    return <>hi</>;
  }

  return (
    <Box className={classes.heroContainer}>
      <a href="/">
        <img className={classes.logo} src={eatAppLogo} alt="eatAppLogo.png" />
      </a>
      <Box className={classes.qrBtnContainer}>
        <Box>
          <Button>
            <img src={qrBtn} alt="qrCode.png" />
          </Button>
        </Box>
        <Box className={classes.ctaTextContainer}>
          <Typography variant="body1">
            Scanna restaurangens QR-kod för att komma igång.
          </Typography>
        </Box>
      </Box>
      <Box className={classes.signUpContainer}>
        <Link to="/checkout">
          <Typography variant="body1">cart</Typography>
        </Link>
        <Link
          to={`menu/${restaurantId.restaurantId}?table=${restaurantId.table}`}
        >
          <Typography variant="body1">Menu</Typography>
        </Link>
        <Link to="/admin">
          <Typography variant="body1">Admin</Typography>
        </Link>
      </Box>
      <Box className={classes.noAccountOuterContainer}>
        <Box className={classes.noAccountInnerContainer}>
          <Typography>
            Har du ett konto? &nbsp;
            <Link to="/login">
              Logga in här!
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: "flex",
    width: "100%",
  },
  qrBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: "4rem",
    flexDirection: "column",
  },
  ctaTextContainer: {
    marginTop: "1rem",
    maxWidth: "14rem",
    textAlign: "center",
  },
  signUpContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
  },
  heroContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    background: "linear-gradient(to right, #83a4d4, #b6fbff)",
  },
  noAccountOuterContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    left: "50%",
    bottom: "20px",
    transform: "translate(-50%, -50%)",
    margin: "0 auto",
  },
  noAccountInnerContainer: {
    border: "1px solid grey",
    padding: "0.3rem .8rem",
    borderRadius: "10px",
  },
}));

export default Hero;
