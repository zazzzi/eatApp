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
        <Link to={"login"}>
          <Typography variant="body1">Logga in</Typography>
        </Link>
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
}));

export default Hero;
