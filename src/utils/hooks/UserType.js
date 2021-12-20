import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";

function UserType(user) {
  if (user) {
    if (!localStorage.getItem("needit_access_token") && user === "guest")
      return true;
    else if (
      jwt_decode(localStorage.getItem("needit_access_token")).auth ===
        "ROLE_CENTER" &&
      user === "center"
    )
      return true;
    else if (
      jwt_decode(localStorage.getItem("needit_access_token")).auth ===
        "ROLE_MEMBER" &&
      user === "member"
    )
      return true;
    else return false;
  }

  let userType = "member";
  if (!localStorage.getItem("needit_access_token")) return "guest";
  if (
    jwt_decode(localStorage.getItem("needit_access_token")).auth ===
    "ROLE_CENTER"
  )
    userType = "center";

  return userType;
}

export default UserType;

UserType.propTypes = {
  user: PropTypes.string,
};
