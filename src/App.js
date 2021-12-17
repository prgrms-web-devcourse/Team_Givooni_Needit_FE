import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Login,
  Register,
  Wishes,
  Donations,
  Detail,
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
          <Route path="/donations/:postId" element={<Detail />} />
          <Route path="/wishes/:postId" element={<Detail />} />
          <Route path="/user" element={<User />} />
          <Route path="/member/:memberId" element={<Member />} />
          <Route path="/center/:centerId" element={<Center />} />
          <Route path="/message" element={<Message />} />
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
