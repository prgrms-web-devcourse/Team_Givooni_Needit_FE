import styled from "styled-components";
import { useState, useEffect, useContext } from "react";

import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

import Nav from "@/components/base/Nav";
import Header from "@/components/base/Header";
import Slider from "@/components/base/Slider";
// import Input from "@/components/base/Input";
import BaseButton from "@/components/base/BaseButton";
import Profile from "@/components/base/Profile";
import theme from "@/styles/theme";

import { StateContext } from "@/context/index";

const giveComplete = {
  text: "기부완료",
  type: "gray",
};

const giveUncomplete = {
  text: "기부신청",
  type: "white",
};

const Detail = () => {
  const [detailData, setDetailData] = useState({});
  const [isClickMoreVert, setIsClickMoreVert] = useState(false);
  const [giveButton, setGiveButton] = useState(giveUncomplete);
  const state = useContext(StateContext);

  useEffect(() => {
    //api
    setDetailData(Dummy_Data.data);
    console.log(detailData, Dummy_Data);

    isCommentExist();
  }, [detailData]);

  // follow 대상인지 아닌지에 따라 팔로우 하트 혹은 언팔로우 하트 추가
  const IsFollow = () => {
    return false;
  };

  const isCommentExist = () => {
    let isExist = false;

    detailData.comments &&
      detailData.comments.map((comment) => {
        if (comment.userId === state.userId) {
          setGiveButton(giveComplete);
          isExist = true;
        }
      });

    return isExist;
  };

  const clickGiveCommentBtn = () => {
    if (giveButton.text === "기부신청") {
      //api 실행
      //   const apiData = {
      //     "data": 1, // 해당 기부희망댓글의 식별자 아이디 반환
      //     "message": "success"
      //   }

      setGiveButton(giveComplete);
    } else if (giveButton.text === "기부완료") {
      // 자신의 comment 삭제 이벤트
      setGiveButton(giveUncomplete);
    }
  };

  return (
    <>
      <MainContainer>
        <Header type="main" fixed={true} />
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
            {state.userId === detailData.userId ? (
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
                <EditIcon
                  onClick={() => {
                    // 글쓰기 페이지 이동
                    console.log("글쓰기 페이지 이동");
                  }}
                />
                <DeleteOutlineIcon
                  onClick={() => {
                    console.log("삭제기능구현");
                  }}
                />
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
        <LineBar />
        <CommentContainer>
          <CommnentSubContainer>
            <GroupContainer>
              <ProfileContainer>
                {detailData.comments ? (
                  <Profile
                    width={23.65}
                    height={17.4}
                    comments={detailData.comments}
                  />
                ) : (
                  <></>
                )}
                <CustomCommentNum>
                  참여자 수 {detailData.userCnt}명
                </CustomCommentNum>
              </ProfileContainer>

              {state.userId !== detailData.userId ? (
                <BaseButton
                  width={80}
                  height={28}
                  fontWeight={500}
                  fontSize={12}
                  text={giveButton.text}
                  btnType={giveButton.type}
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
                        <Avatar sx={{ width: 30, height: 30 }} />
                        <MemberName>{part.userName}</MemberName>
                      </MemberContainer>
                      {part.userId === state.userId ? (
                        <DeleteOutlineIcon
                          onClick={() => {
                            console.log("댓글 삭제기능");
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

const Dummy_Data = {
  message: "success",
  data: {
    id: 1,
    title: "재능기부할 사람~",
    content: "기부원해요",
    category: "재능기부",
    status: "기부진행",
    userId: "abcde",
    userName: "테스트 센터",
    userImage: "updated url",
    userCnt: 3,
    boardType: "WISH",
    createdDate: "2021-12-13T23:56:35.714455",
    updatedDate: "2021-12-13T23:59:17.218369",
    tags: ["아동·청소년", "어르신"],
    images: [
      "https://needit-image.s3.ap-northeast-2.amazonaws.com/donation-wish/mask.png-20215913235917",
      "https://needit-image.s3.ap-northeast-2.amazonaws.com/donation-wish/rabbit.png-20215913235917",
    ],
    comments: [
      {
        id: 1,
        comment: "기부신청",
        userId: 123,
        userName: "기부니1",
        userImage: "test.jpg",
        createdDate: "2021-12-14T00:38:39.943698",
        updatedDate: "2021-12-14T00:38:39.943698",
      },
      {
        id: 2,
        comment: "기부신청",
        userId: "abcdef",
        userName: "기부니2",
        userImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/IU_at_%22Persona%22_press_conference%2C_27_March_2019_02.jpg/640px-IU_at_%22Persona%22_press_conference%2C_27_March_2019_02.jpg",
        createdDate: "2021-12-14T00:38:39.943698",
        updatedDate: "2021-12-14T00:38:39.943698",
      },
      {
        id: 3,
        comment: "기부신청",
        userId: 456,
        userName: "기부니3",
        userImage: "test.jpg",
        createdDate: "2021-12-14T00:38:39.943698",
        updatedDate: "2021-12-14T00:38:39.943698",
      },
    ],
  },
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
  margin-bottom: 61px;
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
const LineBar = styled.div`
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
`;

const CommentContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 27px;
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