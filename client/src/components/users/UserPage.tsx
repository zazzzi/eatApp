import { Box, makeStyles, Theme} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../../context/UsersContext";
import LogOutBtn from "../login/LogOutBtn";

interface Iprops {
 
}

function UserPage(props: Iprops) {
  const { loggedIn, userID, checkForRestaurantAuth } = useContext(UserAuthContext);




  return (
   <Box>
       lololo
       {userID}
       <LogOutBtn/>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default UserPage; 