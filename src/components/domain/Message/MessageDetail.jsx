import { Avatar } from "@mui/material";
import { ListItem } from "@mui/material";
import { List } from "@mui/material";
import { ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Button } from "@mui/material";
import { useState } from "react";
import { Container } from "@mui/material";
import Input from "@/components/base/Input";

const MessageDetail = ({ list, sendMessage }) => {
  const [text, setText] = useState("");
  const user = "나";
  return (
    <>
      <List
        sx={{
          mt: "5rem",
        }}
      >
        {list.map((message) => (
          <ListItem
            key={message.id}
            sx={{
              display: "flex",
              px: "16px",
              justifyContent: `${
                message.user !== user ? "flex-start" : "flex-end"
              }`,
            }}
          >
            {message.user !== user && (
              <Avatar
                alt={message.user}
                src={message.src}
                sx={{
                  mr: "16px",
                }}
              />
            )}
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: `${
                  message.user !== user ? "flex-start" : "flex-end"
                }`,
              }}
            >
              <ListItemText
                primary={message.user}
                sx={{
                  color: "primary.main",
                }}
              />
              <ListItemText
                primary={message.text}
                sx={{
                  p: 2,
                  backgroundColor: "primary.main",
                  color: "white.main",
                  borderRadius: "8px",
                  maxWidth: "60%",
                  whiteSpace: "normal",
                }}
              />
            </List>
          </ListItem>
        ))}
      </List>
      <Container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <CalendarTodayIcon
          onClick={() => alert("캘린터 짠")}
          sx={{ mr: "8px", color: "primary.main" }}
        />
        <Input
          type="message"
          sx={{
            flexGrow: "1",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.code !== "Enter") return;
            sendMessage(text);
            setText("");
          }}
        />
        <Button
          variant="contained"
          onClick={() => sendMessage(text)}
          sx={{ ml: "8px", color: "white.main" }}
        >
          전송
        </Button>
      </Container>
    </>
  );
};

MessageDetail.propTypes = {
  list: PropTypes.array,
  sendMessage: PropTypes.func,
};

export default MessageDetail;
