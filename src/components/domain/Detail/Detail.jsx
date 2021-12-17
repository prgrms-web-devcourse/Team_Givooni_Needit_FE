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

import Nav from "@/components/base/Nav";
import Header from "@/components/base/Header";
import Slider from "@/components/base/Slider";
import BaseButton from "@/components/base/BaseButton";
import Profile from "@/components/base/Profile";
import theme from "@/styles/theme";
import { getRequest, postRequest, deleteRequest } from "@/api/axios";

import { useParams, Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
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
  const [isClickMoreVert, setIsClickMoreVert] = useState(false);
  const [open, setOpen] = useState(false);
  const [giveButton, setGiveButton] = useState(giveUncomplete);
  const [modalImgLink, setModalImgLink] = useState("");
  const { postId } = useParams();
  const bearerToken = "Bearer ".concat(
    localStorage.getItem("neetit_access_token")
  );
  let requestTarget =
    window.location.href.split("/").indexOf("donations") > -1
      ? "donations"
      : "wishes";
  const [userId, setUserId] = useState("");
  useEffect(async () => {
    const userData = await getRequest(`users`, {
      headers: {
        Authorization: bearerToken,
      },
    });
    setUserId(userData.data.myProfile.id);

    const writeApi = await getRequest(`${requestTarget}/${postId}`);
    setDetailData(writeApi.data);
    isCommentExist();
  }, []);
  const modalImgOpen = ({ target }) => {
    setModalImgLink(target.currentSrc);
    setOpen(true);
  };
  const modalImgClose = () => setOpen(false);
  // follow 대상인지 아닌지에 따라 팔로우 하트 혹은 언팔로우 하트 추가
  const IsFollow = () => {
    return false;
  };
  //comment가 로그인한 대상이 작성했는지 체크
  const isCommentExist = () => {
    let isExist = false;
    detailData.comments &&
      detailData.comments.map((comment) => {
        if (comment.userId === userId) {
          setGiveButton(giveComplete);
          isExist = true;
        }
      });
    return isExist;
  };
  const clickGiveCommentBtn = async () => {
    if (giveButton.text === "기부신청") {
      await postRequest(`${requestTarget}/${postId}/comments`, {
        data: {
          comment: "기부신청",
        },
        headers: {
          Authorization: bearerToken,
        },
      });
      setGiveButton(giveComplete);
    } else if (giveButton.text === "기부완료") {
      // 자신의 comment 삭제 이벤트
      setGiveButton(giveUncomplete);
    }
  };

  const deleteMyComment = async (commentID) => {
    await deleteRequest(`${requestTarget}/${postId}/comments/${commentID}`, {
      headers: {
        Authorization: bearerToken,
      },
    });
  };

  const clickDeleteWriteHanlder = async () => {
    await deleteRequest(`${requestTarget}/${postId}`, {
      headers: {
        Authorization: bearerToken,
      },
    });
  };

  return (
    <>
      <MainContainer>
        <Header type="plain" fixed={true} />
        <WriteContainer>
          <WriteSubContainer>
            <TextSliderAvatarContainer>
              <Avatar sx={{ width: 50, height: 50 }} />
              <TextSliderContainer>
                <div>{detailData.userName}</div>
                <Slider
                  id="기부진행"
                  toggle={true}
                  onChange={(data) => {
                    console.log(data);
                  }}
                />
              </TextSliderContainer>
            </TextSliderAvatarContainer>
            {userId === detailData.userId ? (
              <MoreVertIcon
                onClick={() => {
                  setIsClickMoreVert(!isClickMoreVert);
                }}
              />
            ) : IsFollow() ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
            {isClickMoreVert ? (
              <>
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
                <Link to={`/${requestTarget}`}>
                  <CustomDeleteOutlineIcon
                    onClick={() => {
                      clickDeleteWriteHanlder();
                    }}
                  />
                </Link>
              </>
            ) : (
              <></>
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
                return <CustomImg src={link} key={i} onClick={modalImgOpen} />;
              })}
            <Modal
              open={open}
              onClose={modalImgClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img src={modalImgLink} />
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
                  width={23.65}
                  height={17.4}
                  comments={detailData.comments}
                />
                <CustomCommentNum>
                  참여자 수 {detailData.userCnt}명
                </CustomCommentNum>
              </ProfileContainer>
              {userId !== detailData.userId ? (
                <BaseButton
                  width={80}
                  height={28}
                  fontWeight={500}
                  fontSize={12}
                  text={giveButton.text}
                  tag={giveButton.tag}
                  btnType={giveButton.btnType}
                  onClick={() => {
                    console.log("!!!!");
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
                        <Avatar
                          sx={{ width: 30, height: 30 }}
                          src={part.userImage}
                        />
                        <MemberName>{part.userName}</MemberName>
                      </MemberContainer>
                      {part.userId === userId ? (
                        <DeleteOutlineIcon
                          onClick={() => {
                            deleteMyComment(part.id);
                          }}
                        />
                      ) : (
                        <MailOutlineIcon
                          onClick={() => {
                            console.log("메일보내기 기능");
                          }}
                        />
                      )}
                    </MemberDeleteContainer>
                    <JoinCommentContainer>
                      <Comment>기부할래요!</Comment>
                    </JoinCommentContainer>
                  </CardContainer>
                );
              })}
          </CommnentSubContainer>
        </CommentContainer>
        <Nav />
      </MainContainer>
    </>
  );
};
const MainContainer = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.palette.placeholder.main};
`;
const WriteContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 82px;
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

const CustomDeleteOutlineIcon = styled(DeleteOutlineIcon)`
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
  height: 30px;
  background: ${theme.palette.gray.light};
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 6px 10px;
`;
const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const CustomContent = styled.div`
  width: 320px;
  height: 126px;
  background: ${theme.palette.gray.light};
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 6px 10px;
`;
const ImageWrapContainer = styled.div`
  margin-top: 9px;
  margin-bottom: 11px;
  margin-left: 26px;
  max-width: 500px;
  white-space: nowrap;
`;
const ScrollWrapContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
`;
const CustomImg = styled.img`
  width: 100px;
  height: 140px;
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
  margin-top: 27px;
  padding-bottom: 56px;
  display: flex;
  justify-content: center;
`;
const ProfileContainer = styled.div`
  display: flex;
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
  padding: 14px 10px;
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
  color: ${theme.palette.placeholder.main};
  margin-left: 38px;
  margin-right: 38px;
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
  font-weight: bold;
  margin-left: 8px;
`;
export default Detail;
