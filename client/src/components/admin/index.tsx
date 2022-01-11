import { Box, makeStyles, Theme} from "@material-ui/core";
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
  restaurantId: RestaurantTableData
}

function AdminIndex({restaurantId}: Iprops) {
  const [restaurantData, setRestaurantdata] = useState<any>(null);
  console.log(restaurantData)

  //fetch the restaurant from the userData id instead when logged in as an owner. 
  useEffect(() => {
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
  }, [restaurantId]);


  return (
   <Box>
      <TablesEditor restaurantId={restaurantId}/>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default AdminIndex; 