import React from "react";
import { Typography, Box, Avatar, IconButton } from "@mui/material";
import styled from "styled-components";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import PropTypes from "prop-types";

const UserLikes = ({ myFavorites }) => {
  return (
    <LikeProfileContainer>
      {myFavorites?.map((like, idx) => {
        return (
          <LikeProfile key={idx}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Avatar src={like.profileImageUrl} />
              <Typography
                color="primary"
                variant="subtitle1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {like.name}
              </Typography>
            </Box>
            <IconButton color="like">
              <FavoriteIcon />
            </IconButton>
          </LikeProfile>
        );
      })}
    </LikeProfileContainer>
  );
};

export default UserLikes;

UserLikes.propTypes = {
  myFavorites: PropTypes.object,
};

const LikeProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 50vh;
  margin-top: 12px;
  padding: 4px;
  overflow: auto;
`;
const LikeProfile = styled.div`
  display: flex;
  justify-content: space-between;
`;
