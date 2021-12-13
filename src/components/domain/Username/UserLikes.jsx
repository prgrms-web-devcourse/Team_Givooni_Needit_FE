import React from "react";
import { Typography, Box, Avatar, IconButton } from "@mui/material";
import styled from "styled-components";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import UserProfile from "./UserProfile";

const DUMMY_DATA = {
  post: [
    {
      id: 1, // 기부글 식별자
      title: "기부",
      memberId: 1,
      member: "부리",
    },
    {
      id: 1, // 기부글 식별자
      title: "기부",
      memberId: 1,
      member: "부리",
    },
    {
      id: 1, // 기부글 식별자
      title: "기부",
      memberId: 1,
      member: "부리",
    },
    {
      id: 1, // 기부글 식별자
      title: "기부",
      memberId: 1,
      member: "부리",
    },
    {
      id: 1, // 기부글 식별자
      title: "기부",
      memberId: 1,
      member: "부리",
    },
    {
      id: 1, // 기부글 식별자
      title: "기부",
      memberId: 1,
      member: "부리",
    },
    {
      id: 1, // 기부글 식별자
      title: "기부",
      memberId: 1,
      member: "부리",
    },
  ],
};

const UserLikes = () => {
  return (
    <>
      <Header type="plain" />
      <Box sx={{ px: "16px" }}>
        <UserProfile />
        <LikeProfileContainer>
          {DUMMY_DATA.post.map((like, idx) => {
            return (
              <LikeProfile key={idx}>
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
                    {like.member}
                  </Typography>
                </Box>
                <IconButton color="like">
                  <FavoriteIcon />
                </IconButton>
              </LikeProfile>
            );
          })}
        </LikeProfileContainer>
      </Box>
      <Nav />
    </>
  );
};

export default UserLikes;

const LikeProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 50vh;
  margin-top: 12px;
  padding: 4px;
  overflow: auto;
`;
const LikeProfile = styled.div`
  display: flex;
  justify-content: space-between;
`;
