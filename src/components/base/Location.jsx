import area from "@/utils/const/LocationData";

import styled from "styled-components";
import { useState } from "react";

const CustomModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background-color: rgba(0, 0, 0, 0.4);
`;

const CustomModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  transform: translateX(-50%) translateY(-50%);
`;

const ModalGridArea = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-items: center;
`;

const ModalGridAreaItem = styled.button`
  background-color: #fd9f28;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  margin: 10px;
  display: table-cell;
  color: white;
`;

const GridGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridArea = styled.div`
  width: 300px;
  border: 4px solid;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-items: center;
`;

const GridAreaItem = styled.button`
  background-color: #fd9f28;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  margin: 10px;
  display: table-cell;
  color: white;
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
          <ModalGridArea>
            {subArea.map((t, i) => (
              <ModalGridAreaItem
                key={i}
                onClick={(e) => {
                  clickModalBodyHandler(e.target.textContent);
                }}
              >
                <p style={{ verticalAlign: "center" }}>{t}</p>
              </ModalGridAreaItem>
            ))}
          </ModalGridArea>
        </CustomModalBody>
      </CustomModal>
    );

  return (
    <>
      <GridGroup>
        <GridArea>
          {areaArr.map((t, i) => (
            <GridAreaItem
              key={i}
              onClick={(e) => {
                clickHandler(e.target.textContent);
              }}
            >
              <p style={{ verticalAlign: "center" }}>{t}</p>
            </GridAreaItem>
          ))}
        </GridArea>
      </GridGroup>
    </>
  );
};

export default Location;
