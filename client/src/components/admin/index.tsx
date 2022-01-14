import { Box, Button, makeStyles, Theme, Typography } from "@material-ui/core";
import SettingsApplicationsRoundedIcon from "@material-ui/icons/SettingsApplicationsRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { useContext, useState } from "react";
import TablesEditor from "./Tables";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { SliderPicker } from "react-color";

import { Link } from "react-router-dom";
import { MenuContext } from "../../context/MenusContext";

interface Iprops {
  userInfo: any;
  setColor?(color: string): void;
}

function AdminIndex(props: Iprops) {
  const [colorSliderOpen, setColorSliderOpen] = useState(false);
  const [chosenColor, setChosenColor] = useState<string>("");
  const { restaurantData, sendUrlParam } = useContext(MenuContext);
  const [startingColor, setStartingColor] = useState({
    background: "#333",
  });

  const handleOpen = () => {
    if (!colorSliderOpen) {
      setColorSliderOpen(true);
    } else {
      setColorSliderOpen(false);
    }
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const handleChange = (hex: any) => {
    if (props.setColor) {
      props.setColor(hex.hex);
      setStartingColor({
        background: hex.hex,
      });
    }
  };

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
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography variant="h5">Färgtema</Typography>
            <Button onClick={handleOpen}>
              <ArrowForwardIosRoundedIcon />
            </Button>
          </Box>

          {/* TODO: Save chosen color in database */}
          {colorSliderOpen ? (
            <Box mt={2} p={2}>
              <SliderPicker
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
          <ArrowForwardIosRoundedIcon />
        </Box>
        <Box>
          <Link to="/tables">
            <Box
              className="classes.settingsListItem"
              display="flex"
              justifyContent="space-between"
              p={1}
            >
              <Typography variant="h5">Bord</Typography>
              <ArrowForwardIosRoundedIcon />
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));

export default AdminIndex;
