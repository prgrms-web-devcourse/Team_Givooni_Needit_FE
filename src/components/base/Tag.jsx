import { Chip } from "@mui/material";
import PropTypes from "prop-types";
import theme from "@/styles/theme";

const Tag = ({
  text = "tag",
  typography = "body1",
  width = "auto",
  height = 24,
  fontSize = 12,
  backgroundColor = theme.palette.primary.main,
}) => {
  switch (backgroundColor) {
    case "gray":
      backgroundColor = theme.palette.gray.main;
      break;

    case "gray_dark":
      backgroundColor = theme.palette.gray.dark;
      break;

    case "gray_light":
      backgroundColor = theme.palette.gray.light;
      break;
  }

  return (
    <>
      <Chip
        // color={backgroundColor}
        sx={{
          width: width,
          height: height,
          typography: typography,
          fontSize: fontSize,
          borderRadius: height,
          color: "#ffffff",
          backgroundColor: backgroundColor,
        }}
        label={text}
      />
    </>
  );
};

Tag.propTypes = {
  text: PropTypes.string,
  typography: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fontSize: PropTypes.number,
  backgroundColor: PropTypes.string,
};

export default Tag;
