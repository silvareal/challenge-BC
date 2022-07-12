import { createTheme } from "@mui/material";

const primary = "#4CBB5E";
const secondary = "#FF6916";

// Global theme customization should be done here
const theme = createTheme({
  palette: {
    primary: {
      main: primary,
      contrastText: "#ffffff",
    },
    secondary: {
      main: secondary,
      contrastText: "#ffffff",
    },
  },
});

export default theme;
