import Header from "@/components/base/Header";
import BaseButton from "@/components/base/BaseButton";
import Nav from "@/components/base/Nav";
import styled from "styled-components";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState, useContext, useEffect } from "react";
import { StateContext } from "@/context/index";
import Toggle from "@/components/base/Toggle";
import Modal from "@mui/material/Modal";
import { useLocation } from "react-router-dom";
import { getRequest, postRequest, putRequest } from "@/api/axios";
import theme from "@/styles/theme";
import { useNavigate } from "react-router";

const subArea = [
  { id: 1, name: "아동·청소년" },
  { id: 2, name: "어르신" },
  { id: 3, name: "장애인" },
  { id: 4, name: "다문화" },
  { id: 5, name: "지구촌" },
  { id: 6, name: "가족·여성" },
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
  const [userRole, setUserRole] = useState("");
  const [files, setFiles] = useState("");

  const location = useLocation();
  let preTitle,
    preContent,
    preTag = [],
    preCategory = [],
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
    writeId = location.state.prewriteData.id;
  }

  useEffect(() => {
    setTitle(preTitle);
    setContent(preContent);
    setTag(preTag);
    setCategory(preCategory);
    setQuality("좋음");

    const getData = async () => {
      const userData = await getRequest(`users`);
      setUserRole(userData.data.myProfile.role);
    };

    getData();
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

  const navigate = useNavigate();
  //API에 필요한 6가지 항목
  const submitWrites = async () => {
    //writeId가 있으면 수정API요청 / writeId가 없으면 새로운 글쓰기 요청
    console.log(title, content, category, tag, apiTag, quality, Imgs, writeId);
    //writeId (기존의 글쓰기가 존재한다면 수정API)
    const target = userRole === "CENTER" ? "wishes" : "donations";
    if (writeId) {
      console.log("!");
      if (category && content && title) {
        const formData = new FormData();
        formData.append(
          "request",
          new Blob(
            [
              JSON.stringify({
                category,
                content,
                quality,
                tags: apiTag,
                title,
              }),
            ],
            { type: "application/json" }
          )
        );
        if (files.length === 0) {
          formData.append("file", new Blob([JSON.stringify(" ")]), {
            type: "application/json",
          });
        } else {
          files.map((file) => {
            formData.append("file", file);
          });
        }

        const Result = await putRequest(`${target}/${writeId}`, {
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(Result);
        navigate(`/${target}/${Result.data}`);
      } else {
        alert("글 작성에 필요한 값을 아직 작성하지 않았습니다");
      }
    } else {
      if (category && content && title) {
        const formData = new FormData();
        formData.append(
          "request",
          new Blob(
            [
              JSON.stringify({
                category,
                content,
                quality,
                tags: apiTag,
                title,
              }),
            ],
            { type: "application/json" }
          )
        );
        if (files.length === 0) {
          formData.append("file", new Blob([JSON.stringify(" ")]), {
            type: "application/json",
          });
        } else {
          files.map((file) => {
            formData.append("file", file);
          });
        }

        const Result = await postRequest(`${target}`, {
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(Result);
        navigate(`/${target}/${Result.data}`);
      } else {
        alert("글 작성에 필요한 값을 아직 작성하지 않았습니다");
      }
    }
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
        setFiles([...files, e.target.files[0]]);
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
        <Header type="plain" fixed={true} />
        <WriteContainer>
          <ReactiveContainer>
            <TitleContainer>
              <TitleInput
                placeholder="게시글 제목"
                onChange={writeTitle}
                value={title}
              />
            </TitleContainer>
            <InformationContainer>
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
              <CustomSelect onChange={changeSelectHandler}>
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
            </InformationContainer>
            <ContentContainer>
              <ContentTextarea
                multiline
                placeholder="물품소개"
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
          </ReactiveContainer>
        </WriteContainer>
        <Nav />
      </MainContainer>
      <Modal open={isModalOpen} style={{ zIndex: 10000 }}>
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
      </Modal>
    </>
  );
};

const MainContainer = styled.div`
  padding-bottom: 75px;
`;

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReactiveContainer = styled.div`
  min-width: 300px;
  max-width: 500px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 98px;
  margin-bottom: 10px;
`;

const TitleInput = styled.input`
  ${theme.typography.body1};
  background: #f6f6f6;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-sizing: border-box;
  width: 20rem;
  height: 2.1rem;
  padding: 10px;
  font-size: 14px;
  &:focus {
    outline: #fd9f28;
    border: 1px solid #fd9f28;
  }
`;

const InformationContainer = styled.div`
  margin: 5px 0;
  width: auto;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CustomSelect = styled.select`
  ${theme.typography.body2};
  width: 4.5rem;
  color: #9b9b9b;
  background: #f6f6f6;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  &:focus {
    outline: none;
  }
`;
const TagsContainer = styled.div`
  width: 100%;
`;

const CustomBaseButton = styled(BaseButton)`
  height: 24px;
  font-style: normal;
  width: auto;
  font-weight: 400;
  font-size: 12px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 14px 0;
`;

const ContentTextarea = styled.textarea`
  ${theme.typography.body1};
  border: 1px solid #e8e8e8;
  background: #f6f6f6;
  border-radius: 8px;
  box-sizing: border-box;
  width: 20rem;
  min-height: 180px;
  padding: 10px;
  font-size: 14px;
  resize: none;
  &:focus {
    outline: #fd9f28;
    border: 1px solid #fd9f28;
  }
`;

const ImageWrapContainer = styled.div`
  margin-top: 9px;
  margin-bottom: 11px;
  width: auto;
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
  max-width: 180px;
  height: 100px;
  object-fit: cover;
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
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  cursor: pointer;
`;

const PictureContainer = styled.div`
  margin: 5px 0 20px 10px;
  display: flex;
  justify-content: Flex-start;
  width: auto;
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
  cursor: pointer;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LineBar = styled.div`
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
`;

const CustomModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
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
  width: 130px;
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
