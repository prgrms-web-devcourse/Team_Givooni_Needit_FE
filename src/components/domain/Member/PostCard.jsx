import { useState } from "react";
import styled from "styled-components";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import theme from "@/styles/theme";
import { format } from "date-fns";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import BaseButton from "@/components/base/BaseButton";
import MemberProfile from "./MemberProfile";
import { Link } from "react-router-dom";

const DUMMY = {
  message: "success",
  data: {
    id: 1, // 기부글 식별자
    title: "기부",
    content: "기부할래요 기부할래요? 기부할래요!",
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

const PostCard = () => {
  let DUMMY_LIKE = [2, 3];
  const [like, setLike] = useState(DUMMY_LIKE.includes(DUMMY.data.memberId));
  const [more, setMore] = useState(false);

  const UserLike = (id) => {
    DUMMY_LIKE.includes(id)
      ? (DUMMY_LIKE = DUMMY_LIKE.filter((value) => value !== id)) &&
        setLike(!like)
      : DUMMY_LIKE.push(id) && setLike(!like);
  };

  const moreContents = () => {
    setMore(!more);
  };

  console.log(DUMMY);
  return (
    <div style={{ width: "320px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: "10px",
          backgroundColor: theme.palette.gray.light,
          borderRadius: "8px",
          minHeight: "160px",
        }}
      >
        <CardMainContainer>
          <Avatar
            sx={{ width: 50, height: 50 }}
            component={Link}
            to={`/${DUMMY.data.memberId}`}
          />
          <Box sx={{ width: "100%" }}>
            <CardHeader>
              <CardHeaderTitle
                sx={{ display: "flex", height: "50%", alignContent: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1">
                    {DUMMY.data.member}
                  </Typography>
                  {like ? (
                    <IconButton
                      color="like"
                      onClick={() => UserLike(DUMMY.data.memberId)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      color="like"
                      onClick={() => UserLike(DUMMY.data.memberId)}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  )}
                </Box>
                <Box sx={{ height: "100%" }}>
                  <Typography variant="subtitle2">
                    {format(new Date(DUMMY.data.createdDate), "MM.dd")}
                  </Typography>
                </Box>
              </CardHeaderTitle>
              <TagContainer>
                {DUMMY.data.tags.map((tag, index) => (
                  <BaseButton
                    key={index}
                    tag="primary"
                    width="auto"
                    height="18px"
                    text={tag}
                    typography="subtitle2"
                  />
                ))}
              </TagContainer>
            </CardHeader>
            {more ? (
              <Box sx={{ display: "flex" }}>
                <ContentContainer>
                  {DUMMY.data.content}
                  <IconButton
                    sx={{ transform: "scaleY(-1)", ml: "auto" }}
                    onClick={moreContents}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </ContentContainer>
              </Box>
            ) : (
              <Box sx={{ display: "flex" }}>
                <EllipsisContentContainer>
                  {DUMMY.data.content}
                </EllipsisContentContainer>
                <IconButton onClick={moreContents}>
                  <ExpandMoreIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </CardMainContainer>
        <CardFooterContainer>
          <Box sx={{ display: "flex" }}>
            <MemberProfile width={16} height={16} users={DUMMY.data.comments} />
            <Typography typography="subtitle2">
              참여자 수 {DUMMY.data.comments.length}명
            </Typography>
          </Box>

          <TagContainer>
            <BaseButton
              tag={DUMMY.data.status === "기부진행" ? "primary" : "gray_dark"}
              width="auto"
              height="24px"
              text={DUMMY.data.status}
              typography="subtitle2"
            />
            <BaseButton
              tag="primary"
              width="auto"
              height="24px"
              text={DUMMY.data.category}
              typography="subtitle2"
            />
          </TagContainer>
        </CardFooterContainer>
      </Box>
    </div>
  );
};

export default PostCard;

const CardMainContainer = styled.div`
  display: flex;
  background-color: orange;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  background-color: white;
  margin: 0 0 10px 8px;
`;

const CardHeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EllipsisContentContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 2px;
`;
