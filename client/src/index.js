import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import "./index.css";
import App from "./App";
import { theme } from "./customTheme/theme";

import { AppProvider } from "./context/AppContext";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AppProvider>
      <App />
    </AppProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
