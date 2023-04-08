import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { alphaSearchTheme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={alphaSearchTheme}>
        <CssBaseline>
          <Provider store={store}>
            <App />
          </Provider>
        </CssBaseline>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
);
