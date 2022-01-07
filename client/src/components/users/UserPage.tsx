import { Box, makeStyles, Theme, Typography} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../../context/UsersContext";
import { User } from "../../types/types";
import LogOutBtn from "../login/LogOutBtn";

interface Iprops {
 
}

function UserPage(props: Iprops) {
  const { loggedIn, userID, userInformation } = useContext(UserAuthContext);

  return (
   <Box>
     <Box>
       <Typography>
         Välkommen {userInformation.firstName} {userInformation.lastName}
       </Typography>
     </Box>
     <Box>
       Ändra din kontoinformation här: 
     </Box>
     
       <LogOutBtn/>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({}));


export default UserPage; 