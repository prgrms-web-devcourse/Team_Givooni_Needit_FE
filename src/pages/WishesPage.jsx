import React, { useState, useEffect, useContext } from "react";
import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import PostCard from "@/components/domain/Posts/PostCard";
import TagFilter from "@/components/domain/Posts/TagFilter";
import PostFilter from "@/components/domain/Posts/PostFilter";
import { StateContext } from "@/context";
import { getRequest } from "@/api/axios";
import { Box } from "@mui/material";
import BaseButton from "@/components/base/BaseButton";
import LoadingCircular from "@/components/base/LoadingCircular";

const WishesPage = () => {
  const state = useContext(StateContext);
  const tags = state.selectedTags.map((tag) => tag["id"]);
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [morePage, setMorePage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteList, setFavoriteList] = useState("");

  useEffect(async () => {
    const userFavorite = await getRequest("users");
    setFavoriteList(
      userFavorite.data.myFavorite.map((center) => center.centerId)
    );
  }, []);

  useEffect(async () => {
    const fetchPost = await getRequest("wishes/search", {
      params: {
        page: 1,
        size: 10 * page,
        tags: tags.join(),
        category: state.selectedCategory,
        location: state.selectedTown,
      },
    });
    setPostList(fetchPost.data.content.reverse());
    fetchPost.data.content.length == postList.length && setMorePage(false);
    setIsLoading(true);
  }, [state, page]);

  return (
    <PostsViewContainer>
      <Header type="member" fixed />
      <TagFilter />
      <PostFilter />
      {isLoading && favoriteList ? (
        <>
          <PostContainer>
            {postList?.map((post, id) => {
              return (
                <PostCard
                  key={id}
                  data={post}
                  isFavorite={favoriteList?.includes(post.userId)}
                  isWishes
                />
              );
            })}
          </PostContainer>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
            {morePage ? (
              <BaseButton
                btnType="transparent"
                text="더보기"
                onClick={() => setPage(page + 1)}
              />
            ) : (
              <BaseButton
                btnType="transparent"
                text="더이상 불러올 포스트가 없습니다. 
            "
                onClick={() => window.scrollTo(0, 0)}
                width="auto"
              />
            )}
          </Box>
        </>
      ) : (
        <LoadingCircular />
      )}
      <Nav />
    </PostsViewContainer>
  );
};

export default WishesPage;

const PostsViewContainer = styled.div`
  margin-top: 5rem;
  padding-bottom: 60px;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 10px;
`;
