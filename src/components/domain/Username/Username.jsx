import React from "react";
import Header from "@/components/base/Header";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import UserProfile from "./UserProfile";
import UserTab from "./UserTab";

const Username = () => {
  return (
    <UsernameContainer>
      <Header type="edit" />
      <Box sx={{ p: "5vw" }}>
        <UserProfile />
        {/* <UserIntroEdit placeholder="자기소개를 입력하세요"></UserIntroEdit> */}
        <UserIntro>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            자기소개
          </Typography>
        </UserIntro>
        <UserTab />
      </Box>
    </UsernameContainer>
  );
};

export default Username;

const UsernameContainer = styled.div`
  margin-top: 5rem;
`;

const UserIntro = styled.div`
  background: #f6f6f6;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  height: 170px;
  margin: 10px 0;
  padding: 10px;
  overflow: auto;
`;

// const UserIntroEdit = styled.textarea`
//   background: #f6f6f6;
//   border: 1px solid #e8e8e8;
//   box-sizing: border-box;
//   border-radius: 8px;
//   height: 170px;
//   width: 100%;
//   margin: 10px 0;
//   padding: 10px;
//   font-size: 14px;
//   font-family: "Spoqa Han Sans Neo";
//   color: #8e8e8e;
//   resize: none;
//   &:focus {
//     outline: none;
//   }
// `;
