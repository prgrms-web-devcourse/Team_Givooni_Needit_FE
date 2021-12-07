import { StateContext, DispatchContext } from "./index";
import React, { useContext, useState } from "react";
function Test() {
  const [tag, setTag] = useState(0);
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const handleLoginUser = (e) => {
    dispatch({
      type: "setLoginUser",
      nextState: e.target.value,
    });
  };
  const handleSelectedUser = (e) => {
    dispatch({
      type: "setUser",
      nextState: e.target.value,
    });
  };
  const handleSelectedPost = (e) => {
    dispatch({
      type: "setPost",
      nextState: e.target.value,
    });
  };
  const handleSelectedTown = (e) => {
    dispatch({
      type: "setTown",
      nextState: e.target.value,
    });
  };
  const handleSelectedCenter = (e) => {
    dispatch({
      type: "setCenter",
      nextState: e.target.value,
    });
  };
  const handleCurrentPage = (e) => {
    dispatch({
      type: "setCurrentPage",
      nextState: e.target.value,
    });
  };
  const changeTagId = (e) => {
    setTag(e.target.value);
  };
  const handleAddTag = () => {
    dispatch({
      type: "addTag",
      nextState: tag,
    });
  };
  const handleRemoveTag = () => {
    dispatch({
      type: "removeTag",
      nextState: tag,
    });
  };
  return (
    <>
      <p>로그인 유저변경</p>
      <input type="text" onChange={handleLoginUser} />
      <p>선택된 유저변경</p>
      <input type="text" onChange={handleSelectedUser} />
      <p>선택된 포스트변경</p>
      <input type="text" onChange={handleSelectedPost} />
      <p>선택된 센터변경</p>
      <input type="text" onChange={handleSelectedCenter} />
      <p>선택된 동네변경</p>
      <input type="text" onChange={handleSelectedTown} />
      <p>최근 페이지변경</p>
      <input type="text" onChange={handleCurrentPage} />
      <p>추가할 태그 id</p>
      <input type="text" onChange={changeTagId} />
      <button onClick={handleAddTag}>태그 추가</button>
      <button onClick={handleRemoveTag}>태그 삭제</button>
      <div>{`로그인한 유저 : ${state.loginUser}`}</div>
      <div>{`선택된 유저 : ${state.selectedUser}`}</div>
      <div>{`선택된 포스트 : ${state.selectedPost}`}</div>
      <div>{`선택된 센터 : ${state.selectedCenter}`}</div>
      <div>선택된 태그들</div>
      <ul>
        {state.selectedTags.map((tag) => (
          <li key={tag.id}>${tag.id}</li>
        ))}
      </ul>
      <div>{`선택된 동네 : ${state.selectedTown}`}</div>
      <div>{`최근 페이지 : ${state.currentPage}`}</div>
    </>
  );
}

export default Test;
