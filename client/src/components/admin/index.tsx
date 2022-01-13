import { Box, makeStyles, Theme, Typography} from "@material-ui/core";
import SettingsApplicationsRoundedIcon from "@material-ui/icons/SettingsApplicationsRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { useContext } from "react";
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

import {
  Link,
} from "react-router-dom";

interface Iprops {
  userInfo: any
}

function AdminIndex({userInfo}: Iprops) {

  return (
   <Box>
     <Box p={3} className="classes.settingsContainer">
      <Box
        className="classes.settingsListItem"
        display="flex"
        justifyContent="space-between"
        p={1}
      >
        <Typography variant="h5">Färgtema</Typography>
        <ArrowForwardIosRoundedIcon />
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