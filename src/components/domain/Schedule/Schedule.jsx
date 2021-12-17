import Header from "@/components/base/Header";
import BaseButton from "@/components/base/BaseButton";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  CalendarTodayOutlined,
  Mood,
  Person,
  SentimentNeutral,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import theme from "@/styles/theme";
import { getRequest } from "@/api/axios";
import { useNavigate } from "react-router";

const Schedule = () => {
  const [visible, setVisible] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    const result = await getRequest("contract");
    setSchedules(result.data);
  }, []);

  return (
    <>
      <Header type="searchOut" fixed={true} />
      <AlignContainer>
        <>
          {schedules.map(
            ({
              contractDate,
              contractId,
              contractStatus,
              contractWith,
              postContent,
              postId,
              postTitle,
              postType,
            }) => {
              const date = contractDate.split("T").slice(0, 1);
              const time = contractDate.split("T").slice(-1);
              const realTime = String(time).split(".").slice(0, 1);
              const hour = String(realTime).split(":").slice(0, 1);
              const minute = String(realTime).split(":").slice(1, 2);
              return (
                <CardContainer key={contractId}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: "0.5rem",
                      borderBottom: `1px solid ${theme.palette.gray.main}`,
                    }}
                    onClick={() => {
                      if (postType === "WISH") navigate(`wishes/${postId}`);
                      else navigate(`donations/${postId}`);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <CalendarTodayOutlined
                        sx={{
                          height: "1.2rem",
                          color: theme.palette.primary.main,
                        }}
                      />
                      <div>
                        {date} | {hour} : {minute}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: theme.palette.primary.main,
                      }}
                    >
                      <Person /> {contractWith}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      if (postType === "WISH") navigate(`wishes/${postId}`);
                      else navigate(`donations/${postId}`);
                    }}
                  >
                    {postTitle}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <BaseButton
                      btnType="white"
                      height="2rem"
                      width="6rem"
                      style={{ fontSize: "0.8rem" }}
                      text={postContent}
                    />
                    <BaseButton
                      height="2rem"
                      width="6rem"
                      style={{ fontSize: "0.8rem" }}
                      text={
                        contractStatus === "done" ? "기부 완료" : "기부 진행"
                      }
                    />
                    {contractStatus === "done" && (
                      <BaseButton
                        style={{
                          backgroundColor: "white",
                          color: theme.palette.primary.main,
                          fontSize: "0.8rem",
                        }}
                        width="9rem"
                        height="2rem"
                        text="기부는 어떠셨나요?"
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
            }
          )}
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
  margin-top: 4.5rem;
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
