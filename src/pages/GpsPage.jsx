import Gps from "@/components/page/Gps.jsx";
import Header from "@/components/base/Header";
import styled from "styled-components";
import BaseButton from "@/components/base/BaseButton";
import theme from "@/styles/theme";
import { useNavigate } from "react-router";
import DetailAddress from "@/components/domain/Register/DetailAddress";
import { useState } from "react";

const GpsPage = () => {
  const navigate = useNavigate();
  const [viewDetail, setViewDetail] = useState(false);

  return (
    <>
      {!viewDetail ? (
        <>
          <Header type="plain" />
          <GpsContainer>
            <Gps />
            현재 계신 위치와 동일한가요?
            <div style={{ fontSize: "0.8rem" }}>
              기관 사용자이신 경우, <br /> 아니오를 누르신 후 상세 주소를
              입력해주세요.
            </div>
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
              <BaseButton
                btnType="white"
                text="아니오"
                onClick={() => setViewDetail(true)}
              />
            </div>
          </GpsContainer>
        </>
      ) : (
        <DetailAddress />
      )}
    </>
  );
};

export default GpsPage;

const GpsContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  color: ${theme.palette.primary.main};
  text-align: center;
  gap: 1.2rem;
`;
