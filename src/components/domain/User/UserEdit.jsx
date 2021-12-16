import React, { useRef, useState } from "react";
import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import BaseButton from "@/components/base/BaseButton";
import { Box, Avatar } from "@mui/material";
import { Call as CallIcon, Map as MapIcon } from "@mui/icons-material";

const DUMMY = {
  memberId: 4,
  nickname: "updated 스펜서",
  profileImageUrl: "spencer.jpg",
  contact: "010-1359-0329",
  address: "인천시 계양구 계양산로134번길 21",
  intro: "하이 마이네임 이즈 수현, 아임 엠마! 아임 지연!  ",
};

const UserEdit = () => {
  const [previewImg, setPreviewImg] = useState(null);
  const [contactInput, setContactInput] = useState(DUMMY["contact"]);
  const [addressInput, setAddressInput] = useState(DUMMY["address"]);
  const [introInput, setIntroInput] = useState(DUMMY["intro"]);
  const profileInput = useRef();

  const uploadImage = () => {
    profileInput.current.click();
  };

  const handleFileChange = (e) => {
    preview(e.target.files[0]);
  };

  const handleContactChange = (e) => {
    setContactInput(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddressInput(e.target.value);
  };
  const handleIntroChange = (e) => {
    setIntroInput(e.target.value);
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
            <Box display="flex" sx={{ mt: "14px" }}>
              <CallIcon />
              <UserDataEdit
                value={contactInput}
                onChange={handleContactChange}
              />
            </Box>
            <Box display="flex">
              <MapIcon />
              <UserDataEdit
                value={addressInput}
                onChange={handleAddressChange}
              />
            </Box>
          </Box>
        </UserProfileContainer>
        <UserIntroEdit
          placeholder="자기소개를 입력하세요"
          value={introInput}
          onChange={handleIntroChange}
        ></UserIntroEdit>
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

const UserDataEdit = styled.textarea`
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  font-size: 12px;
  font-family: "Spoqa Han Sans Neo";
  resize: none;
  &:focus {
    outline: none;
  }
`;

const UserProfileContainer = styled.div`
  display: flex;
`;