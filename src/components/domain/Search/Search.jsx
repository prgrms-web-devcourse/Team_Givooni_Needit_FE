import Header from "@/components/base/Header";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "@/styles/theme";
import Tag from "@/components/base/Tag";
import { NavigateNext, Palette, Redeem } from "@mui/icons-material";
import Input from "@/components/base/Input";
import { useCallback, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";

const Search = () => {
  const [contentDetail, setContentDetail] = useState(false);
  // const [centerDetail, setCenterDetail] = useState(false);

  const END_POINT = "https://naver.com"; // 임시 Url

  const data = useCallback(async (input) => {
    return await axios
      .get(`${END_POINT}/search?${input}`)
      .then((res) => res.data);
  }, []);

  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);

  useDebounce(
    async () => {
      if (value === "") {
        setResult([]);
      } else {
        const requestData = await data(value);
        setResult(requestData);
      }
    },
    500,
    [value]
  );

  console.log(result);

  return (
    <>
      <Header type="searchOut" fixed={true} />
      <AlignContainer>
        <Input
          value={value}
          type="searchFull"
          sx={{ width: "95vw", marginBottom: "1rem" }}
          onChange={(e) => {
            setContentDetail(false);
            setValue(e.target.value);
          }}
        />
        게시글
        {DUMMY_DATA.map(
          ({ id, title, tags, content, status, category }, index) => {
            return contentDetail ? (
              <div
                style={{
                  border: `1px solid ${theme.palette.gray.main}`,
                  borderRadius: "12.8px",
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
                  <ProfileCard onClick={() => alert(id)}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Tag
                        text={status}
                        backgroundColor={
                          status === "기부완료" ? "gray_dark" : undefined
                        }
                      />
                      {category === "물품나눔" ? (
                        <Redeem style={{ color: theme.palette.primary.main }} />
                      ) : (
                        <Palette
                          style={{ color: theme.palette.primary.main }}
                        />
                      )}
                    </div>
                  </ProfileCard>
                  <TitleContainer key={id}>{title}</TitleContainer>
                  <ContentContainer>{content}</ContentContainer>
                  <TagContainer>
                    {tags.map((tag, index) => (
                      <div key={index}>#{tag}</div>
                    ))}
                  </TagContainer>
                </Link>
              </div>
            ) : !contentDetail && index < 3 ? (
              <div
                style={{
                  border: `1px solid ${theme.palette.gray.main}`,
                  borderRadius: "12.8px",
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
                  <ProfileCard onClick={() => alert(id)}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Tag
                        text={status}
                        backgroundColor={
                          status === "기부완료" ? "gray_dark" : undefined
                        }
                      />
                      {category === "물품나눔" ? (
                        <Redeem style={{ color: theme.palette.primary.main }} />
                      ) : (
                        <Palette
                          style={{ color: theme.palette.primary.main }}
                        />
                      )}
                    </div>
                  </ProfileCard>
                  <TitleContainer key={id}>{title}</TitleContainer>
                  <ContentContainer>{content}</ContentContainer>
                  <TagContainer>
                    {tags.map((tag, index) => (
                      <div key={index}>#{tag}</div>
                    ))}
                  </TagContainer>
                </Link>
              </div>
            ) : undefined;
          }
        )}
        {!contentDetail && (
          <div
            style={{
              color: theme.palette.gray_dark.dark,
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
            onClick={() => {
              setContentDetail(true);
            }}
          >
            더보기
            <NavigateNext />
          </div>
        )}
      </AlignContainer>
      <Nav />
    </>
  );
};

export default Search;

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
  font-size: 12px;
  color: ${theme.palette.gray.dark};
  margin: 1rem;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  margin: 1rem 0 0.5rem 1rem;
`;

const TitleContainer = styled.div`
  margin-top: 0.5rem;
  margin-left: 1rem;
  color: ${theme.palette.primary.main};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const ContentContainer = styled.div`
  font-size: 0.9rem;
  max-height: 3.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  padding-left: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${theme.palette.gray.main};
`;

const DUMMY_DATA = [
  {
    id: 1, // 기부글 식별자
    title: "기부",
    content: "기부할래요",
    category: "재능기부",
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
    status: "기부완료",
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
    status: "기부완료",
    memberId: 3, // 기부글 작성자 : 식별자 아이디(회원)
    member: "상우상우상", // 기부글 작성자 : 회원 닉네임
    centerCnt: 2, // 기부희망댓글 작성자 수(참여자수)
    createdDate: "2021-12-05T02:18:21.807641",
    updatedDate: "2021-12-05T19:50:29.063482",
    tags: ["장애인", "다문화", "지구촌"],
  },
];
