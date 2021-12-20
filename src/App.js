import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import PrivateRoute from "@/utils/PrivateRoute";
import PublicRoute from "@/utils/PublicRoute";
import jwt_decode from "jwt-decode";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !!localStorage.getItem("needit_access_token") &&
              jwt_decode(localStorage.getItem("needit_access_token")).auth ===
                "ROLE_CENTER" ? (
                <Donations />
              ) : (
                <Wishes />
              )
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/Gps"
            element={
              <PublicRoute>
                <Gps />
              </PublicRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="/message"
            element={
              <PrivateRoute>
                <Message />
              </PrivateRoute>
            }
          />
          <Route
            path="/message/:postId/:postType/:receiverId"
            element={
              <PrivateRoute>
                <Message />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <Schedule />
              </PrivateRoute>
            }
          />
          <Route
            path="/notify"
            element={
              <PrivateRoute>
                <Notify />
              </PrivateRoute>
            }
          />
          <Route
            path="/writes"
            element={
              <PrivateRoute>
                <Writes />
              </PrivateRoute>
            }
          />
          <Route path="/Search" element={<Search />} />
          <Route path="/wishes" element={<Wishes />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/donations/:postId" element={<Detail />} />
          <Route path="/wishes/:postId" element={<Detail />} />
          <Route path="/member/:memberId" element={<Member />} />
          <Route path="/center/:centerId" element={<Center />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
