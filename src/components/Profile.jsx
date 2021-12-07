import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import useAsync from "../utils/hooks/useAsync";

const useStyles = makeStyles({
  avatar: ({ width, height }) => ({
    width: `${width}px!important`,
    height: `${height}px!important`,
  }),
});

const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

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

async function getUsers() {
  await wait(1000);
  return dataArr;
}

const Profile = ({ max, width, height }) => {
  const classes = useStyles({ width, height });
  const [state, refetch] = useAsync(getUsers, []);
  const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

  console.log(max, width, height, refetch);

  //Avatar 태그 클릭시 이벤트
  const clickAvatarHandler = (id) => {
    //해당 대상의 마이페이지로 이동하는 함수 구현
    console.log(id);
  };

  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress style={{ color: "#FD9F28", width, height }} />
      </Box>
    );
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <>
      <AvatarGroup max={max} classes={{ avatar: classes.avatar }}>
        {users.map(({ name, image, id }) => {
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
      </AvatarGroup>{" "}
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
