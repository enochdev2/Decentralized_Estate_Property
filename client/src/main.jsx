import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
// import '@rainbow-me/rainbowkit/styles.css'
// import 'react-datepicker/dist/react-datepicker.css'
import Providers from "../services/provider";
import { Provider } from "react-redux";
import { store } from "../store";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      {/* <Providers pageProps={pageProps}> */}

    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
