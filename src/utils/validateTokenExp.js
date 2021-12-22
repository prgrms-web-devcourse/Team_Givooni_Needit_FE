import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";

function validateTokenExp(error) {
  if (
    error.response.status === 401 &&
    localStorage.getItem("needit_access_token") &&
    Math.floor(Date.now() / 1000) >
      jwt_decode(localStorage.getItem("needit_access_token")).exp
  ) {
    localStorage.removeItem("needit_access_token");
  }
  alert("로그인 유효시간이 만료되었습니다. \n로그인 화면으로 이동합니다");
  history.pushState(null, null, "/login");
  location.reload();
}

export default validateTokenExp;

validateTokenExp.propTypes = {
  error: PropTypes.string,
};
