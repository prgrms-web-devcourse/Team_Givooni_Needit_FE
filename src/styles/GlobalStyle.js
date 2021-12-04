import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    width: 100%;
    height: 100%;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    line-height: 1.5;
  }
  h3 {
    font-weight: 700;
    font-size: 32px;
  }
  h4 {
    font-weight: 700;
    font-size: 24px;
  }
  h5 {
    font-weight: 700;
    font-size: 20px;
  }
  h6 {
    font-weight: 700;
    font-size: 16px;
  }

  #root {
    min-width: 100%;
    min-height: 100%;
    --primary: #FD9F28;
  }
`;

export default GlobalStyle;
