import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
        </Routes>
        <br />
        <Link to="login">login</Link>
        <br />
        <Link to="register">register</Link>
        <br />
        <Link to="center">center</Link>
        <br />
        <Link to="member">member</Link>
        <br />
        <Link to="username">usename</Link>
        <br />
        <Link to="message">message</Link>
        <br />
        <Link to="schedule">schedule</Link>
        <br />
        <Link to="notify">notify</Link>
        <br />
        <Link to="writes">writes</Link>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
