import { Box, makeStyles, Theme} from "@material-ui/core";
import { useEffect, useState } from "react";
import { RestaurantTableData } from "../../types/types";
import QRCode from "react-qr-code";

interface Iprops {
  table: number
}

function QrGenerator({table}: Iprops) {
  return (
   <Box>
     {/* <QRCode value={String(table)} /> */}
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default QrGenerator; 