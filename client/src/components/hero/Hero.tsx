import {
  Box,
  Button,
  makeStyles,
  Link,
  Hidden,
  Theme,
  CircularProgress,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import qrBtn from "../../assets/img/qrBtn.png";
import { RestaurantTableData } from "../../types/types";
import QrReader from "react-qr-reader";
import mainBackground from "../../assets/img/front_page_background.png";
import logoStanced from "../../assets/logos/EatApp_stansad.png";
import blobHero from "../../assets/img/blob_hero.png";
import sideImg from "../../assets/img/side_picture.png";
import sideImg0 from "../../assets/img/side-images/side-0.png";
import sideImg1 from "../../assets/img/side-images/side-1.png";
import sideImg2 from "../../assets/img/side-images/side-2.png";
import sideImg3 from "../../assets/img/side-images/side-3.png";
import sideImg4 from "../../assets/img/side-images/side-4.png";
import sideImg5 from "../../assets/img/side-images/side-5.png";
import sideImg6 from "../../assets/img/side-images/side-6.png";
import sideImg7 from "../../assets/img/side-images/side-7.png";
import sideImg8 from "../../assets/img/side-images/side-8.png";
import sideImg9 from "../../assets/img/side-images/side-9.png";

interface Iprops {
  restaurantId: RestaurantTableData;
}

function Hero({ restaurantId }: Iprops) {
  const classes = useStyles();
  const [_, setIncomingScan] = useState({ result: "None" });
  const [cameraActive, setCameraActive] = useState(false);
  const [imgNumb, setImgNumb] = useState(0);
  let navigate = useNavigate();
  const imgArray = [
    sideImg0,
    sideImg1,
    sideImg2,
    sideImg3,
    sideImg4,
    sideImg5,
    sideImg6,
    sideImg7,
    sideImg8,
    sideImg9,
  ];

  const handleScan = (data: any) => {
    if (data) {
      setIncomingScan({
        result: data,
      });
      window.location.replace(data);
    }
  };

  useEffect(() => {
    setImgNumb(Math.floor(Math.random() * 10));
  }, []);

  const handleError = (err: Error) => {
    console.error(err);
  };

  const activateCamera = () => {
    setCameraActive(true);
  };

  if (!restaurantId) {
    return (
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.heroContainer}>
        <Box
          style={{ width: "100%", height: "100%" }}
          display="flex"
          justifyContent="center"
        >
          <Box
            className={classes.blobContainer}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "50rem",
                lg: "50rem",
                xl: "100%",
              },
            }}
          >
            <h1 style={{ margin: 0 }}>
              <a href="/">
                <img className={classes.logo} src={logoStanced} alt="eatApp" />
              </a>
            </h1>
            <Box className={classes.qrBtnContainer}>
              {cameraActive ? (
                <Box>
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    className="qrScanner"
                    style={{
                      width: "8rem",
                      border: "-6px solid rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </Box>
              ) : (
                <Button onClick={activateCamera} className={classes.ctaBtn}>
                  <Box className={classes.ctaTextContainer}>
                    <img src={qrBtn} alt="QR-code" />
                  </Box>
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        <Box className={classes.signUpContainer}></Box>
        <Box className={classes.noAccountOuterContainer}>
          <Box className={classes.noAccountInnerContainer}>
            <p
              style={{
                fontFamily: "Roboto",
                fontSize: "15px",
                fontWeight: 400,
                margin: 0,
                padding: ".2rem",
                color: "#F9F9F9",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "#F9F9F9" }}
                href="/login"
                underline="always"
              >
                Har du ett konto? Logga in här!
              </Link>
            </p>
          </Box>
        </Box>
        <Hidden lgDown>
          <Box className={classes.sideImgContainer}>
            <img
              style={{
                objectFit: "cover",
              }}
              className={classes.sideImgContainer}
              src={sideImg}
              alt=""
            />
          </Box>
        </Hidden>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  logo: {
    display: "flex",
    width: "15rem",
    padding: "0 0 1rem 0",
  },
  qrBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "column",
    marginBottom: "3rem",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${mainBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
    boxShadow: "-20px 0px 17px rgba(0, 0, 0, 0.03)",
  },
  noAccountOuterContainer: {
    width: "100%",
    display: "flex",
    // alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    left: "50%",
    [theme.breakpoints.up("xl")]: {
      left: "25%",
    },
    bottom: "-18px",
    transform: "translate(-50%, -50%)",
    margin: "0 auto",
  },
  noAccountInnerContainer: {
    backgroundColor: "#C7C0AE",
    backgroundPosition: "center",
    backgroundSize: "fill",
    backgroundRepeat: "no-repeat",
    border: "1px solid transparent",
    padding: "0.3rem .8rem",
    borderRadius: "18px 18px 0 0",
  },
  ctaBtn: {
    display: "flex",
    flexDirection: "column",
    textTransform: "none",
  },
  blobContainer: {
    height: "100%",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    backgroundImage: `url(${blobHero})`,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    backgroundPosition: "center",
    [theme.breakpoints.down("xs")]: {
      backgroundSize: "contain",
    },
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  qrScanner: {
    border: "0px solid",
  },
  sideImgContainer: {
    width: "100%",
    height: "100%",
    borderRadius: "150px 0 0 150px",
    boxShadow: "-20px 0px 20px 0px rgb(0 0 0 / 3%);",
  },
  backgroundColor: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${mainBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  },
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default Hero;
