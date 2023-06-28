import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import { Tooltip } from "react-tooltip";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Tooltip id="my-tooltip" className="reacttooltip" />
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              style: {
                background: "green",
                color: "white",
              },
            },
            error: {
              style: {
                background: "#b2071d",
                color: "white",
              },
            },
          }}
        />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
