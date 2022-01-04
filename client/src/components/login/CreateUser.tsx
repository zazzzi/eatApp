import { Box, Link, makeStyles, Theme, Typography} from "@material-ui/core";
import { useEffect, useState } from "react";
import eatAppLogo from "../../assets/logos/eatAppLogo.png"
import CreateUserForm from "./CreateUserForm";
import LoginInputForm from "./LoginInputForm";

interface Iprops {
 
}

function CreateUser(props: Iprops) {
const classes = useStyles();
  return (
   <Box>
     <Box>
       <img className={classes.logo} src={eatAppLogo} alt="eatAppLogo.png"/>
     </Box>
     <Box>
       <Typography variant="h2">
         Skapa nytt konto
       </Typography>
       <Typography variant="body2">
        Fyll i dina uppgifter här.
       </Typography>
     </Box>
     <Box>
         <CreateUserForm/>
     </Box>
   
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: "flex",
    width: "100vw",
    marginTop: "100px",
  },
  
}));


export default CreateUser; 