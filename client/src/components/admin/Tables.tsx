import {
  Box,
  CircularProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { RestaurantTableData, User } from "../../types/types";
import AddIcon from "@material-ui/icons/Add";
import EditTableModal from "./TableModal";
import { Link } from "react-router-dom";
import { MenuContext } from "../../context/MenusContext";
interface Iprops {
  restaurantTable: RestaurantTableData;
  selectedTable: (table: string) => void;
  userInfo: User;
}

function TablesEditor({ restaurantTable, userInfo, selectedTable }: Iprops) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { restaurantData, fetchDatabaseWithId } = useContext(MenuContext);

  useEffect(() => {
    if (!userInfo) return;
    fetchDatabaseWithId(userInfo!.rID!);
  }, [userInfo]);

  if (!restaurantData) {
    return (
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box style={{ backgroundColor: "#FEFEFE" }}>
      <Box className={classes.header}>
        <Typography variant="h2">
          <b>Bord</b>
        </Typography>
        <AddIcon
          className={classes.icon}
          onClick={() => {
            setOpen(true);
          }}
        />
        <EditTableModal
          restaurantData={restaurantData}
          closeModal={() => setOpen(false)}
          editOpen={Boolean(open)}
        />
      </Box>
      <Box className={classes.container}>
        {restaurantData.tables.map((table: number, index: number) => (
          <Link
            key={index}
            style={{ textDecoration: "none" }}
            to={`/tables/${table}`}
          >
            <Box
              sx={{
                fontSize: "8rem",
                fontFamily: "roboto",
                color: "#000",
                border: 0,
              }}
              className={classes.boxContainer}
              onClick={() => selectedTable(table as unknown as string)}
            >
              <p>{table}</p>
            </Box>
          </Link>
        ))}
      </Box>
      <Link
        to={`/menu/${restaurantTable.restaurantId}?table=${restaurantTable.table}`}
      >
        <Box display="flex" justifyContent="center" pb={3}>
          <Typography>Tillbaka till menyn</Typography>
        </Box>
      </Link>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  boxContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.5rem",
    height: "10rem",
    width: "10rem",
    background:
      "linear-gradient(180deg, rgba(69, 64, 134, 0.16) -22.6%, rgba(255, 255, 255, 0) 100.74%);",
  },
  header: {
    margin: "0rem 1rem 0rem 1rem",
    padding: "0.5rem 0.5rem 0rem 0.5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    height: "4rem",
    width: "4rem",
  },
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default TablesEditor;
