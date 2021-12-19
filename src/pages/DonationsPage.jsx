import React, { useState, useEffect, useContext } from "react";
import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import PostCard from "@/components/domain/Posts/PostCard";
import TagFilter from "@/components/domain/Posts/TagFilter";
import PostFilter from "@/components/domain/Posts/PostFilter";
import { StateContext } from "@/context";
import { getRequest } from "@/api/axios";

const DonationsPage = () => {
  const state = useContext(StateContext);
  const tags = state.selectedTags.map((tag) => tag["id"]);
  const [postList, setPostList] = useState([]);

  console.log("테스트");

  useEffect(() => {
    getRequest("donations/search", {
      params: {
        page: 1,
        size: 20,
        tags: tags.join(),
        category: state.selectedCategory,
        location: state.selectedTown,
      },
    }).then((res) => setPostList(res.data.content));
  }, [state]);

  return (
    <PostsViewContainer>
      <Header type="member" fixed />
      <TagFilter />
      <PostFilter />
      <PostContainer>
        {postList?.map((post, id) => {
          return <PostCard key={id} data={post} />;
        })}
      </PostContainer>
      <Nav />
    </PostsViewContainer>
  );
};

export default DonationsPage;

const PostsViewContainer = styled.div`
  margin-top: 5rem;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 10px;
`;
