import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#E69225",
      main: "#FD9F28",
      dark: "#CC8221",
    },
    gray: {
      light: "#F6F6F6",
      main: "#E8E8E8",
      dark: "#9E9E9E",
    },
  },
  typography: {
    fontFamily: ["Spoqa Han Sans Neo", "sans-serif"].join(","),
    subtitle1: {
      fontSize: 16,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: 12,
      fontWeight: 500,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
});

export default theme;
