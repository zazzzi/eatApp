import { Box, Button, makeStyles, Theme, Typography } from "@material-ui/core";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import eatAppLogo from "../../assets/logos/eatAppLogo.png";
import qrBtn from "../../assets/img/qrBtn.png";
import { RestaurantTableData } from "../../types/types";
import QrReader from "react-qr-reader";
interface Iprops {
  restaurantId: RestaurantTableData;
}

function Hero({ restaurantId }: Iprops) {
  const classes = useStyles();
  const [incomingScan, setIncomingScan] = useState({ result: "None" });
  const [cameraActive, setCameraActive] = useState(false);
  let navigate = useNavigate();

  const handleScan = (data: any) => {
    if (data) {
      setIncomingScan({
        result: data,
      });
      window.location.replace(data);
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  const activateCamera = () => {
    setCameraActive(true);
  };

  if (!restaurantId) {
    return <>hi</>;
  }

  return (
    <Box className={classes.heroContainer}>
      <a href="/">
        <img className={classes.logo} src={eatAppLogo} alt="eatAppLogo.png" />
      </a>
      <Box className={classes.qrBtnContainer}>
        {cameraActive ? (
          <Box>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "15rem" }}
            />
          </Box>
        ) : (
          <Button onClick={activateCamera} className={classes.ctaBtn}>
            <Box className={classes.ctaTextContainer}>
              <img src={qrBtn} alt="qrCode.png" />
              <Typography variant="body2">
                Klicka här för att scanna en QR-kod!{" "}
              </Typography>
            </Box>
          </Button>
        )}
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
            <Link to="/login">Logga in här!</Link>
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
    marginTop: "1.5rem",
    flexDirection: "column",
  },
  qrBtnLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1.5rem",
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
  ctaBtn: {
    display: "flex",
    flexDirection: "column",
    textTransform: "none",
  },
}));

export default Hero;
