import React, { useState, useEffect } from "react";
import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import { Box, Typography, Button } from "@mui/material";
import theme from "@/styles/theme";
import UserProfile from "@/components/domain/User/UserProfile";
import UserPosts from "@/components/domain/User/UserPosts";
import UserLikes from "@/components/domain/User/UserLikes";
import { useParams } from "react-router";
import { getRequest } from "@/api/axios";

const CenterPage = () => {
  const { centerId } = useParams();
  const [centerData, setCenterData] = useState("");

  useEffect(() => {
    getRequest(`centers/${centerId}`).then((res) => setCenterData(res.data));
  }, []);
  console.log(centerData);

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
    // ["UserPosts", "작성한 글"],
    ["UserIntro", "자기소개"],
  ];

  const userInpo = {
    UserIntro: (
      <UserIntro>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {centerData.introduction}
        </Typography>
      </UserIntro>
    ),
    UserPosts: <UserPosts />,
    UserLikes: <UserLikes />,
  };

  return (
    <UserContainer>
      <Header type="plain" />

      <Box sx={{ p: "16px" }}>
        <UserProfile data={centerData} />
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
            // if (component !== list[0])
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

export default CenterPage;

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

// const { centerId, memberId } = useParams();
// centerId
//   ? getRequest(`centers/${centerId}`).then((res) => console.log(res))
//   : getRequest(`members/${memberId}`).then((res) => console.log(res));
