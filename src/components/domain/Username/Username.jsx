import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import { Box, Typography, Button } from "@mui/material";
import UserProfile from "./UserProfile";
import theme from "@/styles/theme";
const Username = () => {
  const buttonStyle = {
    background: theme.palette.gray.light,
    width: "100%",
    color: theme.palette.primary.main,
    margin: "5px 0",
    border: `1px solid ${theme.palette.gray.main}`,
    borderRadius: "8px",
  };

  return (
    <UsernameContainer>
      <Header type="edit" />
      <Box sx={{ p: "16px" }}>
        <UserProfile />
        {/* <UserIntroEdit placeholder="자기소개를 입력하세요"></UserIntroEdit> */}
        <Box sx={{ my: "8px" }}>
          <Button color="gray_dark" sx={buttonStyle}>
            내가 쓴 글
          </Button>
          <Button color="gray_dark" sx={buttonStyle}>
            관심센터
          </Button>
        </Box>
        <UserIntro>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            자기소개
          </Typography>
        </UserIntro>
      </Box>
      <Nav />
    </UsernameContainer>
  );
};

export default Username;

const UsernameContainer = styled.div``;

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
