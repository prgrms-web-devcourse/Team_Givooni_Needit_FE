import React from "react";
import PropTypes from "prop-types";
import { Box, useMediaQuery } from "@mui/material";

const wrapStyle = {
  maxWidth: "540px",
  mx: "auto",
  px: "20px",
};

function MediaQueryStyle({ children }) {
  const minWidth = useMediaQuery("(min-width:540px)");

  return minWidth ? <Box sx={wrapStyle}>{children}</Box> : children;
}

MediaQueryStyle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MediaQueryStyle;
