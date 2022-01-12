import { Box, makeStyles, Theme} from "@material-ui/core";
import { useEffect, useState } from "react";
import { RestaurantTableData } from "../../types/types";
import QRCode from "react-qr-code";

interface Iprops {
  table: any
}

function QrGenerator({table}: Iprops) {

  console.log("hello")

  return (
   <Box>
     <QRCode value={String(table)} />
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default QrGenerator; 