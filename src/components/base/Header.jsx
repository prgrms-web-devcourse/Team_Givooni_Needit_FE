import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";
import PropTypes from "prop-types";
import theme from "@/styles/theme";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getRequest } from "@/api/axios";
import { useCallback, useEffect, useState } from "react";
import UserType from "@/utils/UserType";

const Container = styled.div`
  position: ${({ fixed }) => fixed && "fixed"};
  top: 0;
  background-color: white;
  display: flex;
  padding: 0rem 1rem;
  margin-bottom: 1rem;
  z-index: 500;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
  height: 5rem;
  color: ${theme.palette.primary.main};
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const logo = (
  <svg
    width="8rem"
    viewBox="0 0 300 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_258_4125)">
      <path
        opacity="0.997"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M253.295 0.10891C256.429 -0.339863 259.029 0.598269 261.099 2.9233C261.764 3.97957 262.062 5.13091 261.994 6.37733C259.124 21.0263 256.14 35.6526 253.04 50.2562C247.582 50.2562 242.123 50.2562 236.665 50.2562C239.458 35.9883 242.401 21.7458 245.492 7.52867C246.205 4.93953 247.698 2.93536 249.969 1.5161C251.104 1.03226 252.212 0.563194 253.295 0.10891Z"
        fill="#FD9F28"
      />
      <path
        opacity="0.997"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M291.418 8.80795C291.22 10.2598 291.049 11.7523 290.906 13.2854C290.913 13.5591 290.997 13.7723 291.162 13.925C291.077 14.0956 290.991 14.2661 290.906 14.4368C290.361 15.4461 290.105 16.5548 290.138 17.7628C290.146 18.6164 289.977 19.4265 289.626 20.1934C291.502 20.2788 293.38 20.364 295.256 20.4493C299.169 21.2403 300.661 23.5857 299.733 27.4853C298.81 30.8822 296.635 32.9718 293.209 33.7537C291.077 33.8817 288.946 33.9241 286.812 33.8817C286.086 37.9474 285.231 41.9556 284.253 45.9068C283.742 47.0154 283.486 48.2094 283.486 49.4887C283.307 51.2264 282.967 52.9322 282.463 54.6058C282.608 55.0046 282.779 55.3884 282.975 55.7571C283.788 56.1309 284.64 56.3443 285.534 56.3967C286.697 56.365 287.805 56.1943 288.859 55.8851C292.451 57.4041 293.475 60.0053 291.929 63.6886C290.817 65.8239 289.197 67.4442 287.067 68.5499C283.21 70.2292 279.201 70.6554 275.043 69.8291C268.163 68.3955 265.134 64.1739 265.96 57.1644C267.424 49.3766 269.002 41.6156 270.694 33.8817C268.477 34.0957 266.346 33.7975 264.297 32.9861C262.979 31.8501 262.296 30.4002 262.25 28.6365C262.695 24.4501 264.914 21.7637 268.902 20.5773C269.055 20.7406 269.268 20.826 269.543 20.833C270.905 20.694 272.226 20.5235 273.508 20.3214C274.204 16.8008 275.015 13.3042 275.939 9.83135C278.49 5.42256 282.284 3.67421 287.324 4.58635C289.427 5.28319 290.794 6.69039 291.418 8.80795Z"
        fill="#FD9F28"
      />
      <path
        opacity="0.998"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M206.218 0.620629C211.406 0.135174 214.306 2.43785 214.917 7.52868C210.733 28.1866 206.469 48.8252 202.124 69.4453C197.348 69.4453 192.573 69.4453 187.797 69.4453C187.839 68.2481 187.796 67.0544 187.668 65.8633C181.067 70.9815 173.776 72.2183 165.793 69.5733C162.129 68.1257 159.698 65.5246 158.502 61.7697C157.405 57.7011 157.319 53.6074 158.245 49.4888C159.143 43.5097 160.678 37.7103 162.851 32.0906C168.478 21.1964 177.39 16.719 189.588 18.6584C191.272 19.0104 192.764 19.7353 194.065 20.833C195.098 16.7801 196.036 12.6864 196.88 8.5521C198.486 4.0851 201.599 1.44128 206.218 0.620629ZM184.215 33.6258C188.914 33.2505 190.918 35.3825 190.227 40.0222C189.544 43.263 188.863 46.5037 188.18 49.7446C186.68 53.9666 183.738 55.8004 179.354 55.2455C176.935 54.2049 175.955 52.3715 176.411 49.7446C177.1 45.8684 177.954 42.0306 178.97 38.2311C180.058 35.9034 181.807 34.3682 184.215 33.6258Z"
        fill="#FD9F28"
      />
      <path
        opacity="0.998"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.9331 18.0187C22.269 17.8102 24.8275 19.0895 26.6088 21.8564C33.8412 17.294 41.261 16.9102 48.8681 20.7052C52.5373 23.9042 54.2431 27.955 53.9852 32.8581C53.891 34.3109 53.7631 35.7608 53.6013 37.2077C51.4094 47.9536 49.2348 58.6994 47.0771 69.4452C40.9362 69.488 34.7957 69.4452 28.6556 69.3174C31.0159 58.9655 33.1481 48.5608 35.0519 38.1033C34.956 34.598 33.1651 33.1481 29.6791 33.7537C27.5636 34.4179 25.9861 35.7399 24.9457 37.7194C22.4399 48.2447 20.1798 58.8202 18.1656 69.4452C12.108 69.5305 6.05281 69.4452 0 69.1895C3.0224 55.2232 5.96472 41.2364 8.82696 27.2294C10.149 21.8541 13.5178 18.7839 18.9331 18.0187Z"
        fill="#FD9F28"
      />
      <path
        opacity="0.998"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102.086 50.0004C92.6191 50.0004 83.1526 50.0004 73.6859 50.0004C73.6859 50.2562 73.6859 50.5121 73.6859 50.7679C74.3637 53.7153 76.2401 55.2933 79.3147 55.5012C81.4561 55.6762 83.5882 55.5911 85.711 55.2453C88.2909 54.4987 90.8922 53.8591 93.5147 53.3264C98.5257 53.9145 100.232 56.6434 98.6316 61.5139C96.8555 64.5676 94.3397 66.8279 91.084 68.294C82.8947 71.5492 74.6221 71.8051 66.2661 69.0615C59.429 66.1777 56.0176 61.0182 56.032 53.5823C56.5944 46.7194 58.0868 40.0671 60.5095 33.6258C66.1301 23.3915 74.8291 18.1891 86.6065 18.0186C99.6395 18.0026 105.695 24.4842 104.772 37.4635C104.512 41.7918 103.617 45.9707 102.086 50.0004ZM81.8733 32.8581C83.4678 32.7147 85.0028 32.9278 86.4786 33.4978C87.7643 34.6258 88.2333 36.033 87.8858 37.7194C84.1069 38.0579 80.3118 38.0579 76.5003 37.7194C77.513 35.2134 79.304 33.5929 81.8733 32.8581Z"
        fill="#FD9F28"
      />
      <path
        opacity="0.998"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M136.37 18.0187C141.422 17.7681 146.113 18.9194 150.442 21.4727C154.444 25.1849 156.235 29.7903 155.815 35.2888C155.815 40.3576 154.921 45.2614 153.129 50.0004C143.723 50.2553 134.299 50.3407 124.857 50.2562C125.183 53.609 127.059 55.3575 130.485 55.5012C132.541 55.6714 134.588 55.5859 136.626 55.2455C139.277 54.4466 141.964 53.807 144.685 53.3266C148.826 53.6308 150.618 55.8482 150.058 59.9787C149.453 62.2924 148.216 64.2113 146.348 65.7354C142.835 68.2717 138.912 69.8069 134.579 70.3408C128.953 71.3184 123.409 70.9774 117.948 69.3174C110.791 66.6452 107.124 61.4857 106.947 53.8382C107.586 47.1863 108.994 40.7044 111.168 34.3933C116.393 24.0823 124.793 18.624 136.37 18.0187ZM132.788 32.8583C135.065 32.4075 136.983 33.0043 138.544 34.6492C138.874 35.7315 139.003 36.8403 138.928 37.9752C135.09 38.018 131.252 37.9752 127.415 37.8474C128.44 35.329 130.231 33.666 132.788 32.8583Z"
        fill="#FD9F28"
      />
      <path
        opacity="0.502"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102.086 50.0004C92.6064 50.0889 83.1398 50.3448 73.686 50.768C73.686 50.5121 73.686 50.2563 73.686 50.0004C83.1526 50.0004 92.6191 50.0004 102.086 50.0004Z"
        fill="#FD9F28"
      />
      <path
        opacity="0.994"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M242.549 53.5825C249.987 53.4406 252.588 56.9372 250.353 64.0724C247.763 68.7573 243.797 70.6762 238.455 69.8292C234.205 68.6228 232.627 65.8511 233.723 61.5139C234.946 56.9192 237.889 54.2754 242.549 53.5825Z"
        fill="#FD9F28"
      />
    </g>
    <defs>
      <clipPath id="clip0_258_4125">
        <rect width="300" height="71.9457" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Header = ({ type, view, url, fixed }) => {
  const [length, setLength] = useState(0);
  const jwt = localStorage.getItem("needit_access_token");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const updateNotify = async () => {
    if (UserType() === "guest") return;
    const result = await getRequest("notification");
    const newLength = result.data.length;
    setLength(newLength);
  };
  const connect = useCallback(() => {
    const socket = new SockJS(`${API_BASE_URL}/stomp-handshake`);
    const stompClient = Stomp.over(socket);

    stompClient.connect({ Authorization: jwt }, function () {
      stompClient.subscribe("/user/topic/notifications", () => {
        updateNotify();
      });
    });
  }, []);
  useEffect(() => {
    connect();
    updateNotify();
  }, []);
  switch (type) {
    case "plain":
      return (
        <Container fixed={fixed}>
          <Link
            to="/"
            style={{
              textDecorationLine: "none",
              color: theme.palette.primary.main,
              display: "flex",
              gap: ".5rem",
              alignItems: "flex-end",
            }}
          >
            {logo}
            {view}
          </Link>
          <RightContainer></RightContainer>
        </Container>
      );
    case "main":
      return (
        <Container fixed={fixed}>
          <Link to="/">{logo}</Link>
          <RightContainer>
            <Link
              to="/search"
              style={{
                textDecorationLine: "none",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Input type="searchSmall" />
            </Link>
            <Link to="/notify">
              <div
                style={{
                  position: "relative",
                }}
              >
                <NotificationsIcon
                  style={{ fontSize: "1.9rem", color: "#FD9F28" }}
                />
                {length !== 0 && (
                  <div
                    style={{
                      position: "absolute",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      textAlign: "center",
                      top: "-6px",
                      left: "0px",
                    }}
                  >
                    {length}
                  </div>
                )}
              </div>
            </Link>
          </RightContainer>
        </Container>
      );
    case "searchOut":
      return (
        <Container fixed={fixed}>
          <Link to="/">{logo}</Link>
          <RightContainer>
            <Link to="/notify">
              <div
                style={{
                  position: "relative",
                }}
              >
                <NotificationsIcon
                  style={{ fontSize: "1.9rem", color: "#FD9F28" }}
                />
                {length !== 0 && (
                  <div
                    style={{
                      position: "absolute",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      textAlign: "center",
                      top: "-6px",
                      left: "0px",
                    }}
                  >
                    {length}
                  </div>
                )}
              </div>
            </Link>
          </RightContainer>
        </Container>
      );
    case "member":
      return (
        <Container fixed={fixed}>
          <Link
            to="/"
            style={{
              textDecorationLine: "none",
              color: theme.palette.primary.main,
              display: "flex",
              gap: ".5rem",
              alignItems: "flex-end",
            }}
          >
            {logo}
            {view}
          </Link>
          <RightContainer>
            <Link
              to="/search"
              style={{
                textDecorationLine: "none",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Input type="searchSmall" />
            </Link>
            <Link to="/notify">
              <div
                style={{
                  position: "relative",
                }}
              >
                <NotificationsIcon
                  style={{ fontSize: "1.9rem", color: "#FD9F28" }}
                />
                {length !== 0 && (
                  <div
                    style={{
                      position: "absolute",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      textAlign: "center",
                      top: "-6px",
                      left: "0px",
                    }}
                  >
                    {length}
                  </div>
                )}
              </div>
            </Link>
          </RightContainer>
        </Container>
      );
    case "edit":
      return (
        <Container fixed={fixed}>
          <Link to="/">{logo}</Link>
          <RightContainer>
            <Link
              to="/username"
              style={{
                color: theme.palette.primary.main,
                textDecorationLine: "none",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => console.log(url)}
            >
              편집
            </Link>
          </RightContainer>
        </Container>
      );
    case "confirm":
      return (
        <Container fixed={fixed}>
          <Link to="/">{logo}</Link>
          <RightContainer>
            <Link
              to="/username"
              style={{
                color: theme.palette.primary.main,
                textDecorationLine: "none",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => console.log(url)}
            >
              완료
            </Link>
          </RightContainer>
        </Container>
      );
  }
};

Header.propTypes = {
  fixed: PropTypes.bool,
  type: PropTypes.string,
  view: PropTypes.string,
  url: PropTypes.string,
};

export default Header;
