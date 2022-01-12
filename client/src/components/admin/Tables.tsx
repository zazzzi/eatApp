import { Box, makeStyles, Theme, Typography} from "@material-ui/core";
import { useEffect, useState } from "react";
import { RestaurantTableData } from "../../types/types";
import QrGenerator from "./QrGenerator"
import AddIcon from '@material-ui/icons/Add';
import EditTableModal from './TableModal'

interface Iprops {
  restaurantData: any
}

function TablesEditor({restaurantData}: Iprops) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box className={classes.header}>
        <Typography variant="h2"><b>Bord</b></Typography>
        <AddIcon 
          className={classes.icon}
          onClick={() => {
            setOpen(true);
          }}
        />
        <EditTableModal
          closeModal={() => setOpen(false)}
          editOpen={Boolean(open)}
        />
      </Box>
    <Box className={classes.container}>
      {restaurantData.tables.map((table: number) => (
        <Box className={classes.boxContainer}>
            <Typography variant="h3">{table}</Typography>
            <QrGenerator table={table}/>
        </Box>
      ))}
    </Box>
   </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: 'center'
  }, 
  boxContainer: {
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    margin: '0.5rem',
    height: "10rem",
    width: "10rem",
    backgroundColor: "red",
  },
  header: {
    margin: "0rem 1rem 0rem 1rem",
    padding: "0.5rem 0.5rem 0rem 0.5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  icon: {
    height: '4rem',
    width: "4rem"
  }
}));


export default TablesEditor; 