import Gps from "@/components/page/Gps.jsx";
import Header from "@/components/base/Header";
import styled from "styled-components";
import BaseButton from "@/components/base/BaseButton";
import theme from "@/styles/theme";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  return (
    <>
      <Header type="plain" />
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
          <BaseButton
            text="확인"
            onClick={() => {
              navigate("/register");
            }}
          />
          <BaseButton btnType="white" text="아니오" />
        </div>
      </GpsContainer>
    </>
  );
};

export default GpsPage;
