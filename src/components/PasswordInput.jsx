import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import theme from "@/styles/theme";

const PasswordInput = ({ ...props }) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <TextField
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      size="small"
      sx={{
        backgroundColor: theme.palette.gray.light,
        width: "20rem",
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={(e) => {
              e.preventDefault();
              setshowPassword(!showPassword);
            }}
            {...props}
          >
            <div style={{ color: theme.palette.primary.main }}>Show</div>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
