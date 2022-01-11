import { Box, makeStyles, Theme} from "@material-ui/core";
import { useEffect, useState } from "react";
import QrGenerator from "./QrGenerator"

interface Iprops {
 
}

function AdminIndex(props: Iprops) {
  return (
   <Box>
       <QrGenerator/>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default AdminIndex; 