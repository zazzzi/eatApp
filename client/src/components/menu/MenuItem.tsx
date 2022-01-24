import {
  Box,
  Container,
  makeStyles,
  Theme,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { MenuItemType } from "../../types/types";
import Incrementer from "../incrementer/Incrementer";
import { MenuItem } from "../../context/CartContext";
import { UserAuthContext } from "../../context/UsersContext";
import { MenuContext } from "../../context/MenusContext";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import EditMenuModal from "../restaurantMenu/EditModal";
import DeleteIcon from "@material-ui/icons/Delete";
import { Skeleton } from "@mui/material";

interface Iprops {
  deletedItemCallback?(): void;
  menuItems: any;
}

function MenuItems(props: Iprops) {
  const classes = useStyles();
  const { userInformation } = useContext(UserAuthContext);
  const { restaurantId, deleteMenuItem } = useContext(MenuContext);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [deletedItemArray, setDeletedItemArray] = useState(props.menuItems);

  useEffect(() => {
    checkIfOwner();
  }, [userInformation]);

  function checkIfOwner() {
    if (
      userInformation &&
      userInformation.role === "owner" &&
      userInformation.rID === restaurantId.restaurantId
    ) {
      setIsOwner(true);
    }
  }

  function handleDelete(index: number) {
    const currentMenu = props.menuItems[index];
    setDeletedItemArray(currentMenu);
    deleteMenuItem(deletedItemArray, currentMenu.id);
    props.deletedItemCallback!();
  }

  return (
    <>
      {props.menuItems.map((item: MenuItemType | MenuItem, index: number) => (
        <Box key={index} className={classes.menuitemContainer}>
          <Box className={classes.menuItem}>
            <Container className={classes.imageColumn}>
              {item.img ? (
                <img className={classes.image} src={item.img} />
              ) : (
                <Skeleton variant="circular" width={80} height={80} />
              )}
            </Container>
            <Container className={classes.itemColumn}>
              <Typography
                style={{ textAlign: "center" }}
                variant="h6"
                display="block"
              >
                {item.title}
              </Typography>
              <Typography variant="h6" display="block" gutterBottom>
                <p className={classes.font}>{item.description}</p>
              </Typography>
            </Container>
          </Box>
          <Box className={classes.bottomContainer}>
            <Box className={classes.incrementerContainer}>
              {isOwner ? (
                <>
                  <Box mr={2} style={{ cursor: "pointer" }}>
                    <Tooltip title="Delete">
                      <DeleteIcon
                        onClick={() => [
                          handleDelete(index),
                        ]}
                      />
                    </Tooltip>
                  </Box>
                  <Box style={{ cursor: "pointer" }}>
                    <Tooltip title="Edit">
                      <EditRoundedIcon onClick={() => setOpen(true)} />
                    </Tooltip>
                  </Box>
                </>
              ) : (
                <Incrementer menuItem={item} />
              )}
            </Box>
            <Container className={classes.priceColumn}>
              <Typography variant="overline" display="block" gutterBottom>
                <b>{item.price} kr</b>
              </Typography>
            </Container>
          </Box>
          {isOwner ? (
            <EditMenuModal
              menuItem={item}
              closeModal={() => setOpen(false)}
              editOpen={open}
              isNewItem={false}
            />
          ) : null}
          <hr />
        </Box>
      ))}
    </>
  );
}

const useStyles = makeStyles(() => ({
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
