import React from "react";
import PostCard from "@/components/domain/Posts/PostCard";
import { Typography, Box } from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";

const UserPosts = ({ myPosts }) => {
  return (
    <PostContainer>
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
    </PostContainer>
  );
};

export default UserPosts;

UserPosts.propTypes = {
  myPosts: PropTypes.object,
};

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
