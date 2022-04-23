import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";

import { UserProvider } from "./hooks/UserContext";
import Routes from "./routes/routes";
import GlobalStyles from "./styles/globalStyles";
import "antd/dist/antd.css";

ReactDOM.render(
  <>
    <UserProvider>
      <Routes />
    </UserProvider>

    <ToastContainer autoClose={7000} theme="colored" />
    <GlobalStyles />
  </>,

  document.getElementById("root")
);
