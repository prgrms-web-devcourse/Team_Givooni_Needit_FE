import { Button } from "@mui/material";
import PropTypes from "prop-types";
import theme from "@/styles/theme";

const BaseButton = ({
  text = "button",
  typography = "subtitle1",
  width = 150,
  height = 50,
  btnType,
  func,
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

    case "gray_dark":
      backgroundColor = "gray_dark";
      border = null;
      break;
  }

  return (
    <>
      <Button
        variant="contained"
        color={backgroundColor}
        disableElevation
        sx={{
          width: width,
          height: height,
          typography: typography,
          color: color,
          border: `solid 1px ${border}`,
          borderRadius: height,
        }}
        onClick={func}
      >
        {text}
      </Button>
    </>
  );
};

BaseButton.propTypes = {
  text: PropTypes.string,
  typography: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  btnType: PropTypes.string,
  func: PropTypes.func,
};

export default BaseButton;
