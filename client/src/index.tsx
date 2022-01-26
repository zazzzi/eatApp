import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import UserAuthProvider from "./context/UsersContext";
import MenuProvider from "./context/MenusContext";
import CartProvider from "./context/CartContext";
import OrderProvider from "./context/OrdersContext";
import CookieConsent from "react-cookie-consent";
import { Link } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <UserAuthProvider>
      <OrderProvider>
        <CartProvider>
          <MenuProvider>
          <CookieConsent
            location="bottom"
            buttonText="Okej"
            cookieName="EatAppCookie"
            style={{ background: "#2B373B", fontFamily: "Roboto" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            expires={150}
          >
            Vi använder oss av cookies för att göra din användaruplevelse bättre{" "}<br/>
            <span style={{ fontSize: "10px" }}>Läs mer om hur vi hanterar dina användaruppgifter <Link href="https://www.freeprivacypolicy.com/live/775830bf-3092-4d01-900e-7a355410fc7a">Här</Link></span>
          </CookieConsent>
            <App />
          </MenuProvider>
        </CartProvider>
      </OrderProvider>
    </UserAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
