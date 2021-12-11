import { List } from "@mui/material";
import { ListItemAvatar } from "@mui/material";
import { Avatar } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import { PropTypes } from "prop-types";
const Message = ({ list, callback }) => {
  return (
    <>
      <List
        sx={{
          mt: "5rem",
        }}
      >
        {list.map((message) => (
          <ListItemButton key={message.id} onClick={() => callback(message.id)}>
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={
                  message.img ||
                  "https://randomuser.me/api/portraits/men/23.jpg"
                }
              />
            </ListItemAvatar>
            <List>
              <ListItemText
                primary={message.user}
                sx={{
                  color: "primary.main",
                  typography: "h3",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              ></ListItemText>
              <ListItemText
                primary={message.text}
                sx={{
                  color: "gray_dark.dark",
                  typography: "body1",
                  // whiteSpace: "nowrap",
                  // textOverflow: "ellipsis",
                }}
              ></ListItemText>
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
