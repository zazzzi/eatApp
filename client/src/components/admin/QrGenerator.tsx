import { Box, makeStyles, Theme} from "@material-ui/core";
import { useEffect, useState } from "react";
import { RestaurantTableData } from "../../types/types";
import QRCode from "react-qr-code";

interface Iprops {
  table: any
  userInfo: any
}

function QrGenerator({table, userInfo}: Iprops) {
  const classes = useStyles();
  const url = `192.168.0.15:3000/menu/${userInfo.rID}?table=${table}`

  return (
   <Box className={classes.padding}>
     <QRCode value={url} />
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  padding: {
    padding: '2rem'
  }
}));


export default QrGenerator; 