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
import MediaQueryStyle from "@/styles/MediaQueryStyle";

const DonationsPage = () => {
  const state = useContext(StateContext);
  const tags = state.selectedTags.map((tag) => tag["id"]);
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [morePage, setMorePage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    const fetchPost = await getRequest("donations/search", {
      params: {
        page: 1,
        size: 10 * page,
        tags: tags.join(),
        category: state.selectedCategory,
        location: state.selectedTown,
      },
    });
    setPostList(fetchPost.data.content);
    fetchPost.data.content.length == postList.length && setMorePage(false);
    setIsLoading(true);
  }, [state, page]);

  return (
    <PostsViewContainer>
      <Header type="member" fixed />
      <MediaQueryStyle>
        <TagFilter />
        <PostFilter />
        {isLoading ? (
          <>
            <PostContainer>
              {postList?.map((post, id) => {
                return <PostCard key={id} data={post} />;
              })}
            </PostContainer>
            <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
              {morePage ? (
                <div onClick={() => setPage(page + 1)}>
                  <BaseButton btnType="transparent" text="더보기" />
                </div>
              ) : (
                <div
                  onClick={() =>
                    window.scrollTo({
                      behavior: "smooth",
                      left: 0,
                      top: 0,
                    })
                  }
                >
                  <BaseButton
                    btnType="transparent"
                    text="더이상 불러올 게시글이 없습니다. 
            "
                    width="auto"
                  />
                </div>
              )}
            </Box>
          </>
        ) : (
          <LoadingCircular />
        )}
      </MediaQueryStyle>
      <Nav />
    </PostsViewContainer>
  );
};

export default DonationsPage;

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
