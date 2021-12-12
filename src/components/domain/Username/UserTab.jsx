import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, Typography, Box, Avatar, IconButton } from "@mui/material";
import styled from "styled-components";
import { Favorite as FavoriteIcon } from "@mui/icons-material";

const DUMMY_DATA = {
  post: {
    id: 1, // 기부글 식별자
    title: "기부",
    memberId: 1,
    member: "부리",
  },
};

const UserTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="내가 쓴 글" sx={{ width: "50%" }} />
          <Tab label="관심목록" sx={{ width: "50%" }} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ height: "30vh" }} overflow="auto">
          포스트카드 렌더링
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ height: "30vh" }} overflow="auto">
          <LikeProfile>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Avatar />
              <Typography
                color="primary"
                variant="subtitle1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {DUMMY_DATA.post.member}
              </Typography>
            </Box>
            <IconButton color="like">
              <FavoriteIcon />
            </IconButton>
          </LikeProfile>
        </Box>
      </TabPanel>
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ pt: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default UserTab;

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const LikeProfile = styled.div`
  display: flex;
  justify-content: space-between;
`;
