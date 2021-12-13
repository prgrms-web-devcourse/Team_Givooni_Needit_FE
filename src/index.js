import React from "react";
import ReactDOM from "react-dom";
import { Reset } from "styled-reset";
import App from "./App";
import ContextProvider from "@/context";

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
