import React, { useState } from "react";
import { Typography, Box, Avatar, IconButton } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { deleteRequest } from "@/api/axios";
import { Link } from "react-router-dom";

const LikeProfileContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  height: "50vh",
  mt: "12px",
  padding: "4px",
  overflow: "auto",
};
const LikeProfileStyle = {
  display: "flex",
  justifyContent: "spaceBetween",
};

const UserLikes = ({ myFavorites }) => {
  const [likes, setlikes] = useState(myFavorites);

  const handleLike = (idx) => {
    console.log(myFavorites[idx].centerId);
    deleteRequest(`favorites/${myFavorites[idx].centerId}`);
    setlikes(likes.filter((_, index) => index !== idx));
  };

  return (
    <Box sx={{ LikeProfileContainerStyle }}>
      {likes[0] ? (
        likes?.map((like, idx) => {
          return (
            <Box sx={{ LikeProfileStyle }} key={idx}>
              <Link
                to={`/center/${like.centerId}`}
                style={{ textDecoration: "none" }}
              >
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
              </Link>
              <IconButton color="like" onClick={() => handleLike(idx)}>
                <FavoriteIcon />
              </IconButton>
            </Box>
          );
        })
      ) : (
        <Box sx={{ LikeProfileStyle }}>
          <Box
            sx={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Typography color="primary" variant="subtitle1">
              등록된 관심센터가 없습니다
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserLikes;

UserLikes.propTypes = {
  myFavorites: PropTypes.object,
};
