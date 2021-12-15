import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  avatar: ({ width, height }) => ({
    width: `${width}px!important`,
    height: `${height}px!important`,
  }),
});

const Profile = ({ max, width, height, comments = [] }) => {
  const classes = useStyles({ width, height });

  //Avatar 태그 클릭시 이벤트
  const clickAvatarHandler = (id) => {
    //해당 대상의 마이페이지로 이동하는 함수 구현
    console.log(id);
  };

  return (
    <>
      <AvatarGroup max={max} classes={{ avatar: classes.avatar }}>
        {comments.map(({ userName, userImage, userId }) => {
          return (
            <Avatar
              key={userId + Math.random()}
              alt={userName}
              src={userImage}
              onClick={() => {
                clickAvatarHandler(userId);
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
  comments: [],
};

Profile.propTypes = {
  max: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  comments: PropTypes.array,
};

export default Profile;
