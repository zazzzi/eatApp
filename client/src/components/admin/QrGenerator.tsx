import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect } from "react";
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";
import { MenuContext } from "../../context/MenusContext";
import eatAppLogo from "../../assets/logos/eatAppLogo.png";
import AlertDialog from "./ConfirmDialog";
import html2canvas from "html2canvas";
import PrintIcon from "@material-ui/icons/Print";
import { User } from "../../types/types";
interface Iprops {
  table: string;
  userInfo: User;
}

function QrGenerator({ table, userInfo }: Iprops) {
  const classes = useStyles();
  const { id } = useParams();
  const { restaurantData, fetchDatabaseWithId } = useContext(MenuContext);

  useEffect(() => {
    if (!userInfo) return;
    fetchDatabaseWithId(userInfo!.rID!);
  }, [userInfo]);

  const exportAsPicture = () => {
    var html: any = document.getElementsByTagName("HTML")[0];
    var body: any = document.getElementsByTagName("BODY")[0];
    var htmlWidth = html.clientWidth;
    var bodyWidth = body.clientWidth;
    var data = document.getElementById("exportContainer");
    var newWidth = data!.scrollWidth - data!.clientWidth;
    if (newWidth > data!.clientWidth) {
      htmlWidth += newWidth;
      bodyWidth += newWidth;
    }
    html.style.width = htmlWidth + "px";
    body.style.width = bodyWidth + "px";

    html2canvas(data!)
      .then((canvas) => {
        var image = canvas.toDataURL("image/png", 1.0);
        return image;
      })
      .then((image) => {
        saveAs(image, `table-${table}-QRcode.png`);
        html.style.width = null;
        body.style.width = null;
      });
  };

  const saveAs = (blob: string, fileName: string) => {
    var elem: any = window.document.createElement("a");
    elem.href = blob;
    elem.download = fileName;
    elem.style = "display:none;";
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === "function") {
      elem.click();
    } else {
      elem.target = "_blank";
      elem.dispatchEvent(
        new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
    }
    URL.revokeObjectURL(elem.href);
    elem.remove();
  };

  if (!userInfo || !restaurantData) {
    return (
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  if (!restaurantData.tables.includes(id)) {
    return (
      <Box className={classes.loader}>
        <Typography>Table does not exist</Typography>
        <Link to={`/tables`}>
          <Typography>Back</Typography>
        </Link>
      </Box>
    );
  }


  const url = `https://eatapp.se/menu/${userInfo.rID}?table=${!table ? id : table}`


  return (
    <Box className={classes.padding}>
      <Box id="exportContainer" className={classes.qrContainer}>
        <Typography className={classes.h} variant="h5">
          {restaurantData.restaurantName}: bord {!table ? id : table}
        </Typography>
        <QRCode value={url} />
        <img className={classes.logo} src={eatAppLogo} alt="EatApp logo" />
      </Box>
      <Button
        className={classes.button}
        variant="text"
        color="primary"
        onClick={exportAsPicture}
        startIcon={<PrintIcon />}
      >
        Skriv ut
      </Button>
      <Box className={classes.buttonGroup}>
        <Link to={`/tables`}>
          <Button className={classes.button} variant="outlined" color="primary">
            Back
          </Button>
        </Link>
        <AlertDialog table={!table ? id! : table!} />
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  h: {
    padding: "0.5rem",
  },
  padding: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "2rem",
    flexDirection: "column",
  },
  paddingButtonContent: {
    padding: "0rem 0.5rem 0rem 0.5rem",
  },
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  button: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "8rem",
    margin: "1rem",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    padding: "0.8rem",
    width: "60%",
  },
  qrContainer: {
    outline: "solid",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
  },
}));

export default QrGenerator;
