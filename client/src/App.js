import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { theme } from "./customTheme/theme";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/auth' component={Auth} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
