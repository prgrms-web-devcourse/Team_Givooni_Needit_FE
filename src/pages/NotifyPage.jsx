import Header from "@/components/base/Header";
import Notify from "@/components/domain/Notify/Notify";
import Nav from "@/components/base/Nav";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import React, { useCallback, useEffect, useState } from "react";
const jwt =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsg4HspIAiLCJpYXQiOjE2Mzk0OTA3NzV9.vGGkSdOKu0SzycvKcENN-jTElRza2FkkOwoCwnNLbZI";
const socketUrl = "https://needit-websocket-test.herokuapp.com/websocket-stomp";

const deleteAlarm = async (id) => {
  await fetch(
    `https://needit-websocket-test.herokuapp.com/notification/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
};
const getList = async () => {
  const result = await fetch(
    `https://needit-websocket-test.herokuapp.com/notifications`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  ).then((res) => res.json());
  return result;
};

const NotifyPage = () => {
  const connect = useCallback(() => {
    const socket = new SockJS(socketUrl);
    const stompClient = Stomp.over(socket);

    stompClient.connect({ Authorization: jwt }, function () {
      console.log("연결  완료");
      stompClient.subscribe("/user/topic/notifications", (res) => {
        const data = JSON.parse(res.body);
        updateList(data);
      });
    });
  });

  const [list, setList] = useState([]);

  const updateList = (data) => {
    setList((prev) => [...prev, data]);
  };
  const getAlarm = async () => {
    const list = await getList();
    setList(list);
  };

  useEffect(() => {
    getAlarm();
    connect();
  }, []);
  return (
    <>
      <Header type="main" />
      <Notify
        list={list}
        onClick={async (id) => {
          await deleteAlarm(id);
          getAlarm(); // 라우터 이동 함수 대체
        }}
      />
      <Nav />
    </>
  );
};

export default React.memo(NotifyPage);
