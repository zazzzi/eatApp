import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Hero from "./components/hero/Hero";
import Login from "./components/login/Login";
import RestaurantMenu from "./components/restaurantMenu/Menu";
import Cart from "./components/cart/Cart";
import CreateUser from "./components/login/CreateUser";
import Checkout from "./components/checkout/Checkout";
import { UserAuthContext } from "./context/UsersContext";
import UserPage from "./components/users/UserPage";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { RestaurantTableData } from "./types/types";
import AdminIndex from "./components/admin";


function App() {
  const { loggedIn, userID, userInformation } = useContext(UserAuthContext);
  const [currentTableAndRestaurant, setcurrentTableAndRestaurant] = useState<RestaurantTableData | null>(null)

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
        main: "#E33E7F",
      },
    },
  });

  useEffect(() => {
    console.log("is logged in", loggedIn);
  },[]) 

 return (
    <Router>
      <Routes>
          <Route path="/" element={<Hero restaurantId={currentTableAndRestaurant!}/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/create-user" element={<CreateUser/>}/>
          <Route path={`/menu/:id`} element={
            <RestaurantMenu 
              restaurantId={currentTableAndRestaurant!}
              userInfo={userInformation}
            />}
            />
          <Route path={`/user/${userID}`} element={<UserPage/>}/>
          <Route path="/checkout" element={<Checkout restaurantId={currentTableAndRestaurant!}/>}/>
          <Route path="/admin" element={<AdminIndex restaurantId={currentTableAndRestaurant!}/>}/>
      </Routes>
    </Router>
  );  
}


export default App;

