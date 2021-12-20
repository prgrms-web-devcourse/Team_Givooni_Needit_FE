import { useState } from "react";
import { ListItemButton, Typography } from "@mui/material";
import { List } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { ListItem } from "@mui/material";
import Proptypes from "prop-types";

const Notify = ({ list = [], onClick }) => {
  const [hoverId, setHoverId] = useState("");

  return (
    <>
      <List>
        {list.map((post) => (
          <ListItem key={post.resourceId}>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => {
                onClick(post);
              }}
              onMouseEnter={() => setHoverId(post)}
            >
              <List>
                <ListItemText
                  sx={{
                    color: "primary.main",
                  }}
                >
                  <Typography variant="h5">새로운 알람</Typography>
                </ListItemText>

                <ListItemText
                  sx={{
                    color: `${
                      hoverId === post.id ? "primary.main" : "gray_dark.dark"
                    }`,
                  }}
                >
                  <Typography variant="body1">{post.previewMessage}</Typography>
                </ListItemText>
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
