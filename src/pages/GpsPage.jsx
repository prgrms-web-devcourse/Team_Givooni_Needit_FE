import Gps from "@/components/page/Gps.jsx";
import Header from "../components/Header";
import styled from "styled-components";
import BaseButton from "@/components/BaseButton";
import theme from "@/styles/theme";

const GpsContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  color: ${theme.palette.primary.main};
  text-align: center;
  gap: 1.2rem;
`;

const GpsPage = () => {
  return (
    <>
      <Header type="main" />
      <GpsContainer>
        <Gps />
        현재 계신 위치와 동일한가요?
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "1.2rem",
          }}
        >
          <BaseButton text="확인" />
          <BaseButton type={1} text="아니오" />
        </div>
      </GpsContainer>
    </>
  );
};

export default GpsPage;
