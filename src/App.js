import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Register,
  Center,
  Member,
  Username,
  Message,
  Schedule,
  Notify,
  Writes,
  Gps,
  Detail,
} from "./pages";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/center" element={<Center />} />
          <Route path="/member" element={<Member />} />
          <Route path="/username" element={<Username />} />
          <Route path="/message" element={<Message />} />
          <Route path="/message/:id" element={<Message />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/notify" element={<Notify />} />
          <Route path="/writes" element={<Writes />} />
          <Route path="/Gps" element={<Gps />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
