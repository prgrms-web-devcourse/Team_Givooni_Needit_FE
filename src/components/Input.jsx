import theme from "@/styles/theme";
import { IconButton, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const types = {
  Text: "text",
  Message: "message",
  SearchSmall: "searchSmall",
  SearchFull: "searchFull",
  SignUp: "signUp",
  Phone: "Phone",
};

const palette = theme.palette;
let color = "#000000";
let backgroundColor = "primary";
let border = null;

const Input = ({
  placeholder,
  type = "text",
  width = "20rem",
  height,
  ...props
}) => {
  switch (type) {
    case "text":
      color = palette.grey;
      backgroundColor = "";
      break;

    case "message":
      color = palette.grey;
      backgroundColor = "";
      width = "15rem";
      placeholder = "메세지를 입력해주세요!";
      break;

    case "searchSmall":
      color = palette.grey;
      backgroundColor = "";
      width = "7rem";
      break;

    case "searchFull":
      color = palette.primary;
      backgroundColor = "";
      width = "15rem";
      break;

    case "Phone":
      color = palette.primary;
      backgroundColor = "";
      width = "4.3rem";
      break;
  }

  return (
    <>
      <TextField
        type={types[type]}
        placeholder={
          placeholder
            ? placeholder
            : type === "searchSmall" || type === "searchFull"
            ? "Search"
            : type.toUpperCase()
        }
        size="small"
        color="primary"
        sx={{
          width: width,
          height: height,
          color: color,
          backgroundColor: backgroundColor,
          border: border,
        }}
        InputProps={
          type === "searchSmall" || type === "searchFull"
            ? {
                startAdornment: (
                  <InputAdornment
                    sx={{
                      width: "1.7rem",
                      position: "relative",
                      right: ".6rem",
                    }}
                  >
                    <IconButton>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
        {...props}
      />
    </>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Input;
