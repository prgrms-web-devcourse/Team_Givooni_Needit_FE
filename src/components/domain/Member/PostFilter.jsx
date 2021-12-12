// import PropTypes from "prop-types";
// import BaseButton from "@/components/base/BaseButton";
import styled from "styled-components";
import { useState } from "react";
// import theme from "@/styles/theme";
// import PropTypes from "prop-types";
// import theme from "@/styles/theme";
import { Fade, Menu, MenuItem, Button } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import { Link } from "react-router-dom";

const PostFilter = () => {
  const [category, setCategory] = useState("전체");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    e.target.innerText ? setCategory(e.target.innerText) : null;
  };

  return (
    <PostFilterContainer>
      <div>
        <Button
          color="gray_dark"
          id="fade-button"
          aria-controls="fade-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          카테고리: {category}
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>전체</MenuItem>
          <MenuItem onClick={handleClose}>물품나눔</MenuItem>
          <MenuItem onClick={handleClose}>재능기부</MenuItem>
        </Menu>
      </div>

      <div>
        <Button endIcon={<MyLocationIcon />} component={Link} to="/">
          지역선택
        </Button>
      </div>
    </PostFilterContainer>
  );
};

export default PostFilter;

// PostFilter.propTypes = {
//   tag: PropTypes.array,
// };

const PostFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
