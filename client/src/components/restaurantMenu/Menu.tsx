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
  Tooltip,
  Link,
  CircularProgress,
} from "@material-ui/core";
import { useEffect, useState, useContext, useReducer } from "react";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import MenuItems from "../menu/MenuItem";
import { MenuContext } from "../../context/MenusContext";
import { MenuItemType, RestaurantTableData } from "../../types/types";
import EditMenuModal from "./EditModal";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import SettingsApplicationsRoundedIcon from "@material-ui/icons/SettingsApplicationsRounded";
import AdminIndex from "../admin/index";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Badge, { BadgeProps } from "@mui/material/Badge";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

interface Iprops {
  restaurantId: RestaurantTableData;
  userInfo: any | null;
}

const RestaurantMenu = ({ restaurantId, userInfo }: Iprops) => {
  const classes = useStyles();
  const {
    restaurantData,
    sendUrlParam,
    updateRestaurantNameColor,
  } = useContext(MenuContext);

  // TODO: starting state needs to be restaurantData.color, but can't set it before it's loaded
  const [menuColor, setMenuColor] = useState<string>();

  const [value, setValue] = useState<string>("Dryck");
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [itemsInCart, setItemsInCart] = useState(false);
  const { cart } = useContext(CartContext);
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [table, setTable] = useState<string>("")
  const [restaurantNameColorBlack, setRestaurantNameColorBlack] =
    useState<boolean>(true);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!id) return;
    if (!isOwner) {
      const queryParams = new URLSearchParams(window.location.search);
      const table = queryParams.get("table");
      setTable(table!)
      if (!table) return;
      sendUrlParam(id, table);
    }
    if (isOwner) {
      const table = "0";
      sendUrlParam(userInfo.rID, table);
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

  useEffect(() => {
    if (!restaurantData) {
      return;
    }
    const testColor = restaurantData.color;
    setMenuColor(testColor);
  }, [restaurantData]);

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };

  const filterMenuItems = (item: MenuItemType) => {
    const filtered = item.category.map((i: string) => {
      if (i === value) {
        return item;
      } else if (value === "Alla") {
        return item;
      }
    });
    const filterUndefined = filtered.filter(function (x: any) {
      return x !== undefined;
    });
    return (
      <MenuItems
        menuItems={filterUndefined}
        deletedItemCallback={forceUpdate}
      />
    );
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

  const handleNameColorChange = () => {
    if (restaurantNameColorBlack === true) {
      setRestaurantNameColorBlack(false);
    } else {
      setRestaurantNameColorBlack(true);
    }
    updateRestaurantNameColor(restaurantNameColorBlack);
  };

  const cartQuantity = () => {
    if (!cart.length) return;
    return cart
      .map((item) => item.quantity)
      .reduce((prev, next) => prev + next);
  };

  if(restaurantData && !restaurantData.tables.includes(table)){
      return (
        <Box className={classes.noDataloader}>
          <Typography variant="h2">404</Typography>
          <Typography variant="h6">Bordet du söker finns inte</Typography>
          <Typography variant="h6">kontakta personallen eller</Typography>
          <Link href="/"><Typography>Skanna en QR kod</Typography></Link>
        </Box>
      )
    } else if (!restaurantData){
      return (
        <Box className={classes.noDataloader}>
          <CircularProgress/>
        </Box>
      )
    }
    
  

  return (
    <Box className={classes.menuPageContainer}>
      <Box
        sx={{ position: "absolute", top: "0", zIndex: 100, width: "100%" }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link href="/">
          <HomeIcon htmlColor="#FEFEFE" fontSize="large" />
        </Link>
        <Link>
          <AccountCircleIcon htmlColor="#FEFEFE" fontSize="large" />
        </Link>
      </Box>

      {restaurantData ? (
        <>
          <Box
            style={{ backgroundImage: `url(${restaurantData.img})` }}
            className={classes.menuBackground}
          ></Box>
          <Box
            id="nameContainer"
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "100%",
                lg: "50%",
                xl: "50%",
              },
              position: {
                xs: "absolute",
                sm: "absolute",
                md: "absolute",
                lg: "fixed",
                xl: "fixed",
              },
            }}
            style={{ backgroundColor: `${menuColor}` }}
            className={classes.restaurantNameContainer}
          >
            {isOwner ? (
              <Box className={classes.addItemButton}>
                <Button
                  onClick={() => {
                    setOpenSettings(!openSettings);
                  }}
                >
                  <Tooltip title="Settings">
                    <SettingsApplicationsRoundedIcon fontSize="large" />
                  </Tooltip>
                </Button>

                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <Tooltip title="Add new">
                    <AddIcon fontSize="large" />
                  </Tooltip>
                </Button>
              </Box>
            ) : null}

            <Box
              display="flex"
              alignItems="center"
              color={restaurantData.isNameBlack ? "#000" : "#FEFEFE"}
              mt={isOwner ? 0 : 2}
            >
              <Typography className={classes.restaurantName} variant="h2">
                {restaurantData.restaurantName}
              </Typography>

              {/* TODO: Send this state into database */}
              {isOwner ? (
                <Button size="small" onClick={handleNameColorChange}>
                  <FiberManualRecordIcon
                    htmlColor={restaurantData.isNameBlack ? "#FFF" : "#000"}
                  />
                </Button>
              ) : null}
            </Box>

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
                <AdminIndex setColor={setMenuColor} userInfo={userInfo} />
              )}
            </Box>
          </Box>
          {open ? (
            <EditMenuModal
              isNewItem={true}
              menuItem={restaurantData.menu}
              closeModal={() => setOpen(false)}
              editOpen={open}
            />
          ) : null}
          {!isOwner ? (
            <Fade in={itemsInCart}>
              <Fab
                href="/checkout"
                color="primary"
                className={classes.cartButton}
              >
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={cartQuantity()} color="secondary">
                    <ShoppingCartOutlinedIcon htmlColor="#FFF" />
                  </StyledBadge>
                </IconButton>
              </Fab>
            </Fade>
          ) : null}
        </>
      ) : (
        <Box className={classes.loader}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -10,
    top: 30,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const useStyles = makeStyles((theme: Theme) => ({
  menuPageContainer: {
    minHeight: "70vh",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FEFEFE",
  },
  menuBackground: {
    zIndex: 1,
    // position: "absolute",
    height: "30%",
    minWidth: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  restaurantNameContainer: {
    display: "flex",
    flexDirection: "column",
    top: "20%",
    zIndex: 10,
    height: "100%",
    // width: "50%",
    borderRadius: "38px 38px 0px 0px",
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
    overflow: "scroll",
  },
  menuTabs: {
    display: "flex",
    justifyContent: "space-around",
    width: "90%",
    padding: "1rem 1rem 0rem 1rem",
  },
  menuItemContainer: {
    overflow: "scroll",
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
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noDataloader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

export default RestaurantMenu;
