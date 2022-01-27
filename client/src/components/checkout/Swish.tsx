import { Box, makeStyles, TextField, Theme } from "@material-ui/core";
import { useState } from "react";
import swish from "../../assets/img/swish.png";
import { User } from "../../types/types";
import LoadingButton from "@mui/lab/LoadingButton";

interface Iprops {
  paymentResponse: (status: string | undefined, response?: any) => void;
  priceTotal: number;
  userInformation: User;
}

interface Error {
  helperText: string;
  error: boolean;
}

function SwishPayment({
  paymentResponse,
  priceTotal,
  userInformation,
}: Iprops) {
  const classes = useStyles();
  const [number, setNumber] = useState<string>(
    userInformation ? String(userInformation.phoneNumber) : ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>({
    helperText: " ",
    error: false
  })


  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.length === 10){
      setError({
        helperText: "",
        error: false
      })
      setNumber(event.target.value);
    } else {
      setError({
        helperText: "Ogiltig telefon nummer",
        error: true
      })
    }
    
  };

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    const payment = {
      payerAlias: number,
      amount: priceTotal,
      message: `Order to table`,
      paymentType: "swish",
      body: {
        nothing: "here",
      },
    };

    paymentResponse("Successful swish payment", payment);
    setLoading(true);

    /* fetch(
      "https://us-central1-eatapp-5f84b.cloudfunctions.net/app/api/paymentrequests",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      }
    )
      .then(function (response) {
        if (response.status != 201) {
          console.log("Request failure: " + response.statusText);
          return;
        }
        return response.json();
      })
      .then(function (json) {
        if (json) {
          const identifier = json["id"];
          paymentResponse("Successful swish payment", json);
        }
      })
      .catch(function (error) {
        paymentResponse("Request failure: " + error);
      }); */
  };

  return (
    <Box height="100%" className={classes.height}>
      <Box className={classes.padding}>
        <Box className={classes.swishLogo}>
          <img className={classes.img} src={swish} alt="Swish logo" />
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
              value={userInformation ? number : null}
              error={error.error}
              helperText={error.helperText}
            />
            <LoadingButton
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
              disabled={number === "" || error.error}
            >
              Betala
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  height: {
    height: "100%",
  },
  img: {
    width: "10rem",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  padding: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "10rem",
  },
  swishLogo: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default SwishPayment;
