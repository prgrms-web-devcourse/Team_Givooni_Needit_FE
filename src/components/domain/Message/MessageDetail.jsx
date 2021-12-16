import { Avatar } from "@mui/material";
import { ListItem } from "@mui/material";
import { List } from "@mui/material";
import { ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import AddSchedule from "./AddSchedule";
import { Button } from "@mui/material";
import { useState } from "react";
import { Container } from "@mui/material";
import Input from "@/components/base/Input";
import { ListItemButton } from "@mui/material";
const MessageDetail = ({ list, sendMessage, reserveDonation, contract }) => {
  const [text, setText] = useState("");
  const me = "MEMBER".toLowerCase();
  return (
    <>
      <List
        sx={{
          mt: "5rem",
        }}
      >
        {list.map((message) => {
          return message.contract === null ? (
            <ListItem
              key={message.messageId + message.senderType + "메세지"}
              sx={{
                display: "flex",
                px: "16px",
                justifyContent: `${
                  message.senderType !== me.toUpperCase()
                    ? "flex-start"
                    : "flex-end"
                }`,
              }}
            >
              {message.senderType !== me.toUpperCase() && (
                <Avatar
                  alt={message[message.senderType.toLowerCase()].name}
                  src={message[message.senderType.toLowerCase()].imageUrl}
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
                    message.senderType !== me.toUpperCase()
                      ? "flex-start"
                      : "flex-end"
                  }`,
                }}
              >
                <ListItemText
                  primary={message[message.senderType.toLowerCase()].name}
                  sx={{
                    color: "primary.main",
                  }}
                />
                <ListItemText
                  primary={message.content}
                  sx={{
                    p: 2,
                    backgroundColor: `${
                      message.senderType !== me.toUpperCase()
                        ? "primary.main"
                        : "gray.light"
                    }`,
                    color: `${
                      message.senderType !== me.toUpperCase()
                        ? "white.main"
                        : "primary.main"
                    }`,
                    borderRadius: "8px",
                    whiteSpace: "pre-wrap",
                    maxWidth: "50%",
                    boxShadow: 2,
                  }}
                />
              </List>
            </ListItem>
          ) : (
            <List
              sx={{
                px: "16px",
                mx: "24px",
              }}
            >
              <List
                sx={{
                  backgroundColor: "gray.light",

                  borderRadius: "8px",
                }}
              >
                <ListItemText
                  primary={message.contract.postTitle}
                  sx={{
                    textAlign: "center",
                    color: "#727171",
                  }}
                />
                <ListItemText
                  primary={message.contract.contractDate}
                  sx={{
                    textAlign: "center",
                    color: "#727171",
                  }}
                />
              </List>
              <ListItem
                sx={{
                  display: "flex",
                  padding: 0,
                  borderRadius: "8px",
                  my: "12px",
                }}
              >
                <ListItemButton
                  onClick={() => {
                    contract(message.contract.contractId, "ACCEPTED");
                  }}
                  sx={{
                    backgroundColor: `${
                      message.contract.status === "ACCEPTED"
                        ? "primary.main"
                        : "white.main"
                    }`,
                    marginRight: "8px",
                    borderRadius: "8px",
                  }}
                >
                  <ListItemText
                    primary="수락"
                    sx={{
                      textAlign: "center",
                      color: `${
                        message.contract.status === "ACCEPTED"
                          ? "white.main"
                          : "black"
                      }`,
                    }}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    contract(message.contract.contractId, "REFUSED");
                  }}
                  sx={{
                    backgroundColor: `${
                      message.contract.status === "REFUSED"
                        ? "primary.main"
                        : "white.main"
                    }`,
                    borderRadius: "8px",
                  }}
                >
                  <ListItemText
                    primary="거절"
                    sx={{
                      textAlign: "center",
                      color: `${
                        message.contract.status === "REFUSED"
                          ? "white.main"
                          : "black"
                      }`,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          );
        })}
      </List>
      <Container
        sx={{
          wmessageIdth: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          position: "fixed",
          bottom: "0",
          px: "8px",
          py: "16px",
          backgroundColor: "white.main",
        }}
      >
        <AddSchedule reserveDonation={(date) => reserveDonation(date)} />
        <Input
          type="message"
          sx={{
            flexGrow: "1",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={(e) => {
            if (e.code !== "Enter") return;
            setText("");
            sendMessage(text);
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
  reserveDonation: PropTypes.func,
  contract: PropTypes.func,
};

export default MessageDetail;
