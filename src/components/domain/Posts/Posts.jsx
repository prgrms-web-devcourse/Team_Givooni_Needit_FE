import React, { useState, useEffect, useRef, useContext } from "react";
import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import PostCard from "./PostCard";
import styled from "styled-components";
import TagFilter from "./TagFilter";
import PostFilter from "./PostFilter";
import { StateContext } from "@/context";

const DUMMY1 = {
  message: "success",
  data: {
    id: 1, // 기부글 식별자
    title: "기부",
    content:
      "기부할래요 기부할래요? 기부할래요! 기부할래요 기부할래요 기부할래요? 기부할래요! 기부할래요",
    category: "물품나눔",
    quality: "보통",
    status: "기부진행",
    memberId: 1, // 기부글 작성자 : 식별자 아이디(회원)
    member: "부리", // 기부글 작성자 : 회원 닉네임
    centerCnt: 2, // 기부희망댓글 작성자 수(참여자수)
    createdDate: "2021-12-05T02:18:21.807641",
    updatedDate: "2021-12-05T19:50:29.063482",
    tags: ["아동 · 청소년", "가족 · 여성", "지구촌"],
    comments: [
      {
        id: 1, // 기부희망댓글 식별자
        comment: "기부희망",
        centerId: 1, // 기부희망댓글 작성자 식별자 아이디(센터)
        center: "기부니 센터", // 기부희망댓글 작성자 : 센터 이름
        centerImage: "test",
        createdDate: "2021-12-06T03:02:21.597399",
        updatedDate: "2021-12-06T03:39:41.936613",
      },
      {
        id: 2,
        comment: "기부희망",
        centerId: 1,
        center: "니드잇 센터",
        centerImage: "test",
        createdDate: "2021-12-06T16:18:29.599477",
        updatedDate: "2021-12-06T16:18:29.599477",
      },
    ],
  },
};

const DUMMY2 = {
  message: "success",
  data: {
    id: 2, // 기부글 식별자
    title: "기부",
    content: "기부할래요!",
    category: "재능기부",
    quality: "보통",
    status: "기부진행",
    memberId: 2, // 기부글 작성자 : 식별자 아이디(회원)
    member: "타이", // 기부글 작성자 : 회원 닉네임
    centerCnt: 2, // 기부희망댓글 작성자 수(참여자수)
    createdDate: "2021-12-05T02:18:21.807641",
    updatedDate: "2021-12-05T19:50:29.063482",
    tags: ["장애인", "가족 · 여성", "지구촌"],
    comments: [
      {
        id: 1, // 기부희망댓글 식별자
        comment: "기부희망",
        centerId: 1, // 기부희망댓글 작성자 식별자 아이디(센터)
        center: "기부니 센터", // 기부희망댓글 작성자 : 센터 이름
        centerImage: "test",
        createdDate: "2021-12-06T03:02:21.597399",
        updatedDate: "2021-12-06T03:39:41.936613",
      },
      {
        id: 2,
        comment: "기부희망",
        centerId: 1,
        center: "니드잇 센터",
        centerImage: "test",
        createdDate: "2021-12-06T16:18:29.599477",
        updatedDate: "2021-12-06T16:18:29.599477",
      },
    ],
  },
};

const DUMMY3 = {
  message: "success",
  data: {
    id: 1, // 기부글 식별자
    title: "기부",
    content:
      "기부할래요 기부할래요? 기부할래요! 기부할래요 기부할래요 기부할래요? 기부할래요! 기부할래요",
    category: "재능기부",
    quality: "보통",
    status: "기부마감",
    memberId: 1, // 기부글 작성자 : 식별자 아이디(회원)
    member: "이름이 길어서 기부니가 조은 기부니", // 기부글 작성자 : 회원 닉네임
    centerCnt: 2, // 기부희망댓글 작성자 수(참여자수)
    createdDate: "2021-12-05T02:18:21.807641",
    updatedDate: "2021-12-05T19:50:29.063482",
    tags: ["동물", "가족"],
    comments: [
      {
        id: 1, // 기부희망댓글 식별자
        comment: "기부희망",
        centerId: 1, // 기부희망댓글 작성자 식별자 아이디(센터)
        center: "기부니 센터", // 기부희망댓글 작성자 : 센터 이름
        centerImage: "test",
        createdDate: "2021-12-06T03:02:21.597399",
        updatedDate: "2021-12-06T03:39:41.936613",
      },
      {
        id: 2,
        comment: "기부희망",
        centerId: 1,
        center: "니드잇 센터",
        centerImage: "test",
        createdDate: "2021-12-06T16:18:29.599477",
        updatedDate: "2021-12-06T16:18:29.599477",
      },
    ],
  },
};
const Posts = () => {
  const [postList, setPostList] = useState([
    DUMMY1,
    DUMMY2,
    DUMMY3,
    DUMMY2,
    DUMMY3,
    DUMMY1,
  ]);
  const fetchBox = useRef();

  const fetchPostList = () => {
    setPostList([...postList, DUMMY1, DUMMY2, DUMMY3]);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await fetchPostList();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (fetchBox.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(fetchBox.current);
    }
    return () => observer && observer.disconnect();
  }, [postList]);

  const state = useContext(StateContext);
  console.log(state);

  return (
    <PostsViewContainer>
      <Header type="member" />
      <TagFilter />
      <PostFilter />
      <PostContainer>
        {postList.map((post, id) => {
          return <PostCard key={id} DUMMY={post} />;
        })}
      </PostContainer>
      <Nav />
      <LoadingContainer ref={fetchBox}></LoadingContainer>
    </PostsViewContainer>
  );
};

export default Posts;

const PostsViewContainer = styled.div``;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 10px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: red;
`;
