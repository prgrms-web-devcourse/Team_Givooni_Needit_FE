import React from "react";
import BaseButton from "@/components/base/BaseButton";
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
    <Box display="flex">
      <Avatar
        src={
          data.myProfile.image
            ? data.myProfile.image
            : data.myProfile.profileImageUrl
        }
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
              <Box display="flex" sx={{ gap: "4px", mt: "14px" }}>
                <CallIcon />
                <Typography>{data.myProfile.contact}</Typography>
              </Box>
              <Box display="flex" sx={{ gap: "4px" }}>
                <MapIcon />
                <Typography display="inline">
                  {data.myProfile.address}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  data: PropTypes.object,
  mine: PropTypes.bool,
};
