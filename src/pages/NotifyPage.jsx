import Header from "@/components/base/Header";
import Notify from "@/components/domain/Notify/Notify";
import Nav from "@/components/base/Nav";
const dummyData = [
  {
    id: 1,
    title: "새로운메세지",
    text: "새로운 메세지가 도착했습니다. 확인해주세요",
  },
  {
    id: 2,
    title: "새로운메세지",
    text: "새로운 메세지가 도착했습니다. 확인해주세요",
  },
  {
    id: 3,
    title: "새로운메세지",
    text: "새로운 메세지가 도착했습니다. 확인해주세요",
  },
  {
    id: 4,
    title: "새로운메세지",
    text: "새로운 메세지가 도착했습니다. 확인해주세요",
  },
  {
    id: 5,
    title: "새로운메세지",
    text: "새로운 메세지가 도착했습니다. 확인해주세요",
  },
  {
    id: 6,
    title: "새로운메세지",
    text: "새로운 메세지가 도착했습니다. 확인해주세요",
  },
];
const NotifyPage = () => {
  return (
    <>
      <Header type="main" />
      <Notify list={dummyData} onClick={(id) => console.log(id)} />
      <Nav />
    </>
  );
};

export default NotifyPage;
