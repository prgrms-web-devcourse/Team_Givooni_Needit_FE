import React, { useState } from "react";
import { Typography, Box, Avatar, IconButton } from "@mui/material";
import styled from "styled-components";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { deleteRequest } from "@/api/axios";

const UserLikes = ({ myFavorites }) => {
  const [likes, setlikes] = useState(myFavorites);

  const handleLike = (idx) => {
    console.log(myFavorites[idx].centerId);
    deleteRequest(`favorites/${myFavorites[idx].centerId}`);
    setlikes(likes.filter((_, index) => index !== idx));
  };

  return (
    <LikeProfileContainer>
      {likes[0] ? (
        likes?.map((like, idx) => {
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
              <IconButton color="like" onClick={() => handleLike(idx)}>
                <FavoriteIcon />
              </IconButton>
            </LikeProfile>
          );
        })
      ) : (
        <LikeProfile>
          <Box
            sx={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Typography color="primary" variant="subtitle1">
              등록된 관심센터가 없습니다
            </Typography>
          </Box>
        </LikeProfile>
      )}
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
