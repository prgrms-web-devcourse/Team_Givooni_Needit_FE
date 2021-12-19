import Header from "@/components/base/Header";
import MessageDetail from "@/components/domain/Message/MessageDetail";
import Message from "@/components/domain/Message/Message";
import Nav from "@/components/base/Nav";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

// getUserList()
function dispatchMessageList() {
  console.log("새로운 리스트 받아오기");
}

// 예약생성 api 함수
function reserveDonation(postId, postType, recieverId, date) {
  console.log(date, "시간으로 예약함");
  console.log("기타필요한데이터", postId, postType, recieverId);
  dispatchMessageList();
}

function contract(contractId, contractStatus) {
  console.log(`기부예약${contractId}가 ${contractStatus}되었습니다.`);
  dispatchMessageList();
}

const userList = [
  {
    postId: 1,
    postType: "Donation",
    messageId: 43,
    content:
      "CONTENTwdwdwdqwdqwddwerigjoirtjhoitjhoitqjhqtieorpjheqropihjerqphoiuerjqguioperqjiogrejigjrioij",
    member: {
      id: 1,
      name: "테스트멤버",
      profileImageUrl:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      introduction: "자기소개 없음",
    },
    center: {
      id: 1,
      name: "테스트 센터",
      contact: "02-111-1111",
      address: "서울특별시 관악구",
      profileImageUrl:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      owner: "테스트",
      introduction: "자기소개 없음",
    },
    senderType: "MEMBER",
    contract: null,
  },
];

const messageList = [
  {
    messageId: 1, // 채팅 메시지의 식별자.
    content: "짧은 대화", // 채팅 메시지 내용.
    member: {
      name: "멤버", // 채팅에 참여하고 있는 회원의 정보. 어디까지 필요한지?
      imageUrl: "...", //
    },
    center: {
      name: "센터", // 채팅에 참여하고 있는 회원의 정보. 어디까지 필요한지?
      imageUrl: "...", //
    },
    senderType: "CENTER", // 채팅을 보낸 사람의 타입. 회원("MEMBER") 또는 센터("CENTER")
    contract: null,
  },
  {
    messageId: 2, // 채팅 메시지의 식별자.
    content:
      "매우 긴 대화매우 긴 대화매우 긴 대화매우 긴 대화매우 긴 대화매우 긴 대화매우 긴 대화매우 긴 대화매우 긴 대화매우 긴 대화매우 긴 대화매우 긴 대화매우 긴 대화매우 긴 대화", // 채팅 메시지 내용.
    member: {
      name: "멤버", // 채팅에 참여하고 있는 회원의 정보. 어디까지 필요한지?
      imageUrl: "...", //
    },
    center: {
      name: "센터", // 채팅에 참여하고 있는 회원의 정보. 어디까지 필요한지?
      imageUrl: "...", //
    },
    senderType: "MEMBER", // 채팅을 보낸 사람의 타입. 회원("MEMBER") 또는 센터("CENTER")
    contract: null,
  },
  {
    messageId: 3, // 채팅 메시지의 식별자.
    content: "이거 렌더링 되면 큰일남", // 채팅 메시지 내용.
    member: {
      name: "멤버", // 채팅에 참여하고 있는 회원의 정보. 어디까지 필요한지?
      imageUrl: "...", //
    },
    center: {
      name: "센터", // 채팅에 참여하고 있는 회원의 정보. 어디까지 필요한지?
      imageUrl: "...", //
    },
    senderType: "MEMBER", // 채팅을 보낸 사람의 타입. 회원("MEMBER") 또는 센터("CENTER")
    contract: {
      contractId: 1, // 기부 예약의 식별자.
      postId: 1, // 기부 예약이 진행되는 기부 게시글의 식별자.
      postTitle: "12월 25일 크리스마스 봉사 모집",
      postType: "DONATION", // 기부 예약이 진행되는 기부 게시글의 종류. '기부할래요'("DONATION"), '기부원해요'("WISH").
      receiverId: 101, // 기부 예약을 받을 반대편 회원(또는 센터)의 식별자.
      contractDate: "2021-12-15T17:48:12", // 기부 예약 날짜.
      status: "ACCEPTED", // 기부 예약의 진행상태. 요청됨("REQUESTED"), 수락됨("ACCEPTED"), 거절됨("REFUSED") 세 가지 상태가 있음.
    },
  },
];
// 메세지를 보내는 요청 후에 리스트 갱신하는 디스패치 보내는 함수
function sendMessage(text, postId, postType, recieverId) {
  console.log(text, postId, postType, recieverId);
  dispatchMessageList();
}

const MessagePage = () => {
  useEffect(() => {
    dispatchMessageList();
  }, []);
  const { postId, postType, recieverId } = useParams();
  console.log(postId, postType, recieverId);
  return (
    <>
      <Header type="main" />
      {postId ? (
        <MessageDetail
          list={messageList}
          sendMessage={(text) =>
            sendMessage(text, postId, postType, recieverId)
          }
          reserveDonation={(date) => {
            reserveDonation(date, postId, postType, recieverId);
          }}
          contract={contract}
        />
      ) : (
        <Message list={userList} />
      )}

      {postId || <Nav />}

    </>
  );
};

export default React.memo(MessagePage);
