import React, { useState } from "react";
import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import { Box, Typography, IconButton } from "@mui/material";
import UserProfile from "./UserProfile";
import UserTab from "./UserTab";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
const Username = () => {
  const [fold, setFold] = useState(false);
  return (
    <UsernameContainer>
      <Header type="edit" />
      <Box sx={{ p: "5vw" }}>
        <UserProfile />
        {/* <UserIntroEdit placeholder="자기소개를 입력하세요"></UserIntroEdit> */}

        {!fold ? (
          <>
            <UserIntro>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                자기소개
              </Typography>
            </UserIntro>
            <IconButton
              onClick={() => setFold(!fold)}
              sx={{ position: "absolute", right: 5, zIndex: "1" }}
            >
              <ExpandMoreIcon
                sx={fold ? "" : { transform: "scaleY(-1)", ml: "auto" }}
              />
            </IconButton>
            <Box>
              <UserTab height="30vh" />
            </Box>
          </>
        ) : (
          <>
            <IconButton
              onClick={() => setFold(!fold)}
              sx={{ position: "absolute", right: 5, zIndex: "1" }}
            >
              <ExpandMoreIcon
                sx={fold ? "" : { transform: "scaleY(-1)", ml: "auto" }}
              />
            </IconButton>
            <Box>
              <UserTab height="100%" />
            </Box>
          </>
        )}
      </Box>
      <Nav />
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
