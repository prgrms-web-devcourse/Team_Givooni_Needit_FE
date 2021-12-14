import Header from "@/components/base/Header";
import BaseButton from "@/components/base/BaseButton";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import { useState } from "react";
import {
  CalendarTodayOutlined,
  Mood,
  SentimentNeutral,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import theme from "@/styles/theme";

const Schedule = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Header type="searchOut" fixed={true} />
      <AlignContainer>
        <>
          {DUMMY_DATA.map((data) => {
            return (
              <CardContainer
                key={data.contractId}
                onClick={() => console.log(data.contractId)}
              >
                <div>
                  <CalendarTodayOutlined
                    sx={{ height: "1rem", color: theme.palette.primary.main }}
                  />
                  {data.contractDate}
                </div>
                <div>기부글의 제목은 도대체 무엇일까요?</div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <BaseButton
                    height="2rem"
                    width="6rem"
                    style={{ fontSize: "0.8rem" }}
                    text={data.status === "done" ? "기부 완료" : "기부 진행"}
                  />
                  {data.status === "done" && (
                    <BaseButton
                      btnType="white"
                      width="9rem"
                      height="2rem"
                      text="기부는 어떠셨나요?"
                      style={{ fontSize: "0.8rem" }}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
                <ModalDim style={{ display: visible ? "block" : "none" }}>
                  <ModalContainer>
                    <button
                      style={{
                        position: "relative",
                        left: "7.5rem",
                        backgroundColor: "transparent",
                        color: theme.palette.primary.main,
                        border: "none",
                      }}
                      onClick={() => setVisible(false)}
                    >
                      닫기
                    </button>
                    <div>해당 기부 경험은 어떠셨나요?</div>
                    <MoodContainer>
                      <Mood onClick={() => setVisible(false)} />
                      <SentimentNeutral onClick={() => setVisible(false)} />
                      <SentimentVeryDissatisfied
                        onClick={() => setVisible(false)}
                      />
                    </MoodContainer>
                  </ModalContainer>
                </ModalDim>
              </CardContainer>
            );
          })}
        </>
      </AlignContainer>
      <Nav />
    </>
  );
};

export default Schedule;

const AlignContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 5rem;
  padding: 1rem 0 0 0.5rem;
  box-sizing: border-box;
  width: 99vw;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
  width: 96vw;
  border: 1px solid ${theme.palette.gray.main};
  border-radius: 12.8px;
  background-color: ${theme.palette.gray.light};
`;

const ModalDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  border-radius: 12.8px;
  background-color: white;
  box-shadow: 0 3px 18px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 80vw;
  align-items: center;
`;

const MoodContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

const DUMMY_DATA = [
  {
    contractId: 14510,
    contractDate: "2021-12-31",
    status: "ing",
    donationId: 2,
    donationWishId: null,
  },
  {
    contractId: 10493,
    contractDate: "2021-03-09",
    status: "done",
    donationId: null,
    donationWishId: 3,
  },
  {
    contractId: 12345, // 기부 예약 식별자,
    contractDate: "2019-12-25", // 기부 예약 일정,
    status: "done", // 기부 예약 상태
    donationId: 1, // 기부 예약이 '기부할래요' 예약이라면 해당 게시글의 식별자. 그렇지 않다면 null,
    donationWishId: null, // 기부 예약이 '기부원해요' 예약이라면 해당 게시글의 식별자. 그렇지 않다면 null,
  },
];
