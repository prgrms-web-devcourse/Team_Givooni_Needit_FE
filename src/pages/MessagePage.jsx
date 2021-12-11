import Header from "@/components/base/Header";
import MessageDetail from "@/components/domain/Message/MessageDetail";
// import Message from "@/components/domain/Message/Message";
const dummyData = [
  {
    id: 1,
    img: null,
    user: "기부니",
    text: "안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?안녕?",
  },
  {
    id: 2,
    img: null,
    user: "기부니",
    text: "안녕?",
  },
  {
    id: 3,
    img: null,
    user: "기부니",
    text: "안녕?",
  },
  {
    id: 4,
    img: null,
    user: "기부니",
    text: "안녕?",
  },
  {
    id: 5,
    img: null,
    user: "기부니",
    text: "안녕?",
  },
  {
    id: 6,
    img: null,
    user: "기부니",
    text: "안녕?",
  },
];
const dummyMessage = [
  {
    id: "1",
    user: "기부니",
    text: "hello",
    src: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    id: "2",
    user: "기부니",
    text: "hello",
    src: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    id: "3",
    user: "나",
    text: "hello",
  },
  {
    id: "4",
    user: "기부니",
    text: "hello",
    src: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    id: "5",
    user: "나",
    text: "hello",
  },
  {
    id: "6",
    user: "나",
    text: "hello",
  },
];
const MessagePage = () => {
  console.log(dummyData);
  return (
    <>
      <Header type="main" />
      {/* <Message list={dummyData} callback={(id) => console.log(id)} /> */}
      <MessageDetail
        list={dummyMessage}
        sendMessage={(value) => console.log(value)}
      />
    </>
  );
};

export default MessagePage;
