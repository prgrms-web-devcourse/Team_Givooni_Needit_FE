import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import theme from "@/styles/theme";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  BorderColor as BorderColorIcon,
  CalendarToday as CalendarTodayIcon,
  Message as MessageIcon,
  AccountCircle as AccountCircleIcon,
  // Assignment as AssignmentIcon,
  AccountBalance as AccountBalanceIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import jwt_decode from "jwt-decode";

const Nav = () => {
  const [value, setValue] = useState(5);

  useEffect(() => {
    const path = window.location.pathname?.split("/")[1];
    if (["", "donations", "wishes", "review"].includes(path)) {
      setValue(0);
    } else if (["schedule"].includes(path)) {
      setValue(1);
    } else if (["writes"].includes(path)) {
      setValue(2);
    } else if (["message"].includes(path)) {
      setValue(3);
    } else if (["user", "center", "member"].includes(path)) {
      setValue(4);
    } else setValue(5);
  }, [window.location.pathname]);
  const isCenter =
    !!localStorage.getItem("needit_access_token") &&
    jwt_decode(localStorage.getItem("needit_access_token")).auth ===
      "ROLE_CENTER";

  return (
    <Box
      sx={{
        width: "100%",
        borderTop: `1px solid ${theme.palette.gray.light}`,
        position: "fixed",
        bottom: 0,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to={isCenter ? "/donations" : "/wishes"}
          label={isCenter ? "센터뷰" : "멤버뷰"}
          icon={isCenter ? <AccountBalanceIcon /> : <FavoriteIcon />}
          sx={{ minWidth: "60px", p: 0.5 }}
        />
        {/* <MenuItem
            sx={{
              display: "flex",
              flexDirection: "column",
              typography: "subtitle2",
              "&:hover": {
                color: primary,
              },
            }}
            onClick={handleClose}
            component={Link}
            to="/"
          >
            <AssignmentIcon /> 후기뷰
          </MenuItem>

          <MenuItem
            sx={{
              display: "flex",
              flexDirection: "column",
              typography: "subtitle2",
              "&:hover": {
                color: primary,
              },
            }}
            onClick={handleClose}
            component={Link}
            to="/donations"
          >
            <AccountBalanceIcon />
            센터뷰
          </MenuItem> */}

        {/* <MenuItem
            sx={{
              display: "flex",
              flexDirection: "column",
              typography: "subtitle2",
              "&:hover": {
                color: primary,
              },
            }}
            onClick={handleClose}
            component={Link}
            to="/wishes"
          >
            <FavoriteIcon />
            멤버뷰
          </MenuItem> */}
        <BottomNavigationAction
          component={Link}
          to="/schedule"
          label="예약관리"
          icon={<CalendarTodayIcon />}
          sx={{ minWidth: "60px", p: 0.5 }}
        />
        <BottomNavigationAction
          component={Link}
          to="/writes"
          label="글작성"
          icon={<BorderColorIcon />}
          sx={{ minWidth: "60px", p: 0.5 }}
        />
        <BottomNavigationAction
          component={Link}
          to="/message"
          label="채팅"
          icon={<MessageIcon />}
          sx={{ minWidth: "60px", p: 0.5 }}
        />
        <BottomNavigationAction
          component={Link}
          to="/user"
          label="내정보"
          icon={<AccountCircleIcon />}
          sx={{ minWidth: "60px", p: 0.5 }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Nav;
