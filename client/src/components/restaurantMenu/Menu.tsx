import {
  Box,
  makeStyles,
  Theme,
  Typography,
  Tabs,
  Tab,
  Button,
  Fab,
  Fade,
  MenuItem,
} from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import MenuItems from "../menu/MenuItem";
import { MenuContext } from "../../context/MenusContext";
import { MenuItemType, RestaurantTableData } from "../../types/types";
import EditMenuModal from "./EditModal";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import SettingsApplicationsRoundedIcon from "@material-ui/icons/SettingsApplicationsRounded";
import AdminIndex from "../admin/index"
interface Iprops {
  restaurantId: RestaurantTableData;
  userInfo: any | null
}

const tabs: Array<string> = ["Dryck", "Mat", "Snacks", "Cocktails", "Beer"];

const RestaurantMenu = ({ restaurantId, userInfo }: Iprops) => {
  const classes = useStyles();
  const [value, setValue] = useState<string>("Dryck");
  const { restaurantData, sendUrlParam } = useContext(MenuContext);
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [itemsInCart, setItemsInCart] = useState(false);
  const { cart } = useContext(CartContext);
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  
  useEffect(() => {
    if (!id) return;
    if (!isOwner) {
      const queryParams = new URLSearchParams(window.location.search);
      const table = queryParams.get("table");
      if (!table) return;
      sendUrlParam(id, table);
      }
    if(isOwner){
      const table = "0"
      sendUrlParam(userInfo.rID, table)
    } 
  }, []);

  useEffect(() => {
    if (cart.length >= 1) {
      setItemsInCart(true);
    } else {
      setItemsInCart(false);
    }
  }, [cart]);

  useEffect(() => {
    checkIfOwner();
  }, [userInfo]);

  
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const filterMenuItems = (item: MenuItemType) => {
    const filtered = item.category.map((i: string) => {
      if (i === value) {
        return item;
      }
    });
    const filterUndefined = filtered.filter(function (x: any) {
      return x !== undefined;
    });
    return <MenuItems menuItems={filterUndefined} />;
  };

  
  function checkIfOwner() {
    if (
      userInfo &&
      userInfo.role === "owner" &&
      userInfo.rID === restaurantId.restaurantId
    ) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }

  return (
    <Box className={classes.menuPageContainer}>
      ¨
      {restaurantData ? (
        <>
          <Box
            style={{ backgroundImage: `url(${restaurantData.img})` }}
            className={classes.menuBackground}
          ></Box>
          <Box
            id="nameContainer"
            style={{ backgroundColor: `#${restaurantData.color}` }}
            className={classes.restaurantNameContainer}
          >
            {isOwner ? (
              <Box className={classes.addItemButton}>
                <Button
                  onClick={() => {
                    setOpenSettings(!openSettings);
                  }}
                >
                  <SettingsApplicationsRoundedIcon fontSize="large" />
                </Button>

                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <AddIcon fontSize="large" />
                </Button>
              </Box>
            ) : null}

            <Typography className={classes.restaurantName} variant="h2">
              {restaurantData.restaurantName}
            </Typography>
            <a href="/">
              <Typography variant="body1">Home</Typography>
            </a>
            <Box className={classes.menuList}>
              {!openSettings ? (
                <>
                  <Box className={classes.menuTabs}>
                    <Tabs
                      variant="scrollable"
                      aria-label="scrollable prevent tabs example"
                      value={value}
                      indicatorColor="secondary"
                      onChange={handleChange}
                    >
                      {restaurantData.categories.map((t: any) => (
                        <Tab label={t} value={t} />
                      ))}
                    </Tabs>
                  </Box>
                  <hr />
                  <Box className={classes.menuItemContainer}>
                    {restaurantData.menu.map((i: any) => filterMenuItems(i))}
                  </Box>
                </>
              ) : (
                <AdminIndex
                  userInfo={userInfo}
                />
              )
              }
            </Box>
          </Box>
          {open ? (
            <EditMenuModal
              isNewItem={true}
              menuItem={restaurantData.menu}
              closeModal={() => setOpen(false)}
              editOpen={Boolean(open)}
            />
          ) : null}
          {!isOwner ? (
            <Fade in={itemsInCart}>
              <Fab
                href="/checkout"
                color="primary"
                className={classes.cartButton}
              >
                <ShoppingCartOutlinedIcon htmlColor="#FFF" />
              </Fab>
            </Fade>
          ) : null}
        </>
      ) : null}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  menuPageContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FEFEFE",
  },
  menuBackground: {
    zIndex: 1,
    position: "fixed",
    height: "50%",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "top",
  },
  restaurantNameContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    marginTop: "40%",
    zIndex: 10,
    height: "100%",
    width: "100%",
    borderRadius: "38px 38px 0px 0px",
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  restaurantName: {
    fontSize: "26px",
    fontWeight: 500,
    padding: ".5rem",
  },
  menuList: {
    position: "sticky",
    height: "100%",
    width: "100%",
    backgroundColor: "#FEFEFE",
    borderRadius: "6px 60px 6px 6px",
  },
  menuTabs: {
    display: "flex",
    justifyContent: "space-around",
    width: "90%",
    padding: "1rem 1rem 0rem 1rem",
  },
  menuItemContainer: {
    overflow: "scroll",
    // backgroundColor: "blue",
    height: "100%",
    width: "100%",
  },
  addItemButton: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: "1rem",
  },
  cartButton: {
    position: "fixed",
    bottom: 30,
    right: 30,
    zIndex: 15,
  },
  cartIconStyle: {
    width: "50%",
  },
  settingsContainer: {
    height: "100%",
    width: "100%",
  },
  settingsListItem: {
    width: "100%",
    height: "100%",
    padding: "2rem",
  },
}));

export default RestaurantMenu;
