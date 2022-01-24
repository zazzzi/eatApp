import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/hero/Hero";
import Login from "./components/login/Login";
import RestaurantMenu from "./components/restaurantMenu/Menu";
import CreateUser from "./components/login/CreateUser";
import Checkout from "./components/checkout/Checkout";
import { UserAuthContext } from "./context/UsersContext";
import { OrderContext } from "./context/OrdersContext";
import UserPage from "./components/users/UserPage";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { RestaurantTableData } from "./types/types";
import AdminIndex from "./components/admin";
import ErrorBoundary from "./components/errorboundary/ErrorBoundary";
import TablesEditor from "./components/admin/Tables";
import QrGenerator from "./components/admin/QrGenerator";
import Orders from "./components/admin/Orders"
import { Box } from "@material-ui/core";
import ResetPassword from "./components/login/ResetPassword";


function App() {
  const { loggedIn, userID, userInformation } = useContext(UserAuthContext);
  const { orders } = useContext(OrderContext);
  const [currentTableAndRestaurant, setcurrentTableAndRestaurant] =
    useState<RestaurantTableData | null>(null);
  const [table, setTable] = useState<any>("");

  useEffect(() => {
    let restaurant = JSON.parse(localStorage.getItem("restaurant") || "{}");
    setcurrentTableAndRestaurant(restaurant);
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#75A0F5",
        light: "#FFF",
      },
      secondary: {
        main: "#e06c6c",
        dark: "#000",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  useEffect(() => {
    console.log("is logged in", loggedIn);
  }, []);

  const selectedTable = (table: any) => {
    setTable(table);
  };

  //get it working so that if you are an owner and you navigate to /menu you come to the menu, as opposed to using an id
  return (
    <Box
      sx={{
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "50%",
          xl: "50%",
        },
        margin: {
          // xs: "100%",
          // sm: "100%",
          // md: "auto",
          lg: "auto",
          xl: "auto",
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route
                path="/"
                element={<Hero restaurantId={currentTableAndRestaurant!} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path={`/menu/:id`}
                element={
                  <RestaurantMenu
                    restaurantId={currentTableAndRestaurant!}
                    userInfo={userInformation}
                  />
                }
              />
              <Route path={`/user/${userID}`} element={<UserPage />} />
              <Route
                path="/checkout/"
                element={<Checkout 
                  restaurantId={currentTableAndRestaurant!} 
                  userInformation={userInformation!}
                />}
              />
              <Route
                path="/admin"
                element={<AdminIndex userInfo={userInformation!} />}
              />
              <Route
                path="/tables"
                element={
                  <TablesEditor
                    selectedTable={selectedTable}
                    restaurantTable={currentTableAndRestaurant!}
                    userInfo={userInformation}
                  />
                }
              />
              <Route
                path="/tables/:id"
                element={
                  <QrGenerator table={table} userInfo={userInformation!} />
                }
              />
              <Route
              path="/orders"
              element={<Orders 
                orders={orders}
                userId={userID}
                userInfo={userInformation}
                restaurantId={currentTableAndRestaurant!}
              />}
            />
            </Routes>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </Box>
  );
}

export default App;
