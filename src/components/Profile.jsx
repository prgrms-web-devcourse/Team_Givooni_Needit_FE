import Avatar from "@mui/material/Avatar";

import AvatarGroup from "@mui/material/AvatarGroup";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatar: ({ width, height }) => ({
    width: `${width}px!important`,
    height: `${height}px!important`,
  }),
});

//dummy Data
const dataArr = [
  {
    name: "mmmm",
    image: "/",
    id: "khw970421",
  },
  {
    name: "김",
    image: "/",
    id: "khw97wdlwloed0",
  },
  {
    name: "박",
    image: "",
    id: "kii9222swwsss",
  },
  {
    name: "윤",
    image: "",
    id: "kqwjeowos11ss",
  },
  {
    name: "윤",
    image: "",
    id: "kqwjeowos11ss",
  },
  {
    name: "윤",
    image: "",
    id: "kqwjeowos11ss",
  },
  {
    name: "윤",
    image: "",
    id: "kqwjeowos11ss",
  },
];

// 사이즈 크기 자유롭게

const Profile = ({ max, width, height }) => {
  const classes = useStyles({ width, height });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //초기 api 실행
  useEffect(async () => {
    await setTimeout(() => {
      setLoading(false);
      // api로 부터 받아온 댓글 사용자 데이터 넣기
      setData(dataArr);
    }, 3000);
  }, []);

  //Avatar 태그 클릭시 이벤트
  const clickAvatarHandler = (id) => {
    //해당 대상의 마이페이지로 이동하는 함수 구현
    console.log(id);
  };

  return (
    <>
      {loading ? (
        <>
          <Box sx={{ display: "flex" }}>
            <CircularProgress style={{ color: "#FD9F28", width, height }} />
          </Box>
        </>
      ) : (
        <AvatarGroup max={max} classes={{ avatar: classes.avatar }}>
          {data.map(({ name, image, id }) => {
            return (
              <Avatar
                key={id + Math.random()}
                alt={name}
                src={image}
                onClick={() => {
                  clickAvatarHandler(id);
                }}
              />
            );
          })}
        </AvatarGroup>
      )}
    </>
  );
};

Profile.defaultProps = {
  max: 3,
  width: 40,
  height: 40,
};

Profile.propTypes = {
  max: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Profile;
