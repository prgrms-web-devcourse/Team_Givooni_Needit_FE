import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFB85E",
      main: "#FD9F28",
      dark: "#E69225",
    },
    white: {
      main: "#FFFFFF",
      dark: "#F6F6F6",
    },
    black: {
      main: "#000000",
    },
    gray: {
      light: "#F6F6F6",
      main: "#E8E8E8",
      dark: "#9E9E9E",
    },
    placeholder: {
      main: "#BDBDBD",
    },
    gray_dark: {
      light: "#BDBDBD",
      main: "#9E9E9E",
      dark: "#8E8E8E",
    },
    like: {
      light: "#FF6A6A",
      main: "#FF5151",
      dark: "#E04242",
    },
    transparent: {
      main: "#FFFFFF0",
    },
    text: {
      secondary: "#9E9E9E",
    },
  },
  typography: {
    fontFamily: ["Spoqa Han Sans Neo", "sans-serif"].join(","),
    h3: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h4: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: 12,
      fontWeight: 400,
    },
    body1: {
      fontSize: 16,
      fontWeight: 300,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: 12,
      fontWeight: 300,
      lineHeight: 1.5,
    },
  },
});

export default theme;
