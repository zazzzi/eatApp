import { Box, makeStyles, Theme, Typography} from "@material-ui/core";
import { useEffect, useState } from "react";
import eatAppLogo from "../../assets/logos/eatAppLogo.png"
import LoginInputForm from "./LoginInputForm";
interface Iprops {
 
}

function Login(props: Iprops) {
const classes = useStyles();
  return (
   <Box>
     <Box>
       <img className={classes.logo} src={eatAppLogo} alt="eatAppLogo.png"/>
     </Box>
     <Box>
       <Typography variant="h2">
         Välkommen
       </Typography>
       <Typography variant="body2">
        Logga in på ditt konto här.
       </Typography>
     </Box>
     <Box>
       <LoginInputForm/>
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


export default Login; 