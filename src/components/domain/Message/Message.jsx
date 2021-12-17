import { Link } from "react-router-dom";

const Message = () => {
  return (
    <div>
      <br />
      <Link to="login">login</Link>
      <br />
      <Link to="register">register</Link>
      <br />
      <Link to="wishes">wishes</Link>
      <br />
      <Link to="donations">donations</Link>
      <br />
      <Link to="user">user</Link>
      <br />
      <Link to="member/memberId">member</Link>
      <br />
      <Link to="center/centerId">center</Link>
      <br />
      <Link to="message">message</Link>
      <br />
      <Link to="schedule">schedule</Link>
      <br />
      <Link to="notify">notify</Link>
      <br />
      <Link to="writes">writes</Link>
    </div>
  );
};

export default Message;
