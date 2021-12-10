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

const TotalContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 314px;
  height: 50px;
  align-items: center;
  margin-top: 13px;
  color: #fd9f28;
`;

const SubContainer = styled.div`
  display: flex;
  width: 185px;
  height: 50px;
`;

const ChildContainer = styled.div`
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

const CustomInputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CustomInputTitle = styled(Input)`
  margin-top: 23px;
  width: 320px;
  height: 30px;
`;

const CustomInputContent = styled(Input)`
  margin-top: 16px;
  width: 320px;
  height: 126px;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  margin-right: 22px;
`;

const CommentContainer = styled.div`
  margin-left: 33px;
  margin-right: 33px;
  margin-top: 27px;
`;

const ProfileContainer = styled.div`
  width: 65px;
  height: 25px;
`;

const FirstSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const CommentCount = styled.div`
  width: 88.6px;
  height: 15px;
  left: 231px;
  top: 11px;

  /* subtitle2 */

  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  color: #c6c6c6;
`;

const SecondSubContainer = styled.div`
  margin-bottom: 17px;

  background-color: #f6f6f6;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
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
  margin-left: 40px;
  margin-right: 40px;
`;

const MemberContainer = styled.div`
  display: flex;
`;

const CommnentGroup = styled.div`
  margin-left: 14px;
  margin-right: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
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
  return (
    <>
      <Header type="main" />
      <TotalContainer>
        <MainContainer>
          <SubContainer>
            <Avatar sx={{ width: 50, height: 50 }} />
            <ChildContainer>
              <div>어쩌고저쩌고</div>
              <Slider
                id="기부진행"
                onChange={(data) => {
                  console.log(data);
                }}
              />
            </ChildContainer>
          </SubContainer>
          <FavoriteIcon />
        </MainContainer>
      </TotalContainer>
      <CustomInputContainer>
        <CustomInputTitle type="게시물 제목"></CustomInputTitle>
      </CustomInputContainer>
      <CustomInputContainer>
        <CustomInputContent type="게시글"></CustomInputContent>
      </CustomInputContainer>
      <ToggleContainer>
        <Toggle
          id="vkeif23d1"
          text="toggle"
          onChange={(data) => {
            console.log(data);
          }}
        />
      </ToggleContainer>
      <CommentContainer>
        <CommnentGroup>
          <FirstSubContainer>
            <ProfileContainer>
              <Profile width={23.65} height={17.4} />
            </ProfileContainer>
            <CommentCount>댓글 갯수 999+</CommentCount>
          </FirstSubContainer>
          <SecondSubContainer>
            <MemberDeleteContainer>
              <MemberContainer>
                <Avatar sx={{ width: 30, height: 30 }} />
                <MemberName>어쩌고 저쩌고 멤버</MemberName>
              </MemberContainer>
              <DeleteOutlineIcon />
            </MemberDeleteContainer>
            <JoinCommentContainer>
              <Comment>기부할래요</Comment>
            </JoinCommentContainer>
          </SecondSubContainer>
        </CommnentGroup>
      </CommentContainer>
      <Nav />
    </>
  );
};

export default Detail;
