import React from "react";
// import { useParams } from "react-router";
import BaseButton from "@/components/base/BaseButton";
import styled from "styled-components";
// import {
//   Mood as MoodIcon,
//   SentimentSatisfied as SentimentSatisfiedIcon,
//   SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
// } from "@mui/icons-material";
import { Box, Avatar } from "@mui/material";

const DUMMY = {
  memberId: 4,
  nickname: "updated 스펜서",
  profileImageUrl: "spencer.jpg",
};

const UserProfile = () => {
  return (
    <UserProfileContainer>
      <Avatar
        alt={DUMMY.nickname}
        src="/example.jpg"
        sx={{
          width: "28vw",
          height: "28vw",
          maxWidth: "140px",
          maxHeight: "140px",
          mr: "20px",
        }}
      />
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "60vw",
            height: "100%",
            gap: "5px",
            mb: "6px",
          }}
        >
          <h5>{DUMMY.nickname}</h5>
          <BaseButton
            width="5rem"
            height={24}
            btnType="white"
            text="로그아웃"
            typography="subtitle2"
            style={{
              display: "flex",
            }}
          />
        </Box>
        {/* <Box sx={{ display: "flex", gap: "4px" }}>
          <Chip icon={<MoodIcon />} label="11" variant="outlined" />
          <Chip
            icon={<SentimentSatisfiedIcon />}
            label="5"
            variant="outlined"
          />
          <Chip
            icon={<SentimentVeryDissatisfiedIcon />}
            label="3"
            variant="outlined"
          />
        </Box> */}
      </Box>
    </UserProfileContainer>
  );
};

export default UserProfile;

const UserProfileContainer = styled.div`
  display: flex;
`;
