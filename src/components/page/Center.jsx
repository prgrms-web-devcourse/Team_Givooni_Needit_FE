import Header from "../Header";

const Center = () => {
  return (
    <div>
      <Header type="main" />
      <Header type="member" view="멤버" />
      <Header type="member" view="센터" />
      <Header type="edit" url="https://naver.com" />
      <Header type="confirm" url="https://naver.com" />;
    </div>
  );
};

export default Center;
