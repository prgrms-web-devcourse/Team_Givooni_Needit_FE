import { Button } from "@mui/material";
import PropTypes from "prop-types";
import theme from "@/styles/theme";

const BaseButton = ({
  text = "button",
  typography = "subtitle1",
  width = 150,
  height = 50,
  btnType,
  tag = "",
}) => {
  const pallete = theme.palette;
  let color = "#ffffff";
  let backgroundColor = "primary";
  let border = null;

  const style = {
    width: width,
    height: height,
    typography: typography,
    color: color,
    border: `solid 1px ${border}`,
    borderRadius: height,
  };

  switch (btnType) {
    case "white":
      color = pallete.primary.main;
      backgroundColor = "white";
      border = pallete.primary.main;
      break;

    case "transparent":
      color = pallete.primary.main;
      backgroundColor = "transparent";
      border = pallete.primary.main;
      break;

    case "gray_dark":
      backgroundColor = "gray_dark";
      border = null;
      break;
  }

  switch (tag) {
    case "primary":
      backgroundColor = pallete.primary.main;
      break;

    case "gray_dark":
      backgroundColor = pallete.gray.dark;
      break;
  }

  return (
    <>
      {tag ? (
        <Button
          sx={style}
          disabled
          style={{
            color: color,
            backgroundColor: backgroundColor,
          }}
        >
          {text}
        </Button>
      ) : (
        <Button
          variant="contained"
          color={backgroundColor}
          disableElevation
          sx={style}
        >
          {text}
        </Button>
      )}
    </>
  );
};

BaseButton.propTypes = {
  text: PropTypes.string,
  typography: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  btnType: PropTypes.string,
  tag: PropTypes.string,
};

export default BaseButton;
