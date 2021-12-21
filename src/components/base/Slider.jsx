import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { getRequest, patchRequest } from "@/api/axios";
const ToggleContainer = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none;
`;

const ToggleSwitch = styled.div`
  width: 76px;
  height: 26px;
  border-radius: 16px;
  background-color: #fd9f28;
  transition: all 0.2 ease-out;
  box-sizing: border-box;
  &:after {
    content: "기부마감";
    position: relative;
    padding: 4px 4px;
    padding-left: 8px;
    box-sizing: border-box;
    left: calc(100% - 64px);
    display: block;
    width: 64px;
    height: 26px;
    font-size: 12px;
    border-radius: 16px;
    color: white;
    background-color: #9e9e9e;
    transition: all 0.2s ease-out;
  }
`;

const ToggleInput = styled.input`
  display: none;
  &:checked + div {
    background: #9e9e9e;
  }
  &:checked + div:after {
    content: "기부진행";
    left: 0;
    background: #fd9f28;
  }
  &:disabled + div {
    opacity: 0.7;
    cursor: not-allowed;
    &:after {
      opacity: 0.7;
    }
  }
`;
async function changeStatus(type, id, status) {
  const result = await patchRequest(`${type}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ status }), // 상태 종류 : 기부진행, 기부종료
  });
  return result.message;
}
async function getStatus(type, id) {
  const result = await getRequest(`${type}/${id}`);
  return result.data.status;
}
const Toggle = () => {
  const { pathname } = useLocation();
  const postType = pathname.split("/")[1];
  const { postId } = useParams();
  const [status, setStatus] = useState("");
  const [checked, setChecked] = useState(false);
  async function init() {
    const status = await getStatus(postType, postId);
    setStatus(status);
    if (status === "기부진행") setChecked(true);
    else setChecked(false);
  }
  useEffect(async () => {
    init();
  }, []);
  const handleChange = async () => {
    try {
      const statusString = status === "기부종료" ? "기부진행" : "기부종료";
      const result = await changeStatus(postType, postId, statusString);
      init();
      if (result !== "success") throw new Error("애러애러");
    } catch (e) {
      alert("작성자만 상태를 변경 할 수 있습니다.");
      return;
    }
  };

  return (
    <ToggleContainer>
      <ToggleInput type="checkbox" checked={checked} onChange={handleChange} />
      <ToggleSwitch />
    </ToggleContainer>
  );
};
export default Toggle;
