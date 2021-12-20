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
  const token = localStorage.getItem("needit_access_token");
  const base64 = token.split(".")[1];
  const payLoad = Buffer.from(base64, "base64");
  const result = JSON.parse(payLoad);
  const me = result.auth.split("_")[1].toLowerCase();
  const you = me === "center" ? "member" : "center";
  return (
    <>
      <List>
        {list.map((message) => (
          <ListItemButton
            key={message.poistId + message[you]}
            onClick={() => {
              pushParams(message.postId, message.postType, message[you].id);
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt={message[you].name}
                src={message[you].profileImageUrl}
              />
            </ListItemAvatar>
            <List>
              <ListItemText
                sx={{
                  color: "primary.main",
                  typography: "h3",
                }}
              >
                <Typography variant="h5">{message[you].name}</Typography>
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
