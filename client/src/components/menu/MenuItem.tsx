import {
  Box,
  Container,
  Divider,
  makeStyles,
  Theme,
  Typography,
  Button,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { MenuItemType } from "../../types/types";
import Incrementer from "../incrementer/Incrementer";
import { MenuItem } from "../../context/CartContext";
import { UserAuthContext } from "../../context/UsersContext";

interface Iprops {
  menuItems: any;
}

function MenuItems({ menuItems }: Iprops) {
  const classes = useStyles();
  const { loggedIn, userID } = useContext(UserAuthContext);

  const itemContents = (cont: any) => {
    return (
      <Box>
        {cont.map((i: string[]) => (
          <p className={classes.font}>{i}</p>
        ))}
      </Box>
    );
  };
  return (
    <Box className={classes.baseContainer}>
      {menuItems.map((item: MenuItemType | MenuItem, i: any) => (
        <Box className={classes.menuitemContainer}>
          <Box className={classes.menuItem}>
            <Container className={classes.imageColumn}>
              <img className={classes.image} src={item.img} />
            </Container>
            <Container className={classes.itemColumn}>
              <Typography variant="h6" display="block" gutterBottom>
                {item.title}
              </Typography>
              {itemContents(item.content)}
            </Container>
          </Box>
          <Box className={classes.bottomContainer}>
            <Box className={classes.incrementerContainer}>
              <Incrementer menuItem={item} />
            </Box>
            <Container className={classes.priceColumn}>
              <Typography variant="overline" display="block" gutterBottom>
                {item.price} kr
              </Typography>
            </Container>
          </Box>
          <hr />
        </Box>
      ))}
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  baseContainer: {
    width: "100vw",
  },
  menuItem: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 0rem 1rem 0rem",
  },
  menuitemContainer: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "5rem",
    height: "5rem",
    borderRadius: "100%",
    objectFit: "cover",
  },
  priceColumn: {
    display: "flex",
    justifyContent: "center",
    alignContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  itemColumn: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  imageColumn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  font: {
    fontSize: ".59rem",
    fontFamily: "roboto",
    color: "#928F8F",
    margin: "0",
  },
  quantityContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row-reverse",
    width: "5rem",
    background: "#FFFFFF",
    boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.06)",
    borderRadius: "24px",
  },
  incrementerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  bottomContainer: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
}));

export default MenuItems;
