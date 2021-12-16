import styled from "styled-components";
import { useState } from "react";
import { Fade, Menu, MenuItem, Button } from "@mui/material";
import LocationSelector from "@/components/base/LocationSelector";

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
          sx={{ fontWeight: "400" }}
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
        <LocationSelector />
      </div>
    </PostFilterContainer>
  );
};

export default PostFilter;

const PostFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
