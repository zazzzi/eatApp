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
   <Box>
      <Box className={classes.padding}>
        <img className={classes.img} src={swish}/>
        <form onSubmit={handleSubmit}>
          <TextField
            type="number"
            label="Swish number"
            id="margin-normal"
            name="number"
            className={classes.textField}
            onChange={handleInput}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Pay 
          </Button>
        </form>
      </Box>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    height: "4rem"
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
  }
}));


export default SwishPayment; 