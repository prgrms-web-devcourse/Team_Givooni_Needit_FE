import * as React from "react";
import { Link } from "react-router-dom";
import theme from "@/styles/theme";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import {
  Menu as MenuIcon,
  BorderColor as BorderColorIcon,
  CalendarToday as CalendarTodayIcon,
  Message as MessageIcon,
  AccountCircle as AccountCircleIcon,
  Assignment as AssignmentIcon,
  AccountBalance as AccountBalanceIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";

const Nav = () => {
  const primary = theme.palette.primary.main;
  const [value, setValue] = React.useState(0);

  // 메뉴 펼치기
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          id="fade-button"
          aria-controls="fade-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          label="게시판"
          icon={<MenuIcon />}
          sx={{ minWidth: "60px", p: 0.5 }}
        />

        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          sx={{ width: "25%" }}
        >
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
            to="/wishes"
          >
            <FavoriteIcon />
            멤버뷰
          </MenuItem>
        </Menu>
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
