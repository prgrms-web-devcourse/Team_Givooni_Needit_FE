import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { StylesProvider } from "@mui/styles";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <GlobalStyle />
        <Story />
      </StylesProvider>
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
