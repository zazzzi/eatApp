import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import mastercard from "../../assets/img/mastercard.png";
import swish from "../../assets/img/swish.png";

interface IProps {
  paymentMethod: (method: string) => void;
}

function PaymentMethod({ paymentMethod }: IProps) {
  const classes = useStyles();

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        className={classes.center}
      >
        Betalsätt
      </Typography>
      <Box className={classes.boxContainer}>
        <Box className={classes.boxStyle} onClick={() => paymentMethod("card")}>
          <img className={classes.img} src={mastercard} alt="Mastercard logo" />
        </Box>
        <Box
          className={classes.boxStyle}
          onClick={() => paymentMethod("swish")}
        >
          <img className={classes.img} src={swish} alt="Swish logo" />
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  center: {
    textAlign: "center",
    paddingTop: "2rem",
  },
  img: {
    height: "4rem",
  },
  boxStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    margin: "0.7rem",
    width: "6rem",
    backgroundColor: "white",
    borderRadius: "10%",
    filter: "drop-shadow(0 0 0.10rem grey)",
  },
  boxContainer: {
    flexWrap: "wrap",
    padding: "1rem 2rem 1rem 2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
}));

export default PaymentMethod;
