import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00a896",
    },
    secondary: {
      main: "#ff9b85",
    },
    background: {
      default: "#fff",
      paper: "#fafafa",
    },
  },
  typography: {
    fontFamily: "'Fira Sans', sans-serif",
  },
});
