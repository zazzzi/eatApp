import { Box, Link, makeStyles, Theme, Typography} from "@material-ui/core";
import { useEffect, useState } from "react";
import eatAppLogo from "../../assets/logos/eatAppLogo.png"
import LoginInputForm from "./LoginInputForm";
interface Iprops {
 
}

function Login(props: Iprops) {
const classes = useStyles();
  return (
   <Box className={classes.pageContainer}>
     <Box>
		<a href="/">
			<img className={classes.logo} src={eatAppLogo} alt="eatAppLogo.png"/>
		</a>
     </Box>
     <Box className={classes.formContainer}>
       <Typography variant="h2">
         Välkommen
       </Typography>
       <Typography variant="body2">
        Logga in på ditt konto här.
       </Typography>
       <LoginInputForm/>
     </Box>
     <Box>
       <Typography>
         Inget konto?&nbsp;  
         <Link href="/create-user" underline="always">Skapa ett här!</Link>
         
       </Typography>
     </Box>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: "flex",
    width: "100vw",
  },
  pageContainer: {
	height: "100vh",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	alignItems: "center",
	background: "#FEFEFE",
},
	formContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
}
  
}));


export default Login; 