import { Box, makeStyles, Theme} from "@material-ui/core";
import { useEffect, useState } from "react";
import { RestaurantTableData } from "../../types/types";
import QRCode from "react-qr-code";

interface Iprops {
  /* restaurantId: RestaurantTableData */
}

function QrGenerator(/* {restaurantId}: Iprops */) {
  return (
   <Box>
     <QRCode value={"hello"} />
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default QrGenerator; 