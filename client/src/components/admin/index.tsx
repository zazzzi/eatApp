import { Box, makeStyles, Theme, Typography} from "@material-ui/core";
import SettingsApplicationsRoundedIcon from "@material-ui/icons/SettingsApplicationsRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { useEffect, useState } from "react";
import { RestaurantTableData } from "../../types/types";
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

interface Iprops {
  userInfo: any
}

function AdminIndex({userInfo}: Iprops) {
  const [restaurantData, setRestaurantdata] = useState<any>(null);

  //fetch the restaurant from the userData id instead when logged in as an owner. 
 /*  useEffect(() => {
    if (!restaurantId.restaurantId) return;
    const getRestaurantData = async () => {
      const docRef = doc(db, "restaurants", `${restaurantId.restaurantId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRestaurantdata(docSnap.data());
      } else {
        console.log("No such restaurant!");
      }
    };
    getRestaurantData();
  }, [restaurantId]); */


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
      <Box
        className="classes.settingsListItem"
        display="flex"
        justifyContent="space-between"
        p={1}
      >
        <Typography variant="h5">Bord</Typography>
        <ArrowForwardIosRoundedIcon />
        <TablesEditor/>
      </Box>
    </Box>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default AdminIndex; 