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
  const token = localStorage.getItem("needit_access_token");
  const base64 = token.split(".")[1];
  const payLoad = Buffer.from(base64, "base64");
  const result = JSON.parse(payLoad);
  const [text, setText] = useState("");
  const me = result.auth.split("_")[1].toLowerCase();
  return (
    <>
      <List>
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
                  boxShadow: 2,
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
                  onClick={(e) => {
                    contract(message.contract.contractId, "ACCEPTED");
                    e.preventDefault();
                  }}
                  sx={{
                    backgroundColor: `${
                      message.contract.contractStatus === "ACCEPTED"
                        ? "primary.main"
                        : "white.main"
                    }`,
                    marginRight: "8px",
                    borderRadius: "8px",
                    boxShadow: 2,
                  }}
                >
                  <ListItemText
                    primary="수락"
                    sx={{
                      textAlign: "center",
                      color: `${
                        message.contract.contractStatus === "ACCEPTED"
                          ? "white.main"
                          : "black"
                      }`,
                    }}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={(e) => {
                    contract(message.contract.contractId, "REFUSED");
                    e.preventDefault();
                  }}
                  sx={{
                    backgroundColor: `${
                      message.contract.contractStatus === "REFUSED"
                        ? "primary.main"
                        : "white.main"
                    }`,
                    borderRadius: "8px",
                    boxShadow: 2,
                  }}
                >
                  <ListItemText
                    primary="거절"
                    sx={{
                      textAlign: "center",
                      color: `${
                        message.contract.contractStatus === "REFUSED"
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
      <div
        style={{
          height: "50px",
        }}
      ></div>
      <Container
        sx={{
          width: "100%",
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
          onClick={() => {
            setText("");
            sendMessage(text);
          }}
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
