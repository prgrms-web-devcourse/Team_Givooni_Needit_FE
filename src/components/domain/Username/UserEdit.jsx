import React, { useRef, useState } from "react";
import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import BaseButton from "@/components/base/BaseButton";
import {
  Mood as MoodIcon,
  SentimentSatisfied as SentimentSatisfiedIcon,
  SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
} from "@mui/icons-material";
import { Box, Avatar, Chip } from "@mui/material";

const DUMMY = {
  memberId: 4,
  nickname: "updated 스펜서",
  profileImageUrl: "spencer.jpg",
};

const UserEdit = () => {
  const [previewImg, setPreviewImg] = useState(null);
  const profileInput = useRef();

  const uploadImage = () => {
    profileInput.current.click();
  };

  const handleFileChange = (e) => {
    preview(e.target.files[0]);
  };

  const preview = (image) => {
    if (!image || !image.type.match("image.*")) return false;
    let reader = new FileReader();
    reader.onload = () => {
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(image);
    profileInput.current.backgroundImage = `url(${reader.result})`;
  };

  return (
    <UsernameContainer>
      <Header type="edit" />
      <Box sx={{ p: "16px" }}>
        <input
          ref={profileInput}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <UserProfileContainer>
          <Avatar
            onClick={uploadImage}
            alt={DUMMY.nickname}
            src={previewImg}
            sx={{
              width: "28vw",
              height: "28vw",
              maxWidth: "140px",
              maxHeight: "140px",
              mr: "2vw",
              cursor: "pointer",
              filter: "brightness(70%)",
            }}
          />
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "60vw",
                gap: "5px",
                mb: "6px",
              }}
            >
              <h5>{DUMMY.nickname}</h5>
              <BaseButton
                width="5rem"
                height={24}
                btnType="white"
                text="수정완료"
                typography="subtitle2"
                style={{
                  display: "flex",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "4px" }}>
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
            </Box>
          </Box>
        </UserProfileContainer>
        <UserIntroEdit placeholder="자기소개를 입력하세요"></UserIntroEdit>
        <Box sx={{ my: "8px" }}></Box>
      </Box>
      <Nav />
    </UsernameContainer>
  );
};

export default UserEdit;

const UsernameContainer = styled.div``;

const UserIntroEdit = styled.textarea`
  background: #f6f6f6;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  height: 170px;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  font-size: 14px;
  font-family: "Spoqa Han Sans Neo";
  color: #8e8e8e;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const UserProfileContainer = styled.div`
  display: flex;
`;
