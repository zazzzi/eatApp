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
   <Box className={classes.registerPageContainer}>
     <Box mt={2}>
		 <a href="/">
       		<img className={classes.logo} src={eatAppLogo} alt="eatAppLogo.png"/>
		 </a>
     </Box>
     <Box mt={2} className={classes.titleContainer}>
       <Typography variant="h5">
         Skapa nytt konto
       </Typography>
       <Typography variant="body2">
        Fyll i dina uppgifter här.
       </Typography>
         <CreateUserForm/>
     </Box>
    
   
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: "flex",
    width: "100vw",
  },
  titleContainer: {
	  display: "flex",
	  flexDirection: "column",
	  alignItems: "center",
	  justifyContent: "center",
  },
  registerPageContainer: {
	  background: "#FEFEFE",
	  height: "100vh",
	  display: "flex",
	  flexDirection: "column",
	  justifyContent: "space-around",
	  alignItems: "center",
  }
  
}));


export default CreateUser; 