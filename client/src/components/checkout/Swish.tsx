import { Box, Button, FormControl, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import swish from "../../assets/img/swish.png";

interface Iprops {
  paymentResponse: (status: string | undefined, response?: any) => void
  priceTotal: number
}

function SwishPayment({paymentResponse, priceTotal}: Iprops) {
  const classes = useStyles();
  const [number, setNumber] = useState<any>(0);


  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value)
  }

 
  const handleSubmit = async (evt: any) => {
    evt.preventDefault()
    const payment = {
      payerAlias: number,
      amount: priceTotal,
      message: "put restaurant order and table here??",
    }

    fetch("api/paymentrequests", {  
      method: "POST",
      credentials: "include",
			headers: {
				'Content-Type': 'application/json'
			},  
			body: JSON.stringify(payment)
		})
		.then(function(response) {
			if (response.status != 201) {
				console.log("Request failure: " + response.statusText)
				return
			}
			return response.json();
		})
		.then(function(json) {
			if (json) {
        const identifier = json["id"];
        paymentResponse("Successful swish payment", json);
			}

		})
		.catch(function (error) {  
      paymentResponse("Request failure: " + error)
		});

  }

  return (
    //if bad response from number make swish box red
   <Box 
    height="100%"
    className={classes.height}
   >
      <Box className={classes.padding}>
        <Box className={classes.swishLogo}>
          <img className={classes.img} src={swish}/>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box className={classes.container}>
            <TextField
              type="number"
              label="Swish number"
              id="margin-normal"
              required
              fullWidth
              name="number"
              InputLabelProps={{ shrink: true }}
              className={classes.textField}
              onChange={handleInput}
            />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
            >
              Betala
            </Button>
          </Box>
        </form>
      </Box>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  height: {
    height: "100%"
  },
  img: {
    width: "10rem"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  padding: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: '2rem'
  },
  container: {
    display: "flex",
    justifyContent: 'center',
    alignItems: "center"
  },
  button: {
    width: "10rem"
  },
  swishLogo: {
    display: "flex",
    justifyContent: "center",
  }
}));


export default SwishPayment; 