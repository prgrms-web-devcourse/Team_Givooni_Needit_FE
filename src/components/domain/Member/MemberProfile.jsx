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

// 사이즈 크기 자유롭게

const MemberProfile = ({ width, height, users }) => {
  const classes = useStyles({ width, height });
  //Avatar 태그 클릭시 이벤트
  const clickAvatarHandler = (id) => {
    console.log(id);
  };

  return (
    <>
      <AvatarGroup max={3} classes={{ avatar: classes.avatar }}>
        {users.map(({ center, centerImage, id }) => {
          return (
            <Avatar
              key={id + Math.random()}
              alt={center}
              src={centerImage}
              onClick={() => {
                clickAvatarHandler(id);
              }}
            />
          );
        })}
      </AvatarGroup>
    </>
  );
};

MemberProfile.defaultProps = {
  max: 3,
  width: 40,
  height: 40,
};

MemberProfile.propTypes = {
  max: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  users: PropTypes.array,
};

export default MemberProfile;
