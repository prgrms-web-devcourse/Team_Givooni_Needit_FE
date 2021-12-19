import React, { useState, useEffect, useContext } from "react";
import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import PostCard from "@/components/domain/Posts/PostCard";
import TagFilter from "@/components/domain/Posts/TagFilter";
import PostFilter from "@/components/domain/Posts/PostFilter";
import { StateContext } from "@/context";
import { getRequest } from "@/api/axios";

const WishesPage = () => {
  const state = useContext(StateContext);
  const tags = state.selectedTags.map((tag) => tag["id"]);
  const [postList, setPostList] = useState([]);

  // const fetchBox = useRef();

  // const fetchPostList = () => {
  //   setPostList([...postList]);
  // };
  // setLocation(state.userAddress);

  useEffect(() => {
    getRequest("wishes/search", {
      params: {
        page: 1,
        size: 5,
        tags: tags.join(),
        category: state.selectedCategory,
        location: state.selectedTown,
      },
    }).then((res) => setPostList(res.data.content.reverse()));
  }, [state]);

  // const onIntersect = async ([entry], observer) => {
  //   if (entry.isIntersecting) {
  //     observer.unobserve(entry.target);
  //     await fetchPostList();
  //     observer.observe(entry.target);
  //   }
  // };

  // useEffect(() => {
  //   let observer;
  //   if (fetchBox.current) {
  //     observer = new IntersectionObserver(onIntersect, {
  //       threshold: 0.4,
  //     });
  //     observer.observe(fetchBox.current);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [postList]);

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
      {/* <LoadingContainer ref={fetchBox}></LoadingContainer> */}
    </PostsViewContainer>
  );
};

export default WishesPage;

const PostsViewContainer = styled.div`
  margin-top: 5rem;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 10px;
`;

// const LoadingContainer = styled.div`
//   width: 100%;
//   height: 200px;
//   background-color: red;
// `;
