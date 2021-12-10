import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Nav from "@/components/base/Nav";
import Header from "@/components/base/Header";
import Slider from "@/components/base/Slider";
import Input from "@/components/base/Input";
import Toggle from "@/components/base/Toggle";
import Profile from "@/components/base/Profile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useState, useEffect } from "react";

const Dummy_Data = {
  message: "success",
  data: {
    id: 1, // 기부글 식별자
    title: "기부",
    content: "기부할래요",
    category: "물품나눔",
    quality: "보통",
    status: "기부진행",
    memberId: 1, // 기부글 작성자 : 식별자 아이디(회원)
    member: "부리", // 기부글 작성자 : 회원 닉네임
    centerCnt: 2, // 기부희망댓글 작성자 수(참여자수)
    createdDate: "2021-12-05T02:18:21.807641",
    updatedDate: "2021-12-05T19:50:29.063482",
    tags: ["장애인", "다문화", "지구촌"],
    comments: [
      {
        id: 1, // 기부희망댓글 식별자
        comment: "기부희망",
        centerId: 1, // 기부희망댓글 작성자 식별자 아이디(센터)
        center: "기부니 센터", // 기부희망댓글 작성자 : 센터 이름
        centerImage: "https://t1.daumcdn.net/cfile/tistory/99086B3C5B9B75C431",
        createdDate: "2021-12-06T03:02:21.597399",
        updatedDate: "2021-12-06T03:39:41.936613",
      },
      {
        id: 2,
        comment: "기부희망",
        centerId: 1,
        center: "니드잇 센터",
        centerImage: "https://t1.daumcdn.net/cfile/tistory/99086B3C5B9B75C431",
        createdDate: "2021-12-06T16:18:29.599477",
        updatedDate: "2021-12-06T16:18:29.599477",
      },
      {
        id: 3,
        comment: "기부희망",
        centerId: 1,
        center: "needit 센터",
        centerImage: "test",
        createdDate: "2021-12-06T16:18:29.599477",
        updatedDate: "2021-12-06T16:18:29.599477",
      },
    ],
  },
};

const WriteContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const WriteSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 314px;
  height: 50px;
  align-items: center;
  margin-top: 13px;
  margin-bottom: 23px;
  color: #fd9f28;
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

  /* h6 */

  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 61px;
`;

const LineBar = styled.div`
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
`;

const CommentContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 27px;
`;

const ProfileContainer = styled.div`
  margin-left: 13px;
  width: 65px;
  height: 25px;
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
  background-color: #f6f6f6;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  width: 320px;
  height: 80px;
`;
const JoinCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 293px;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Comment = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  color: #bdbdbd;
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
  color: #fd9f28;
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
`;

const MemberName = styled.div`
  margin-left: 8px;
`;

const Detail = () => {
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    //api
    setDetailData(Dummy_Data.data);
    console.log(detailData, Dummy_Data);
  }, []);

  return (
    <>
      <Header type="main" />
      <WriteContainer>
        <WriteSubContainer>
          <TextSliderAvatarContainer>
            <Avatar sx={{ width: 50, height: 50 }} />
            <TextSliderContainer>
              <div>어쩌고저쩌고</div>
              <Slider
                id="기부진행"
                onChange={(data) => {
                  console.log(data);
                }}
              />
            </TextSliderContainer>
          </TextSliderAvatarContainer>
          <FavoriteIcon />
        </WriteSubContainer>
      </WriteContainer>
      <TitleContainer>
        <Input type="게시물 제목"></Input>
      </TitleContainer>
      <ContentContainer>
        <Input
          multiline
          rows={4} // 최대 줄 수
        />
      </ContentContainer>
      <LineBar />
      <CommentContainer>
        <CommnentSubContainer>
          <GroupContainer>
            <ProfileContainer>
              <Profile
                width={23.65}
                height={17.4}
                profileData={detailData.comments}
              />
            </ProfileContainer>
            <Toggle
              id={"123"}
              text="toggle"
              onChange={(data) => {
                console.log(data);
              }}
            />
          </GroupContainer>
          {detailData.comments &&
            detailData.comments.map((part, i) => {
              return (
                <CardContainer key={i}>
                  <MemberDeleteContainer>
                    <MemberContainer>
                      <Avatar sx={{ width: 30, height: 30 }} />
                      <MemberName>{part.center}</MemberName>
                    </MemberContainer>
                    <DeleteOutlineIcon />
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
    </>
  );
};

export default Detail;
