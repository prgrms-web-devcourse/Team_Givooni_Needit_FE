import React from "react";
import BaseButton from "@/components/base/BaseButton";
import styled from "styled-components";
import { Box, Avatar, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Call as CallIcon, Map as MapIcon } from "@mui/icons-material";

const UserProfile = ({ data, mine = false }) => {
  return (
    <UserProfileContainer>
      <Avatar
        alt={data.name ? data.name : data.nickname}
        src={data.profileImageUrl}
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
            <h5>{data.name ? data.name : data.nickname}</h5>
            {mine && (
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
            )}
          </Box>
          {data.owner && (
            <Box>
              <Box display="flex" sx={{ mt: "14px" }}>
                <CallIcon />
                <Typography>{data.contact}</Typography>
              </Box>
              <Box display="flex">
                <MapIcon />
                <Typography display="inline">{data.address}</Typography>
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
