import area from "@/utils/const/LocationData";
import RoomIcon from "@mui/icons-material/Room";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import styled from "styled-components";
import { useState } from "react";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainAreaContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-items: center;
  width: 355px;
`;

const MainAreaItem = styled.div`
  display: flex;
  width: 160px;
  height: 25px;
  left: 10px;
  top: calc(50% - 25px / 2);

  /* h5 */

  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height */

  /* mainColor */

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  justify-content: space-between;
  margin: 30px;
`;

const CustomModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: block;
  background-color: rgba(0, 0, 0, 0.4);
`;

const CustomModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 330px;
  padding: 20px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  transform: translateX(-50%) translateY(-50%);
`;

const ModalAreaContainer = styled.div`
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(10, 1fr);
  justify-content: center;
  height: 80vh;
`;

const ModalAreaItem = styled.div`
  display: flex;
  width: 100px;
  height: 25px;

  /* h5 */

  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height */

  /* mainColor */

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  justify-content: space-between;
  color: #fd9f28;
  padding: 10px;
`;

const Location = () => {
  const areaArr = Object.keys(area);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainArea, setMainArea] = useState([]);
  const [subArea, setSubArea] = useState([]);

  const clickHandler = (mainArea) => {
    setSubArea(area[mainArea]);
    setMainArea(mainArea);
    setIsModalOpen(true);
  };

  const clickModalHandler = () => {
    setIsModalOpen(false);
  };

  const clickModalBodyHandler = (subArea) => {
    setIsModalOpen(false);

    // modal 클릭시 필요한 ~시 ~구 확인 가능
    console.log(`${mainArea} ${subArea}`); //서울시 강남구
  };

  if (isModalOpen)
    return (
      <CustomModal
        className="modal"
        onClick={(e) => {
          clickModalHandler(e);
        }}
      >
        <CustomModalBody>
          <ModalAreaContainer>
            {subArea.map((t, i) => (
              <ModalAreaItem
                key={i}
                onClick={(e) => {
                  clickModalBodyHandler(e.target.textContent);
                }}
              >
                <p style={{ verticalAlign: "center" }}>{t}</p>
                <GpsFixedIcon />
              </ModalAreaItem>
            ))}
          </ModalAreaContainer>
        </CustomModalBody>
      </CustomModal>
    );
  return (
    <>
      <Main>
        <MainAreaContainer>
          {areaArr.map((val, i) => {
            return (
              <MainAreaItem
                key={i}
                onClick={(e) => {
                  clickHandler(e.target.textContent);
                }}
              >
                <p style={{ color: "#fd9f28" }}>{val}</p>
                <RoomIcon style={{ color: "9E9E9E" }} />
              </MainAreaItem>
            );
          })}
        </MainAreaContainer>
      </Main>
    </>
  );
};

export default Location;
