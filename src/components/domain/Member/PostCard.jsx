import { useState, useRef, useEffect } from "react";
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
import PropTypes from "prop-types";

const PostCard = ({ DUMMY }) => {
  let DUMMY_LIKE = [2, 3];
  const [like, setLike] = useState(DUMMY_LIKE.includes(DUMMY.data.memberId));
  const [overflow, setoverflow] = useState(false);
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

  const checkOver = useRef();
  useEffect(() => {
    checkOver.current?.scrollHeight > 48
      ? setoverflow(true)
      : setoverflow(false);
  });

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: "10px",
          backgroundColor: theme.palette.gray.light,
          borderRadius: "8px",
          minHeight: "140px",
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
                <EllipsisContentContainer ref={checkOver}>
                  {DUMMY.data.content}
                </EllipsisContentContainer>
                {overflow ? (
                  <IconButton onClick={moreContents}>
                    <ExpandMoreIcon />
                  </IconButton>
                ) : null}
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

PostCard.propTypes = {
  DUMMY: PropTypes.any.isRequired,
};

const CardMainContainer = styled.div`
  display: flex;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
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
