import {
  Box,
  Button,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { useContext, useEffect, useState } from "react";
import { SliderPicker, TwitterPicker } from "react-color";
import FileUploadField from "../restaurantMenu/FileUploadField";
import { Link } from "react-router-dom";
import { MenuContext } from "../../context/MenusContext";
import { User } from "../../types/types";

interface Iprops {
  userInfo: User;
  setColor?: any;
}

function AdminIndex(props: Iprops) {
  const classes = useStyles();
  const [colorSliderOpen, setColorSliderOpen] = useState(false);
  const [uploadBackgroundOpen, setUploadBackgroundOpen] = useState(false);
  const [restaurantBackground, setRestaurantBackground] = useState<any>({});
  const [imageIsUploaded, setImageIsUploaded] = useState<boolean>(false);
  const [chosenColor, setChosenColor] = useState<string>("#79D2BE");
  const {
    restaurantData,
    updateRestaurantColor,
    updateRestaurantImg,
  } = useContext(MenuContext);
  const [startingColor, setStartingColor] = useState({
    background: props.setColor,
  });

  const handleOpen = () => {
    if (!colorSliderOpen) {
      setColorSliderOpen(true);
    } else {
      setColorSliderOpen(false);
    }
  };

  const handleBackgroundOpen = () => {
    if (!uploadBackgroundOpen) {
      setUploadBackgroundOpen(true);
    } else {
      setUploadBackgroundOpen(false);
    }
  };

  const handleChange = (hex: { hex: string; }) => {
    if (props.setColor) {
      props.setColor(hex.hex);
      setStartingColor({
        background: hex.hex,
      });
    }
    updateRestaurantColor(startingColor);
  };

  const setURL = (url: string) => {
    setRestaurantBackground({
      img: url,
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    updateRestaurantImg(restaurantBackground.img);
    setTimeout(function () {
      window.location.reload();
    }, 1000);
    console.log(restaurantBackground.img);
  };

  useEffect(() => {
    if (restaurantBackground.img) {
      setImageIsUploaded(true);
    } else setImageIsUploaded(false);
    console.log(imageIsUploaded);
  }, [restaurantBackground]);

  return (
    <Box>
      <Box p={3} className="classes.settingsContainer">
        <Box
          className="classes.settingsListItem"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p={1}
        >
          <Box mb={5} display="flex" justifyContent="center">
            <Typography variant="h3">Inställningar</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography variant="h5">Färgtema</Typography>
            <Button onClick={handleOpen}>
              {colorSliderOpen ? (
                <ArrowForwardIosRoundedIcon
                  style={{ transform: `rotate(${90}deg)` }}
                />
              ) : (
                <ArrowForwardIosRoundedIcon />
              )}
            </Button>
          </Box>

          {colorSliderOpen ? (
            <Box mt={2} p={2}>
              <TwitterPicker
                color={startingColor.background}
                onChange={handleChange}
              />
            </Box>
          ) : null}
        </Box>
        <Box
          className="classes.settingsListItem"
          display="flex"
          justifyContent="space-between"
          p={1}
        >
          <Typography variant="h5">Bakgrundsbild</Typography>
          <Button onClick={handleBackgroundOpen}>
            {uploadBackgroundOpen ? (
              <ArrowForwardIosRoundedIcon
                style={{ transform: `rotate(${90}deg)` }}
              />
            ) : (
              <ArrowForwardIosRoundedIcon />
            )}
          </Button>
        </Box>
        {uploadBackgroundOpen ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={classes.uploadedImageContainer}
          >
            <Box>
              <img
                className={classes.backgroundImage}
                src={
                  imageIsUploaded
                    ? restaurantBackground.img
                    : restaurantData.img
                }
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <form onSubmit={handleSubmit} className={classes.uploadForm}>
                <FileUploadField setUrl={setURL} rId={restaurantData.rID} />
                <Button type="submit" variant="outlined" color="primary">
                  Spara
                </Button>
              </form>
            </Box>
          </Box>
        ) : null}
        <Box>
          <Link style={{ textDecoration: "none" }} to="/tables">
            <Box
              className="classes.settingsListItem"
              display="flex"
              justifyContent="space-between"
              p={1}
            >
              <Typography variant="h5">Bord</Typography>
              <Button>
                <ArrowForwardIosRoundedIcon />
              </Button>
            </Box>
          </Link>
        </Box>
        <Box>
          <Link style={{ textDecoration: "none" }} to="/orders">
            <Box
              className="classes.settingsListItem"
              display="flex"
              justifyContent="space-between"
              p={1}
            >
              <Typography variant="h5">Orders</Typography>
              <Button>
                <ArrowForwardIosRoundedIcon />
              </Button>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  uploadedImageContainer: {
    width: "100%",
  },
  uploadForm: {
    display: "flex",
    flexDirection: "column",
  },
  backgroundImage: {
    width: "15rem",
  },
}));

export default AdminIndex;
