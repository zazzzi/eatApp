import { Box, FormControl, FormHelperText, Input, InputLabel, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import { useEffect, useState } from "react";
import mastercard from "../../assets/img/mastercard.png"

interface Iprops {
 
}


function CardPayment(props: Iprops) {
  const [fieldErr, setFieldErr] = useState<string[]>([]);
  const classes = useStyles();

 


  return (
    <Box className={classes.height}>
    <Typography variant="h5" gutterBottom component="div" className={classes.center}>
       Kort
    </Typography>
    <Box className={classes.boxContainer}>
     <Box>
       <img className={classes.img} src={mastercard}/>
     </Box>
     <Box>
       <TextField
       />
       <TextField
       label="Card"
       />
       <TextField
       label="Date"
       />
       <TextField
       label="CVC"
       />
     </Box>
    </Box>
  </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  center: { 
    paddingLeft: "2rem",
    paddingTop: "1rem"
  },
  height: {
    height: "85vh"
  },
  boxContainer: {
    flexWrap: "wrap",
    padding: "3rem 2rem 3rem 2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  img: {
    height: "4rem"
  }
}));


export default CardPayment; 