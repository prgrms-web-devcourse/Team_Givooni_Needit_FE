// import Header from "@/components/base/Header";
import Input from "@/components/base/Input";
import BaseButton from "@/components/base/BaseButton";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useState, useContext, useEffect } from "react";
import { StateContext } from "@/context/index";
import Toggle from "@/components/base/Toggle";
import { useLocation } from "react-router-dom";
const subArea = [
  { id: 1, name: "아동 · 청소년" },
  { id: 2, name: "어르신" },
  { id: 3, name: "장애인" },
  { id: 4, name: "다문화" },
  { id: 5, name: "지구촌" },
  { id: 6, name: "가족 · 여성" },
  { id: 7, name: "시민사회" },
  { id: 8, name: "동물" },
  { id: 9, name: "환경" },
  { id: 10, name: "기타" },
];

const Writes = () => {
  // API로 전송할 Data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState([]);
  const [apiTag, setApiTag] = useState([]);
  const [category, setCategory] = useState("");
  const [Imgs, setImgs] = useState([]);
  const [quality, setQuality] = useState("");

  const location = useLocation();
  let preTitle,
    preContent,
    preTag = [],
    preCategory = [],
    preImgs = [],
    writeId;
  if (location.state) {
    preTitle = location.state.prewriteData.title;
    preContent = location.state.prewriteData.content;
    preTag = location.state.prewriteData.tags.map((val) => {
      let result;
      subArea.map((obj, i) => {
        if (obj.name === val) result = { id: i + 1, text: val };
      });
      return result;
    });
    preCategory = location.state.prewriteData.category;
    preImgs = location.state.prewriteData.images;
    writeId = location.state.prewriteData.id;
  }

  useEffect(() => {
    setTitle(preTitle);
    setContent(preContent);
    setTag(preTag);
    setCategory(preCategory);
    setImgs(preImgs);
    setQuality("좋음");
  }, []);

  const state = useContext(StateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const writeTitle = ({ target }) => {
    setTitle(target.value);
  };

  const writeContent = ({ target }) => {
    setContent(target.value);
  };

  const clickTagHandler = () => {
    setIsModalOpen(true);
  };

  const changeSelectHandler = ({ target }) => {
    setCategory(target.value);
  };

  const clickButtonComplete = () => {
    if (state.selectedTags.length > 3) alert("3가지 이하로 선택해주세요");
    else {
      setTag(state.selectedTags);
      setApiTag(state.selectedTags.map(({ id }) => id));
      setIsModalOpen(false);
    }
  };

  //API에 필요한 6가지 항목
  const submitWrites = () => {
    //writeId가 있으면 수정API요청 / writeId가 없으면 새로운 글쓰기 요청
    console.log(title, content, category, apiTag, quality, Imgs, writeId);
  };

  const handleImageUpload = (e) => {
    // 추후 alert 창과 같은 최대 4장의 메세지 전송
    if (Imgs.length === 4) return;

    const fileArr = e.target.files;

    let fileURLs = [];

    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];

      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setImgs([...Imgs, fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  const isToggleOn = (toggleId) => {
    let isSame = false;
    tag.map(({ id }) => {
      if (id === toggleId) isSame = true;
    });

    return isSame;
  };

  return (
    <>
      <MainContainer>
        {/* <Header type="main" /> */}

        <TitleContainer>
          <Input type="게시글 제목" onChange={writeTitle} value={title} />
        </TitleContainer>
        <InformationContainer>
          <LocationContainer>
            <LocationButton>
              <div style={{ width: "69px", height: "15px" }}>
                {state.selectedTown}
              </div>
              <GpsFixedIcon
                sx={{ width: "15px", height: "15px" }}
                style={{ color: "#FD9F28", marginLeft: "4px" }}
              />
            </LocationButton>
          </LocationContainer>
          <CategoryContainer>
            <CustomSelect
              style={{ appearance: "none" }}
              onChange={changeSelectHandler}
            >
              <option value="카테고리" disabled selected hidden>
                카테고리
              </option>
              <option value="물품나눔" selected={preCategory === "물품나눔"}>
                물품나눔
              </option>
              <option value="재능기부" selected={preCategory === "재능기부"}>
                재능기부
              </option>
            </CustomSelect>
          </CategoryContainer>
        </InformationContainer>
        <TagsContainer>
          <CustomBaseButton
            text={
              tag.length === 0
                ? "태그설정: 최대 3개"
                : tag.map((val) => "#".concat(val.text)).join(" ")
            }
            onClick={() => {
              clickTagHandler();
            }}
          />
        </TagsContainer>
        <ContentContainer>
          <Input
            multiline
            type="물품소개"
            rows={5}
            onChange={writeContent}
            value={content}
          />
        </ContentContainer>
        <LineBar />
        <ImageWrapContainer>
          <ScrollWrapContainer>
            <input
              id="file"
              type="file"
              multiple
              accept="image/jpg,image/png,image/jpeg,image/gif"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <CustomLabel htmlFor="file">
              <ImageLabelText>물품사진</ImageLabelText>
              <ImageLabelText>(최대 4장)</ImageLabelText>
            </CustomLabel>

            {Imgs &&
              Imgs.map((link, i) => {
                return <CustomImg src={link} key={i} />;
              })}
          </ScrollWrapContainer>
        </ImageWrapContainer>
        <LineBar />
        <PictureContainer>
          <PictureSubContainer>
            <input
              id="file"
              name="photo"
              accept="image/*"
              capture="camera"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <CustomCameraLabel htmlFor="file">
              <CameraAltIcon />
            </CustomCameraLabel>
          </PictureSubContainer>
        </PictureContainer>
        <SubmitContainer>
          <BaseButton
            text="작성 완료"
            width="300px"
            height="50px"
            onClick={submitWrites}
          />
        </SubmitContainer>
        <Nav />
      </MainContainer>
      {isModalOpen ? (
        <CustomModal>
          <CustomModalBody>
            <ModalAreaContainer>
              {subArea.map((t, i) => (
                <ModalAreaItem key={i}>
                  <Toggle
                    id={t.id}
                    text={t.name}
                    toggleOn={() => {
                      return isToggleOn(t.id);
                    }}
                  />
                </ModalAreaItem>
              ))}
            </ModalAreaContainer>
            <BaseButton
              text="선택 완료"
              width="200px"
              height="50px"
              onClick={() => {
                clickButtonComplete();
              }}
            />
          </CustomModalBody>
        </CustomModal>
      ) : (
        <></>
      )}
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
  margin: 17px 26px 21px 28px;
  width: 320px;
  height: 24px;
  display: flex;
  justify-content: space-between;
`;

const LocationContainer = styled.div``;

const LocationButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 7px;

  position: static;
  width: 104px;
  height: 23px;
  left: 0px;
  top: 0px;

  /* gray_light */

  background: #f6f6f6;
  /* gray */

  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;

  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  color: #adadad;
`;

const CustomSelect = styled.select`
  width: 61px;
  height: 23px;
  /* subtitle2 */

  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  color: #9b9b9b;

  /* Inside Auto Layout */

  background: #f6f6f6;
  /* gray */

  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;

  flex: none;
  order: 0;
`;
const CategoryContainer = styled.div`
  margin: 0px 25px 0px 10px;
`;
const TagsContainer = styled.div`
  margin-left: 28px;
`;

const CustomBaseButton = styled(BaseButton)`
  width: auto;
  height: 24px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;

  flex: none;
  order: 0;
  flex-grow: 0;

  padding: 4.5px 7px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 17px;
  margin-bottom: 21px;
`;

const ImageWrapContainer = styled.div`
  margin-top: 9px;
  margin-bottom: 11px;
  margin-left: 26px;
  max-width: 500px;
  white-space: nowrap;
`;

const ImageLabelText = styled.div`
  display: flex;
  justify-content: center;
  width: 71px;
  word-break: break-all;
`;

const ScrollWrapContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
`;

const CustomImg = styled.img`
  width: 100px;
  height: 140px;
  background-color: #f6f6f6;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  margin-right: 10px;
`;

const CustomLabel = styled.label`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  height: 146px;
  background-color: #f6f6f6;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  margin-right: 10px;

  color: #bdbdbd;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
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

const CustomCameraLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8e8e8;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LineBar = styled.div`
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
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
  padding: 10px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  transform: translateX(-50%) translateY(-50%);
`;

const ModalAreaContainer = styled.div`
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(10, 1fr);
  justify-content: center;
  height: 80vh;
`;

const ModalAreaItem = styled.div`
  display: flex;
  width: 140px;
  height: 25px;
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  flex: none;
  order: 0;
  flex-grow: 0;
  justify-content: space-between;
  color: #fd9f28;
  padding: 10px;
`;

export default Writes;
