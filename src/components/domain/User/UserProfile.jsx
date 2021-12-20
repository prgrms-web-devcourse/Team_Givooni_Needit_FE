import React from "react";
import BaseButton from "@/components/base/BaseButton";
import styled from "styled-components";
import { Box, Avatar, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Call as CallIcon, Map as MapIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ data, mine = false }) => {
  let navigate = useNavigate();
  const logout = () => {
    navigate("/login", { replace: true });
    localStorage.removeItem("needit_access_token");
  };

  return (
    <UserProfileContainer>
      <Avatar
        src={data.image ? data.image : data.profileImageUrl}
        sx={{
          width: "28vw",
          height: "28vw",
          maxWidth: "140px",
          maxHeight: "140px",
          mr: "20px",
        }}
      />
      <Box>
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
            <h5>
              {data.myProfile.name
                ? data.myProfile.name
                : data.myProfile.nickname}
            </h5>
            {mine && (
              <BaseButton
                width="5rem"
                height={24}
                btnType="white"
                text="로그아웃"
                onClick={logout}
                typography="subtitle2"
                style={{
                  display: "flex",
                }}
              />
            )}
          </Box>
          {data.myProfile.role === "CENTER" && (
            <Box>
              <Box display="flex" sx={{ mt: "14px" }}>
                <CallIcon />
                <Typography>{data.myProfile.contact}</Typography>
              </Box>
              <Box display="flex">
                <MapIcon />
                <Typography display="inline">
                  {data.myProfile.address}
                </Typography>
              </Box>
            </Box>
          )}
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

UserProfile.propTypes = {
  data: PropTypes.object,
  mine: PropTypes.bool,
};

const UserProfileContainer = styled.div`
  display: flex;
`;

// const UserData = styled.div`
//   border: none;
//   width: 100%;
//   height: auto;
//   font-size: 12px;
//   font-family: "Spoqa Han Sans Neo";
// `;
