import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import { Box, Typography, Button } from "@mui/material";
import UserProfile from "./UserProfile";
import theme from "@/styles/theme";
import { useState } from "react";
import UserPosts from "./UserPosts";
import UserLikes from "./UserLikes";
import { useParams } from "react-router";
import { getRequest } from "@/api/axios";

const User = () => {
  const { centerId } = useParams();
  getRequest(`centers/${centerId}`).then((res) => console.log(res));

  const buttonStyle = {
    display: "flex",
    background: theme.palette.gray.light,
    width: "100%",
    height: "40px",
    color: theme.palette.primary.main,
    my: "15px",
    border: `1px solid ${theme.palette.gray.main}`,
    borderRadius: "20px",
  };
  const [component, setComponent] = useState("UserIntro");

  const buttonList = [
    ["UserPosts", "작성한 글"],
    ["UserLikes", "관심센터"],
    ["UserIntro", "자기소개"],
  ];

  const userInpo = {
    UserIntro: (
      <UserIntro>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          자기소개
        </Typography>
      </UserIntro>
    ),
    UserPosts: <UserPosts />,
    UserLikes: <UserLikes />,
  };

  return (
    <UserContainer>
      <Header type="edit" />

      <Box sx={{ p: "16px" }}>
        <UserProfile />
        <Box
          sx={{
            display: "flex",
            mx: "auto",
            width: "95%",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {buttonList.map((list, index) => {
            if (component !== list[0])
              return (
                <Button
                  key={index}
                  color="gray_dark"
                  sx={buttonStyle}
                  onClick={() => setComponent(list[0])}
                >
                  {list[1]}
                </Button>
              );
          })}
        </Box>
        {userInpo[component]}
      </Box>
      <Nav />
    </UserContainer>
  );
};

export default User;

const UserContainer = styled.div``;

const UserIntro = styled.div`
  background: #f6f6f6;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  height: 170px;
  padding: 10px;
  overflow: auto;
`;
