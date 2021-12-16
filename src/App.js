import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Login,
  Register,
  Wishes,
  Donations,
  User,
  Member,
  Center,
  Message,
  Schedule,
  Notify,
  Writes,
  Gps,
  Search,
} from "./pages";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishes" element={<Wishes />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/user" element={<User />} />
          <Route path="/member/:memberId" element={<Member />} />
          <Route path="/center/:centerId" element={<Center />} />
          <Route
            path="/message/:postId/:postType/:recieverId"
            element={<Message />}
          />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/notify" element={<Notify />} />
          <Route path="/writes" element={<Writes />} />
          <Route path="/Gps" element={<Gps />} />
          <Route path="/Search" element={<Search />} />
        </Routes>
        <br />
        <Link to="login">login</Link>
        <br />
        <Link to="register">register</Link>
        <br />
        <Link to="wishes">wishes</Link>
        <br />
        <Link to="donations">donations</Link>
        <br />
        <Link to="user">user</Link>
        <br />
        <Link to="member/memberId">member</Link>
        <br />
        <Link to="center/centerId">center</Link>
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
