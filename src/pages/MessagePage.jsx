import Header from "@/components/base/Header";
import MessageDetail from "@/components/domain/Message/MessageDetail";
import Message from "@/components/domain/Message/Message";
import Nav from "@/components/base/Nav";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getUserList,
  getMessageList,
  sendMessage,
  createContract,
  patchContract,
} from "@/api/services/chatting";

const MessagePage = () => {
  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const { postId, postType, recieverId } = useParams();
  useEffect(() => {
    window.scroll({
      top: 10000000,
      behavior: "smooth",
    });
  }, [userList, messageList]);
  useEffect(async () => {
    const nextList = await getUserList();
    setUserList(nextList);
    if (postId) {
      const nextList = await getMessageList(postId, postType, recieverId);
      setMessageList(nextList);
    }
  }, [postId]);
  return (
    <>
      <Header type="main" />
      {postId ? (
        <MessageDetail
          list={messageList}
          sendMessage={async (text) => {
            await sendMessage(text, postId, postType, recieverId);
            const nextList = await getMessageList(postId, postType, recieverId);
            setMessageList(nextList);
          }}
          reserveDonation={async (date) => {
            await createContract(date, postId, postType, recieverId);
            const nextList = await getMessageList(postId, postType, recieverId);
            setMessageList(nextList);
          }}
          contract={async (id, contractStatus) => {
            await patchContract(id, contractStatus);
            const nextList = await getMessageList(postId, postType, recieverId);
            setMessageList(nextList);
          }}
        />
      ) : (
        <Message list={userList} />
      )}

      {postId || <Nav />}
    </>
  );
};

export default React.memo(MessagePage);
