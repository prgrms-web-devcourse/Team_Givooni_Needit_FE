import { IconButton, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import theme from "@/styles/theme";

const types = {
  Text: "text",
  Message: "message",
  SearchSmall: "searchSmall",
  SearchFull: "searchFull",
  SignUp: "signUp",
  Phone: "Phone",
  Email: "Email",
  Password: "Password",
};

let color = "#000000";
let backgroundColor = theme.palette.gray.light;
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
      break;

    case "message":
      width = "15rem";
      placeholder = "메세지를 입력해주세요!";
      break;

    case "searchSmall":
      placeholder = "Search";
      width = "7rem";
      break;

    case "searchFull":
      placeholder = "Search";
      width = "90vw";
      backgroundColor = theme.palette.gray.light;
      break;

    case "Phone":
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
            : type
        }
        size="small"
        color="primary"
        sx={{
          width: width,
          height: height,
          color: color,
          backgroundColor: backgroundColor,
          border: border,
          borderRadius: ".4rem",
        }}
        InputProps={
          type === "searchSmall" || type === "searchFull"
            ? {
                style: { height: "2.1rem", fontSize: "1rem" },
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
