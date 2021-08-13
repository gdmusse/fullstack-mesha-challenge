import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { primaryColor, neutralColor } from "./colors";

const theme2 = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: "white",
    },
    secondary: {
      main: neutralColor,
      contrastText: "white",
    },
    text: {
      primary: neutralColor,
    },
  },
});

const theme = responsiveFontSizes(theme2);

export default theme;
