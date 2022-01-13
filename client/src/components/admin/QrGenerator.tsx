import { Box, Button, CircularProgress, makeStyles, Theme, Typography} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { RestaurantTableData } from "../../types/types";
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";
import {MenuContext} from "../../context/MenusContext";
import DeleteIcon from '@material-ui/icons/Delete';
import eatAppLogo from "../../assets/logos/eatAppLogo.png"

interface Iprops {
  table: any
  userInfo: any
}

function QrGenerator({table, userInfo}: Iprops) {
  const classes = useStyles(); 
  const { id } = useParams();
  const {restaurantData, fetchDatabaseWithId} = useContext(MenuContext)
  console.log(restaurantData)

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

  const url = `192.168.0.15:3000/menu/${userInfo.rID}?table=${!table ? id : table}`

  return (
   <Box className={classes.padding}>
     <Box className={classes.qrContainer}>
      <Typography className={classes.h} variant="h5">{restaurantData.restaurantName}: bord {!table ? id : table}</Typography>
      <QRCode value={url} />
      <img className={classes.logo}src={eatAppLogo}/>
     </Box>
     <Box className={classes.buttonGroup}>
     <Link to={`/tables`}>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
      >Back</Button>
     </Link>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
        ><DeleteIcon/>Radera</Button>
     </Box>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  h: {
    padding: '0.5rem'
  },
  padding: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100vh",
    padding: '2rem',
    flexDirection: "column"
  }, 
  paddingButtonContent: {
    padding: '0rem 0.5rem 0rem 0.5rem'
  },
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }, 
  button: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "8rem",
    margin: '1rem'
  }, 
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  logo: {
    padding: "0.8rem",
    width: '60%'
  }, 
  qrContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column"
  }
}));


export default QrGenerator; 