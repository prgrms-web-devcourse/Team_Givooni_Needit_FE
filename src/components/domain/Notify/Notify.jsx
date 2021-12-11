import { useState } from "react";
import { ListItemButton } from "@mui/material";
import { List } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { ListItem } from "@mui/material";
import Proptypes from "prop-types";
const Notify = ({ list = [], onClick }) => {
  const [hoverId, setHoverId] = useState("");
  return (
    <>
      <List
        sx={{
          mt: "5rem",
        }}
      >
        {list.map((post) => (
          <ListItem key={post.id}>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => {
                onClick(post.id);
              }}
              onMouseEnter={() => setHoverId(post.id)}
            >
              <List>
                <ListItemText
                  primary={post.title}
                  sx={{
                    color: "primary.main",
                    typography: "h3",
                  }}
                ></ListItemText>
                <ListItemText
                  primary={post.text}
                  sx={{
                    color: `${
                      hoverId === post.id ? "primary.main" : "gray_dark.dark"
                    }`,
                    typography: "body1",
                  }}
                ></ListItemText>
              </List>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

Notify.propTypes = {
  list: Proptypes.array,
  onClick: Proptypes.func,
};
export default Notify;
