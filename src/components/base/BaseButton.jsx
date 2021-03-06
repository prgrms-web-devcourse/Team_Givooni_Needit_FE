import { Button } from "@mui/material";
import PropTypes from "prop-types";
import theme from "@/styles/theme";

const BaseButton = ({
  text = "button",
  typography = "subtitle1",
  width = 150,
  height = 50,
  btnType,
  tag,
  fontSize,
  fontWeight,
  ...props
}) => {
  const pallete = theme.palette;
  let color = "#ffffff";
  let backgroundColor = "primary";
  let border = null;

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

    case "gray":
      backgroundColor = "gray";
      border = null;
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

    case "white":
      color = pallete.primary.main;
      backgroundColor = "white";
      border = pallete.primary.main;
      break;

    case "gray_dark":
      backgroundColor = pallete.gray.dark;
      break;
  }

  const style = {
    width: width,
    minWidth: width,
    height: height,
    typography: typography,
    color: color,
    border: `solid 1px ${border}`,
    borderRadius: height,
    fontSize: fontSize,
    fontWeight: fontWeight,
    whiteSpace: "nowrap",
  };

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
          {...props}
        >
          {text}
        </Button>
      ) : (
        <Button
          variant="contained"
          color={backgroundColor}
          disableElevation
          sx={style}
          {...props}
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
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontSize: PropTypes.number,
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  btnType: PropTypes.string,
  tag: PropTypes.string,
};

export default BaseButton;
