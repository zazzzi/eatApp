import { Box, CircularProgress, makeStyles, Theme, Typography} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { RestaurantTableData } from "../../types/types";
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";
import {MenuContext} from "../../context/MenusContext";

interface Iprops {
  table: any
  userInfo: any
}

function QrGenerator({table, userInfo}: Iprops) {
  const classes = useStyles(); 
  const { id } = useParams();
  const {restaurantData, fetchDatabaseWithId} = useContext(MenuContext)

  useEffect(()=> {
    if(!userInfo) return
    fetchDatabaseWithId(userInfo.rID)
  },[userInfo])

  if(!userInfo || !restaurantData){
    return (
    <Box className={classes.loader}>
      <CircularProgress/>
    </Box>
  )}

  if(!restaurantData.tables.includes(id)){
    return (
      <Box className={classes.loader}>
          <Typography>Table does not exist</Typography>
          <Link to={`/tables`}>
            <Typography>Back</Typography>
          </Link>
      </Box>
    )
  }

  console.log(!restaurantData.tables.includes(id))

  const url = `192.168.0.15:3000/menu/${userInfo.rID}?table=${!table ? id : table}`

  return (
   <Box className={classes.padding}>
     <Typography variant="h2">Bord {!table ? id : table}</Typography>
     <QRCode value={url} />
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  padding: {
    padding: '2rem'
  }, 
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
}));


export default QrGenerator; 