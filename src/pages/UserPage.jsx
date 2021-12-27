import React, { useState, useEffect } from "react";
import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import { Button, Box, Typography } from "@mui/material";
import theme from "@/styles/theme";
import UserPosts from "@/components/domain/User/UserPosts";
import UserLikes from "@/components/domain/User/UserLikes";
import UserProfile from "@/components/domain/User/UserProfile";
import UserEdit from "@/components/domain/User/UserEdit";
import { getRequest } from "@/api/axios";
import LoadingCircular from "@/components/base/LoadingCircular";

const UserPage = () => {
  const [userData, setUserData] = useState("");
  const [myProfile, setMyProfile] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRequest("users").then((res) => {
      setUserData(res.data);
      res.data.myProfile.role === "MEMBER"
        ? getRequest(`members/${res.data.myProfile.id}`).then((res) =>
            setMyProfile(res.data)
          )
        : getRequest(`centers/${res.data.myProfile.id}`).then((res) =>
            setMyProfile(res.data)
          );
      setIsLoading(true);
    });
  }, []);

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

  const userIntroStyle = {
    background: "#f6f6f6",
    border: "1px solid #e8e8e8",
    boxSizing: "borderBox",
    borderRadius: " 8px",
    height: "170px",
    padding: "10px",
    overflow: "auto",
  };

  const [component, setComponent] = useState("UserIntro");

  let buttonList = [
    ["UserPosts", "작성한 글"],
    ["UserIntro", "자기소개"],
    ["UserLikes", "관심센터"],
  ];
  !userData.myFavorite && buttonList.pop();

  const userInpo = {
    UserIntro: isLoading ? (
      <Box sx={{ userIntroStyle }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {userData.myProfile.introduction
            ? userData.myProfile.introduction
            : "자기소개가 없습니다."}
        </Typography>
      </Box>
    ) : (
      <LoadingCircular />
    ),
    UserPosts: isLoading ? (
      <UserPosts myPosts={userData.myPost} />
    ) : (
      <LoadingCircular />
    ),
    UserLikes: isLoading ? (
      <UserLikes myFavorites={userData.myFavorite} />
    ) : (
      <LoadingCircular />
    ),
  };

  return isLoading ? (
    <Box sx={{ pt: "6rem" }}>
      {!onEdit ? (
        <>
          <Header type="searchOut" fixed />
          <Button
            sx={{
              position: "fixed",
              top: "20px",
              right: "44px",
              zIndex: "10000",
              fontSize: "16px",
            }}
            onClick={() => setOnEdit(true)}
          >
            편집
          </Button>

          <Box sx={{ p: "16px" }}>
            <UserProfile data={userData} mine />
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
        </>
      ) : (
        <UserEdit
          myProfile={userData.myProfile}
          Intro={myProfile.introduction}
        />
      )}
    </Box>
  ) : (
    <LoadingCircular />
  );
};

export default UserPage;
