import { Box, makeStyles, Theme} from "@material-ui/core";
import { useEffect, useState } from "react";
import { RestaurantTableData } from "../../types/types";
import QrGenerator from "./QrGenerator"

interface Iprops {
  restaurantId: RestaurantTableData
}

function TablesEditor({restaurantId}: Iprops) {
  return (
   <Box>
       <QrGenerator restaurantId={restaurantId}/>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default TablesEditor; 