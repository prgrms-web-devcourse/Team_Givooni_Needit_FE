import React from "react";
import PostCard from "@/components/domain/Posts/PostCard";
import styled from "styled-components";
import PropTypes from "prop-types";

const UserPosts = ({ myPosts }) => {
  console.log(myPosts);

  return myPosts ? (
    <PostContainer>
      {myPosts.map((post, id) => {
        return <PostCard key={id} data={post} />;
      })}
    </PostContainer>
  ) : (
    <div>asdsa</div>
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
