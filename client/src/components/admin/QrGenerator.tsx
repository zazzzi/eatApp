import { Box, makeStyles, Theme} from "@material-ui/core";
import { useEffect, useState } from "react";
import { RestaurantTableData } from "../../types/types";
import QRCode from "react-qr-code";

interface Iprops {
  restaurantId: RestaurantTableData
}

function QrGenerator({restaurantId}: Iprops) {
  console.log(restaurantId)
  return (
   <Box>
     <QRCode value={`http://localhost:3000/menu/${restaurantId.restaurantId}/${restaurantId.table}`} />
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default QrGenerator; 