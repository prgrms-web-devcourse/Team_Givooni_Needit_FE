import { Avatar, Box, Modal } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  MoreVert as MoreVertIcon,
  MailOutline as MailOutlineIcon,
  FavoriteBorder as FavoriteBorderIcon,
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import styled from "styled-components";
import { useState, useEffect } from "react";
import LoadingCircular from "@/components/base/LoadingCircular";
import Nav from "@/components/base/Nav";
import Header from "@/components/base/Header";
import Slider from "@/components/base/Slider";
import BaseButton from "@/components/base/BaseButton";
import Profile from "@/components/base/Profile";
import theme from "@/styles/theme";
import { getRequest, postRequest, deleteRequest } from "@/api/axios";

import { useParams, Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: "70%",
  height: "70%",
  maxWidth: "500px",
  minWidth: "200px",
  p: 4,
};
const giveComplete = {
  text: "신청완료",
  btnType: "gray_dark",
  tag: "primary",
};
const giveUncomplete = {
  text: "기부신청",
  btnType: "white",
  tag: "",
};
const Detail = () => {
  const [detailData, setDetailData] = useState({});
  const [imgOpen, setImgOpen] = useState(false);
  const [giveButton, setGiveButton] = useState(giveUncomplete);
  const [modalImgLink, setModalImgLink] = useState("");
  const { postId } = useParams();
  const [followed, setFollowed] = useState(false);
  const [loginUserId, setLoginUserId] = useState("");
  const [loginUserRole, setLoginUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const requestTarget =
    window.location.href.split("/").indexOf("donations") > -1
      ? "donations"
      : "wishes";

  const bearerToken = "Bearer ".concat(
    localStorage.getItem("needit_access_token")
  );
  useEffect(async () => {
    //작성글에 대한 데이터 저장
    const noFilterWriteData = await getRequest(`${requestTarget}/${postId}`);
    const writeApiData = noFilterWriteData.data;
    setDetailData(writeApiData);

    if (!localStorage.getItem("needit_access_token")) return;
    //user의 고유Id 저장
    const noFilterUserData = await getRequest(`users`);
    const userApiData = noFilterUserData.data;
    setLoginUserId(userApiData.myProfile.id);
    setLoginUserRole(userApiData.myProfile.role);

    //comment가 이미 작성되었는지 확인
    isCommentExist(writeApiData, userApiData.myProfile.id);
    //관심센터에 등록되어 있는지 확인
    IsFollow(writeApiData, userApiData.myFavorite);

    setIsLoading(true);
  }, []);

  //comment가 로그인한 대상이 작성했는지 체크
  const isCommentExist = (writeApiData, userApiIdData) => {
    writeApiData.comments &&
      writeApiData.comments.map((comment) => {
        if (comment.userId === userApiIdData) {
          setGiveButton(giveComplete);
        }
      });
  };

  // follow 대상인지 아닌지에 따라 팔로우 하트 혹은 언팔로우 하트 추가
  const IsFollow = (writeApiData, userApiFollowData) => {
    let result = false;
    userApiFollowData &&
      userApiFollowData.map((follow) => {
        if (follow.centerId === writeApiData.userId) result = true;
      });
    setFollowed(result);
  };

  //사진 모달을 클릭시 동작
  const modalImgOpen = ({ target }) => {
    setModalImgLink(target.currentSrc);
    setImgOpen(true);
  };
  const modalImgClose = () => setImgOpen(false);

  //기부 버튼 클릭시 동작
  const clickGiveCommentBtn = async () => {
    if (giveButton.text === "기부신청") {
      console.log(requestTarget, postId, bearerToken);
      const res = await postRequest(`${requestTarget}/${postId}/comments`, {
        data: {
          comment: "기부희망",
        },
        headers: {
          Authorization: bearerToken,
        },
      });
      if (res && res.message === "success") {
        setGiveButton(giveComplete);
        const detailDataApi = await getRequest(`${requestTarget}/${postId}`);
        setDetailData(detailDataApi.data);
      }
    } else if (giveButton.text === "기부완료") {
      // 자신의 comment 삭제 이벤트
      setGiveButton(giveUncomplete);
    }
  };

  const deleteMyComment = async (commentID) => {
    await deleteRequest(`${requestTarget}/${postId}/comments/${commentID}`);
    setGiveButton(giveUncomplete);
    const detailDataApi = await getRequest(`${requestTarget}/${postId}`);
    setDetailData(detailDataApi.data);
  };

  const clickDeleteWriteHandler = async () => {
    await deleteRequest(`${requestTarget}/${postId}`);
  };

  const unfollow = async () => {
    setFollowed(false);
    await deleteRequest(`favorites/${detailData.userId}`);
  };
  const follow = async () => {
    setFollowed(true);
    await postRequest(`favorites/${detailData.userId}`);
  };

  //같은 userId를 가진 센터와 멤버의 충돌을 막기 위해 사용
  const checkWriter = () => {
    return (
      detailData.userId === loginUserId &&
      ((requestTarget === "wishes" && loginUserRole === "CENTER") ||
        (requestTarget === "donations" && loginUserRole === "MEMBER"))
    );
  };

  const checkIsExistButton = () => {
    return (
      (requestTarget === "wishes" && loginUserRole === "MEMBER") ||
      (requestTarget === "donations" && loginUserRole === "CENTER")
    );
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MainContainer>
        <Header type="plain" fixed={true} />
        {isLoading ? (
          <DetailContainer>
            <WriteContainer>
              <WriteSubContainer>
                <TextSliderAvatarContainer>
                  <Link
                    to={`/${
                      requestTarget === "donations" ? "member" : "center"
                    }/${detailData.userId}`}
                    style={{ cursor: "pointer" }}
                  >
                    <Avatar
                      sx={{ width: 50, height: 50 }}
                      src={detailData.userImage}
                    />
                  </Link>
                  <TextSliderContainer>
                    <Link
                      to={`/${
                        requestTarget === "donations" ? "member" : "center"
                      }/${detailData.userId}`}
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      <TestDiv>{detailData.userName}</TestDiv>
                    </Link>
                    <Slider />
                  </TextSliderContainer>
                </TextSliderAvatarContainer>
                {/* 작성자 === 로그인유저이면 편집을 그외에는 관심하트를  */}
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={handleClose}>
                    <Link
                      to="/writes"
                      state={{
                        prewriteData: detailData,
                      }}
                    >
                      <CustomEditIcon
                        onClick={() => {
                          // 글쓰기 페이지 이동
                          console.log("글쓰기 페이지 이동");
                        }}
                      />
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to={`/${requestTarget}`}>
                      <CustomDeleteOutlineIcon
                        onClick={() => {
                          clickDeleteWriteHandler();
                        }}
                      />
                    </Link>
                  </MenuItem>
                </Menu>
                {checkWriter() ? (
                  <MoreVertIcon
                    onClick={handleClick}
                    sx={{ cursor: "pointer" }}
                  />
                ) : followed ? (
                  <FavoriteIcon onClick={unfollow} sx={{ cursor: "pointer" }} />
                ) : (
                  <FavoriteBorderIcon
                    onClick={follow}
                    sx={{ cursor: "pointer" }}
                  />
                )}
              </WriteSubContainer>
            </WriteContainer>
            <TitleContainer>
              <CustomTitle>{detailData.title}</CustomTitle>
            </TitleContainer>
            <ContentContainer>
              <CustomContent>{detailData.content}</CustomContent>
            </ContentContainer>
            <ImageWrapContainer>
              <ScrollWrapContainer>
                {detailData.images &&
                  detailData.images.map((link, i) => {
                    return (
                      <>
                        <CustomImg src={link} key={i} onClick={modalImgOpen} />
                      </>
                    );
                  })}
                <Modal
                  open={imgOpen}
                  onClose={modalImgClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <img
                      src={modalImgLink}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                </Modal>
              </ScrollWrapContainer>
            </ImageWrapContainer>
            <LineBar />
            <CommentContainer>
              <CommnentSubContainer>
                <GroupContainer>
                  <ProfileContainer>
                    <Profile
                      width={20}
                      height={20}
                      comments={detailData.comments}
                    />
                    <CustomCommentNum>
                      참여자 수 {detailData.userCnt}명
                    </CustomCommentNum>
                  </ProfileContainer>
                  {/* 글쓴이 === 로그인 대상이 아니면 기부참여버튼 추가 */}
                  {checkIsExistButton() ? (
                    <BaseButton
                      width={80}
                      height={28}
                      fontWeight={500}
                      fontSize={12}
                      text={giveButton.text}
                      tag={giveButton.tag}
                      btnType={giveButton.btnType}
                      onClick={() => {
                        clickGiveCommentBtn();
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </GroupContainer>
                {detailData.comments &&
                  detailData.comments.map((part, i) => {
                    return (
                      <CardContainer key={i}>
                        <MemberDeleteContainer>
                          <MemberContainer>
                            <Link
                              to={`/${
                                requestTarget === "donations"
                                  ? "center"
                                  : "member"
                              }/${part.userId}`}
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                textDecoration: "none",
                              }}
                            >
                              <Avatar
                                sx={{ width: 30, height: 30 }}
                                src={part.userImage}
                              />

                              <MemberName>{part.userName}</MemberName>
                            </Link>
                          </MemberContainer>
                          {part.userId === loginUserId &&
                          ((requestTarget === "wishes" &&
                            loginUserRole === "MEMBER") ||
                            (requestTarget === "donations" &&
                              loginUserRole === "CENTER")) ? (
                            <DeleteOutlineIcon
                              onClick={() => {
                                deleteMyComment(part.id);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          ) : checkWriter() ? (
                            <Link
                              to={`/message/${postId}/${
                                requestTarget === "wishes" ? "WISH" : "DONATION"
                              }/${part.userId}`}
                            >
                              <CustomMailOutlineIcon
                                onClick={() => {
                                  console.log("메일보내기 기능");
                                }}
                                style={{ cursor: "pointer" }}
                              />
                            </Link>
                          ) : (
                            <></>
                          )}
                        </MemberDeleteContainer>
                        <JoinCommentContainer>
                          <Comment>기부 참여할래요!</Comment>
                        </JoinCommentContainer>
                      </CardContainer>
                    );
                  })}
              </CommnentSubContainer>
            </CommentContainer>
          </DetailContainer>
        ) : (
          <LoadingCircular />
        )}
        <Nav />
      </MainContainer>
    </>
  );
};
const MainContainer = styled.div`
  color: ${theme.palette.gray.dark};
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const WriteContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;
const WriteSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 314px;
  height: 50px;
  align-items: center;
  margin-top: 13px;
  margin-bottom: 23px;
  color: ${theme.palette.primary.main};
`;
const TextSliderAvatarContainer = styled.div`
  display: flex;
  width: 185px;
  height: 50px;
`;
const TextSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  font-weight: bold;
`;

const TestDiv = styled.div`
  color: ${theme.palette.primary.main};
`;

const CustomDeleteOutlineIcon = styled(DeleteOutlineIcon)`
  color: ${theme.palette.primary.main};
`;
const CustomMailOutlineIcon = styled(MailOutlineIcon)`
  color: ${theme.palette.primary.main};
`;

const CustomEditIcon = styled(EditIcon)`
  color: ${theme.palette.primary.main};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;
const CustomTitle = styled.div`
  width: 320px;
  background: ${theme.palette.gray.light};
  color: ${theme.palette.text.primary};
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 2px 10px;
  ${theme.typography.subtitle1};
  font-weight: 400;
`;
const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const CustomContent = styled.div`
  width: 320px;
  height: 126px;
  background: ${theme.palette.gray.light};
  color: ${theme.palette.text.primary};
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 6px 10px;
  ${theme.typography.body1};
  font-size: 14px;
`;
const ImageWrapContainer = styled.div`
  margin-top: 9px;
  margin-bottom: 11px;
  width: 320px;
  white-space: nowrap;
`;
const ScrollWrapContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
`;
const CustomImg = styled.img`
  max-width: 180px;
  height: 100px;
  object-fit: cover;
  background-color: #f6f6f6;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  margin-right: 10px;
`;
const LineBar = styled.div`
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
`;
const CommentContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 56px;
  display: flex;
  justify-content: center;
`;
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 13px;
  width: 140px;
  height: 25px;
`;
const CustomCommentNum = styled.div`
  margin-left: 3px;
  font-size: 12px;
  text-align: center;
`;
const GroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
  width: 320px;
`;
const CardContainer = styled.div`
  margin-bottom: 17px;
  padding: 10px;
  background-color: ${theme.palette.gray.light};
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  width: 320px;
`;
const JoinCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 293px;
`;
const Comment = styled.div`
  margin-left: 38px;
  margin-right: 38px;
  ${theme.typography.body2};
`;
const MemberContainer = styled.div`
  display: flex;
`;
const CommnentSubContainer = styled.div`
  margin-top: 17px;
`;
const MemberDeleteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${theme.palette.primary.main};
`;
const MemberName = styled.div`
  ${theme.typography.subtitle1};
  margin-left: 8px;
  color: ${theme.palette.primary.main};
  text-decoration: none;
`;
export default Detail;
