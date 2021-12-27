import React from "react";
import PostCard from "@/components/domain/Posts/PostCard";
import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

const PostContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
const UserPosts = ({ myPosts }) => {
  return (
    <Box sx={{ PostContainerStyle }}>
      {myPosts[0] ? (
        myPosts.map((post, id) => {
          return <PostCard key={id} data={post} />;
        })
      ) : (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <Typography color="primary" variant="subtitle1" marginTop="16px">
            작성한 글이 없습니다
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserPosts;

UserPosts.propTypes = {
  myPosts: PropTypes.object,
};
