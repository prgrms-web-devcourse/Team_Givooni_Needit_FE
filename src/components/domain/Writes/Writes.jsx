// import Header from "@/components/base/Header";
import Input from "@/components/base/Input";
import BaseButton from "@/components/base/BaseButton";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { useState } from "react";

const Writes = () => {
  const [detailImgs, setDetailImgs] = useState([]);
  console.log(detailImgs);
  const handleImageUpload = (e) => {
    if (detailImgs.length === 4) return;

    const fileArr = e.target.files;

    let fileURLs = [];

    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];

      let reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        fileURLs[i] = reader.result;
        setDetailImgs([...detailImgs, fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <MainContainer>
        {/* <Header type="main" /> */}

        <TitleContainer>
          <Input type="게시글 제목" />
        </TitleContainer>
        <InformationContainer></InformationContainer>
        <ContentContainer>
          <Input multiline type="물품소개" rows={5} />
        </ContentContainer>
        <LineBar />
        <ImageWrapContainer>
          <ScrollWrapContainer>
            <input
              type="file"
              multiple
              accept="image/jpg,image/png,image/jpeg,image/gif"
              onChange={handleImageUpload}
            />

            {detailImgs &&
              detailImgs.map((link, i) => {
                return <CustomImg src={link} key={i} />;
              })}
          </ScrollWrapContainer>
        </ImageWrapContainer>
        <LineBar />
        <PictureContainer>
          <PictureSubContainer>
            <CameraAltIcon />
          </PictureSubContainer>
        </PictureContainer>
        <SubmitContainer>
          <BaseButton text="작성 완료" width="300px" height="50px" />
        </SubmitContainer>

        <Nav />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  padding-bottom: 75px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 18px;
  margin-bottom: 10px;
`;

const InformationContainer = styled.div`
  margin-top: 17px;
  margin-bottom: 21px;
`;
const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 17px;
  margin-bottom: 21px;
`;

const ImageWrapContainer = styled.div`
  overflow: scroll;
  margin-top: 9px;
  margin-bottom: 11px;
  margin-left: 26px;
  max-width: 500px;
  overflow-x: scroll;
  white-space: nowrap;
`;

const ScrollWrapContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  font-size: 0;
`;

const CustomImg = styled.img`
  width: 100px;
  height: 140px;
  background-color: #f6f6f6;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  margin-right: 10px;
`;

const PictureContainer = styled.div`
  margin-top: 7px;
  margin-left: 26px;
  margin-bottom: 37px;
  display: flex;
  justify-content: Flex-start;
  width: 320px;
`;
const PictureSubContainer = styled.div`
  width: 50px;
  height: 50px;
  background-color: #e8e8e8;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LineBar = styled.div`
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
`;

export default Writes;
