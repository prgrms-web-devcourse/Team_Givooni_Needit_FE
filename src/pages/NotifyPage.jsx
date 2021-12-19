import Header from "@/components/base/Header";
import Notify from "@/components/domain/Notify/Notify";
import Nav from "@/components/base/Nav";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
import { getRequest, deleteRequest } from "@/api/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const jwt = localStorage.getItem("needit_access_token");
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const deleteAlarm = async (id) => {
  const result = await deleteRequest(`notification/${id}`);
  return result;
};
const getList = async () => {
  const result = await getRequest("notification");
  return result.data;
};
const NotifyPage = () => {
  const navigate = useNavigate();
  const checkType = (post) => {
    const type = post.resourceType.toLowerCase();
    const suffix = type === "wish" ? "es" : "s";
    navigate(`/${type}${suffix}/${post.id}`);
  };
  // const connect = useCallback(() => {
  //   const socket = new SockJS(`${API_BASE_URL}/websocket-stomp`);
  //   const stompClient = Stomp.over(socket);

  //   stompClient.connect({ Authorization: jwt }, function () {
  //     console.log("연결  완료");
  //     stompClient.subscribe("/user/topic/notifications", (res) => {
  //       const data = JSON.parse(res.body);
  //       updateList(data);
  //     });
  //   });
  // });

  const [list, setList] = useState([]);
  // const updateList = (data) => {
  //   setList((prev) => [...prev, data]);
  // };

  const getAlarm = async () => {
    const list = await getList();
    setList(list);
  };

  useEffect(() => {
    getAlarm();
    // connect();
  }, []);
  return (
    <>
      <Header type="main" />
      <Notify
        list={list}
        onClick={async (post) => {
          console.log(deleteAlarm);
          await deleteAlarm(post.id);
          checkType(post);
        }}
      />
      <Nav />
    </>
  );
};

export default React.memo(NotifyPage);
