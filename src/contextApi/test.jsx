import { StateContext, DispatchContext } from "./index";
import React, { useContext } from "react";
import Toggle from "@/components/Toggle";
function Test() {
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
      <br />
      <br />
      <Toggle id="1" text="1번태그" toggleOn={false} />
      <Toggle id="2" text="2번태그" toggleOn={false} />
      <Toggle id="3" text="3번태그" toggleOn={false} />
      <Toggle id="4" text="4번태그" toggleOn={false} />
      <Toggle id="5" text="5번태그" toggleOn={false} />
      <Toggle id="6" text="6번태그" toggleOn={false} />
      <Toggle id="7" text="7번태그" toggleOn={false} />
      <Toggle id="8" text="8번태그" toggleOn={false} />
      <br />
      <br />
      <div>{`로그인한 유저 : ${state.loginUser}`}</div>
      <div>{`선택된 유저 : ${state.selectedUser}`}</div>
      <div>{`선택된 포스트 : ${state.selectedPost}`}</div>
      <div>{`선택된 센터 : ${state.selectedCenter}`}</div>
      <div>{`선택된 동네 : ${state.selectedTown}`}</div>
      <div>{`최근 페이지 : ${state.currentPage}`}</div>
      <ul style={{ display: "flex" }}>
        <span>선택된 태그들 : </span>
        {state.selectedTags.map((tag) => (
          <li style={{ margin: 4 }} key={tag.id}>
            {tag.id},
          </li>
        ))}
      </ul>
    </>
  );
}

export default Test;
