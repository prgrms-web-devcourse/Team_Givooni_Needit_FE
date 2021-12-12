import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, Typography, Box, Avatar, IconButton } from "@mui/material";
import styled from "styled-components";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import PostCard from "@/components/domain/Member/PostCard";

const DUMMY_DATA = {
  post: {
    id: 1, // 기부글 식별자
    title: "기부",
    memberId: 1,
    member: "부리",
  },
};

const DUMMY1 = {
  message: "success",
  data: {
    id: 1, // 기부글 식별자
    title: "기부",
    content:
      "기부할래요 기부할래요? 기부할래요! 기부할래요 기부할래요 기부할래요? 기부할래요! 기부할래요",
    category: "물품나눔",
    quality: "보통",
    status: "기부진행",
    memberId: 1, // 기부글 작성자 : 식별자 아이디(회원)
    member: "부리", // 기부글 작성자 : 회원 닉네임
    centerCnt: 2, // 기부희망댓글 작성자 수(참여자수)
    createdDate: "2021-12-05T02:18:21.807641",
    updatedDate: "2021-12-05T19:50:29.063482",
    tags: ["아동 · 청소년", "가족 · 여성", "지구촌"],
    comments: [
      {
        id: 1, // 기부희망댓글 식별자
        comment: "기부희망",
        centerId: 1, // 기부희망댓글 작성자 식별자 아이디(센터)
        center: "기부니 센터", // 기부희망댓글 작성자 : 센터 이름
        centerImage: "test",
        createdDate: "2021-12-06T03:02:21.597399",
        updatedDate: "2021-12-06T03:39:41.936613",
      },
      {
        id: 2,
        comment: "기부희망",
        centerId: 1,
        center: "니드잇 센터",
        centerImage: "test",
        createdDate: "2021-12-06T16:18:29.599477",
        updatedDate: "2021-12-06T16:18:29.599477",
      },
    ],
  },
};

const UserTab = ({ height = "100vh" }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(height);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="내가 쓴 글" sx={{ width: "50%" }} />
          <Tab label="관심목록" sx={{ width: "50%" }} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            height: height,
          }}
          overflow="auto"
        >
          <PostCard DUMMY={DUMMY1} />
          <PostCard DUMMY={DUMMY1} />
          <PostCard DUMMY={DUMMY1} />
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

UserTab.propTypes = {
  height: PropTypes.string,
};
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const LikeProfile = styled.div`
  display: flex;
  justify-content: space-between;
`;
