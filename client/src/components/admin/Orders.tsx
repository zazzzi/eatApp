import {
  Box,
  Button,
  CircularProgress,
  Divider,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrdersContext";
import {
  MenuItemType,
  Order,
  RestaurantTableData,
  User,
} from "../../types/types";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";

interface Iprops {
  orders: Order[];
  userId: string | null;
  userInfo: User | null;
  restaurantId: RestaurantTableData;
}

function Orders({ orders, userId, userInfo, restaurantId }: Iprops) {
  const classes = useStyles();
  const { confirmOrderDelivery } = useContext(OrderContext);
  const [value, setValue] = useState("one");
  const [filteredOrders, setFilteredOrders] = useState<Array<Order> | null>(
    null
  );

  useEffect(() => {
    if (!userInfo || !orders) return;
    if (userInfo!.role === "owner") {
      const filtered = orders.filter((order: Order) => {
        if (!order.delivered && value === "one") {
          return order;
        } else if (order.delivered && value === "two") {
          return order;
        }
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [value, userInfo, orders]);

  const handleConfirm = (order: Order) => {
    confirmOrderDelivery(order);
  };

  const handleChange = (_event: any, newValue: string) => {
    setValue(newValue);
  };

  const listCart = (cart: MenuItemType[]) => {
    return (
      <Box>
        {cart.map((item: MenuItemType, index: number) => (
          <Typography key={index} className={classes.fontSize}>
            {item.quantity}st {item.title} - {item.price * item.quantity} kr
          </Typography>
        ))}
      </Box>
    );
  };

  if (!orders || !filteredOrders) {
    return (
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.title}>
        <Link style={{ textDecoration: "none" }} to={`/login`}>
          <ArrowBackIosIcon />
        </Link>
        <Typography variant="h5">
          {" "}
          {userInfo?.role === "owner"
            ? "Beställningar"
            : "Tidigare beställningar"}{" "}
        </Typography>
      </Box>
      {userInfo?.role === "owner" ? (
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            variant="fullWidth"
          >
            <Tab value="one" label=" Ej levererat" />
            <Tab value="two" label=" Levererat" />
          </Tabs>
        </Box>
      ) : null}

      {filteredOrders!.map((order: Order, index: number) =>
        order.extId === userId || userInfo?.role === "owner" ? (
          <Box key={index} className={classes.containerStyle}>
            <Box className={classes.textBox}>
              <Typography>
                {" "}
                {order.restaurantData.restaurantName}: Bord{" "}
                {order.restaurantData.table}{" "}
              </Typography>
              <Typography> {order.priceTotal} kr</Typography>
            </Box>
            <Box className={classes.textBox}>
              <Box>{listCart(order.cart)}</Box>
              <Typography> {order.orderDate} </Typography>
            </Box>
            <Divider className={classes.divider} />
            {userInfo?.role === "owner" ? (
              <Box className={classes.adminButton}>
                <Typography className={classes.orderStatus}>
                  Status:{" "}
                  {order.delivered ? (
                    <Typography style={{ color: "green" }}>
                      {" "}
                      Levererat
                    </Typography>
                  ) : (
                    <Typography style={{ color: "red" }}>
                      {" "}
                      Olevererat
                    </Typography>
                  )}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleConfirm(order)}
                  disabled={order.delivered}
                >
                  Leverera
                </Button>
              </Box>
            ) : null}
          </Box>
        ) : null
      )}
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  container: {
    height: "100vh",
    backgroundColor: "white",
    padding: "1rem",
  },
  containerStyle: {
    borderRadius: "0.2rem",
    display: "flex",
    margin: "0.5rem 0rem 0.5rem 0rem",
    boxShadow: "1px 2px 6px 1px rgba(0,0,0,0.12)",
    flexDirection: "column",
  },
  textBox: {
    padding: "1rem 1.5rem 1rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
  },
  fontSize: {
    fontSize: "0.7rem",
  },
  divider: {
    margin: "auto",
  },
  adminButton: {
    padding: "0.5rem 1.5rem 0.5rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderStatus: {
    display: "flex",
  },
  title: {
    padding: "0rem 0rem 0.5rem 0rem",
    display: "flex",
    alignItems: "center",
  },
}));

export default Orders;
