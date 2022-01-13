import { Box, CircularProgress, makeStyles, Theme, Typography} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { RestaurantTableData } from "../../types/types";
import AddIcon from '@material-ui/icons/Add';
import EditTableModal from './TableModal'
import { Link } from "react-router-dom";
import { MenuContext } from "../../context/MenusContext";
interface Iprops {
  restaurantTable: RestaurantTableData
  selectedTable: (table: any) => void
  userInfo: any
}

function TablesEditor({ restaurantTable, userInfo, selectedTable}: Iprops) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {restaurantData, fetchDatabaseWithId} = useContext(MenuContext)


  useEffect(()=> {
    if(!userInfo) return
    fetchDatabaseWithId(userInfo.rID)
  },[userInfo])

  if(!restaurantData) {
    return (
    <Box className={classes.loader}>
      <CircularProgress/>
    </Box>
    )
  }

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
        <Link to={`/tables/${table}`}>
          <Box 
            className={classes.boxContainer}
            onClick={()=> selectedTable(table)}
          >
              <Typography variant="h3">{table}</Typography>
          </Box>
        </Link>
      ))}
    </Box>
    <Link to={`/menu/${restaurantTable.restaurantId}?table=${restaurantTable.table}`}>
      <Typography>Tillbaks till menyn</Typography>
    </Link>
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
  },
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));


export default TablesEditor; 