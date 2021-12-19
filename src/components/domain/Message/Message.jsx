import { List } from "@mui/material";
import { ListItemAvatar } from "@mui/material";
import { Avatar } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import { PropTypes } from "prop-types";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Message = ({ list }) => {
  const navigate = useNavigate();

  function pushParams(postId, postType, recieverId) {
    navigate(`/message/${postId}/${postType}/${recieverId}`);
  }
  const me = "MEMBER".toLowerCase();
  const reciever = "CENTER".toLowerCase();

  return (
    <>
      <List>
        {list.map((message) => (
          <ListItemButton
            key={message.poistId + message[reciever]}
            onClick={() => {
              pushParams(
                message.postId,
                message.postType,
                message[reciever].id
              );
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt={message[me].name}
                src={message[me].profileImageUrl}
              />
            </ListItemAvatar>
            <List>
              <ListItemText
                sx={{
                  color: "primary.main",
                  typography: "h3",
                }}
              >
                <Typography variant="h5">
                  {message[me].name || message[me].name}
                </Typography>
              </ListItemText>
              <ListItemText
                sx={{
                  color: "gray_dark.dark",
                  width: "280px",
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "webkitBox",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  <Typography variant="body4">{message.content}</Typography>
                </div>
              </ListItemText>
            </List>
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

Message.propTypes = {
  list: PropTypes.array,
  callback: PropTypes.func,
};

export default Message;
