import Header from "@/components/base/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "@/styles/theme";
import Tag from "@/components/base/Tag";
import { AccountCircle, NavigateNext } from "@mui/icons-material";
import Input from "@/components/base/Input";

const AlignContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 5rem;
  padding: 0.5rem;
  box-sizing: border-box;
  width: 99vw;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  border-bottom: 1px solid ${theme.palette.gray.main};
  padding-bottom: 0.7rem;
  margin-bottom: 0.7rem;
`;

const TitleContainer = styled.div`
  height: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const ContentContainer = styled.div`
  font-size: 0.9rem;
  max-height: 4.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const DUMMY_DATA = [
  {
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
  },
  {
    id: 2, // 기부글 식별자
    title: "[기부] 기부기부기부가 너무 하고 기부 받으실 분",
    content: "기부할래요",
    category: "물품나눔",
    quality: "보통",
    status: "기부진행",
    memberId: 2, // 기부글 작성자 : 식별자 아이디(회원)
    member: "귤하나", // 기부글 작성자 : 회원 닉네임
    centerCnt: 2, // 기부희망댓글 작성자 수(참여자수)
    createdDate: "2021-12-05T02:18:21.807641",
    updatedDate: "2021-12-05T19:50:29.063482",
    tags: ["장애인", "다문화", "지구촌"],
  },
  {
    id: 3, // 기부글 식별자
    title: "[기부] 집에 남는 물품 기부합니다",
    content:
      "집에 쌀이랑 이불이랑 남아도는 게 많아서 기부하려고 하는데 필요하신 센터 있으시면 댓글로 신청 부탁드립니다. 집에 쌀이랑 이불이랑 남아도는 게 많아서 기부하려고 하는데 필요하신 센터 있으시면 댓글로 신청 부탁드립니다.",
    category: "물품나눔",
    quality: "보통",
    status: "기부진행",
    memberId: 5, // 기부글 작성자 : 식별자 아이디(회원)
    member: "하정하정", // 기부글 작성자 : 회원 닉네임
    centerCnt: 2, // 기부희망댓글 작성자 수(참여자수)
    createdDate: "2021-12-05T02:18:21.807641",
    updatedDate: "2021-12-05T19:50:29.063482",
    tags: ["장애인", "다문화", "지구촌"],
  },
  {
    id: 4, // 기부글 식별자
    title: "기부",
    content: "기부할래요",
    category: "물품나눔",
    quality: "보통",
    status: "기부진행",
    memberId: 3, // 기부글 작성자 : 식별자 아이디(회원)
    member: "상우상우상", // 기부글 작성자 : 회원 닉네임
    centerCnt: 2, // 기부희망댓글 작성자 수(참여자수)
    createdDate: "2021-12-05T02:18:21.807641",
    updatedDate: "2021-12-05T19:50:29.063482",
    tags: ["장애인", "다문화", "지구촌"],
  },
];

const SearchPage = () => {
  return (
    <>
      <Header type="main" />
      <AlignContainer>
        <Input type="searchFull" sx={{ width: "95vw", marginBottom: "1rem" }} />
        게시글
        {DUMMY_DATA.map(({ id, title, tags, content }, index) => {
          return index >= 3 ? undefined : (
            <div
              style={{
                border: `1px solid ${theme.palette.gray.main}`,
                borderRadius: "12.8px",
                padding: "1rem",
                backgroundColor: theme.palette.gray.light,
              }}
            >
              <Link
                to=""
                style={{
                  textDecoration: "none",
                  color: theme.palette.black.main,
                }}
              >
                <ProfileCard>
                  <AccountCircle
                    style={{
                      color: theme.palette.gray_dark.light,
                      width: "3.5rem",
                      height: "3.5rem",
                    }}
                  />
                  <div>
                    <TitleContainer key={id}>{title}</TitleContainer>
                    <TagContainer>
                      {tags.map((tag, index) => (
                        <Tag key={index} text={tag} />
                      ))}
                    </TagContainer>
                  </div>
                </ProfileCard>
                <ContentContainer>{content}</ContentContainer>
                {/* <div>{centerCnt}</div> */}
              </Link>
            </div>
          );
        })}
        <div
          style={{
            color: theme.palette.gray_dark.dark,
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
          onClick={() => history.push("/")}
        >
          더보기
          <NavigateNext />
        </div>
      </AlignContainer>
    </>
  );
};

export default SearchPage;
