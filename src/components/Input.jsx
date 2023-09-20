import { InputBase, useTheme } from "@mui/material";
import React from "react";

const Input = ({ type, placeholder, value, onChange, onBlur, readOnly }) => {
  const theme = useTheme();
  return (
    <InputBase
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={readOnly}
      required
      sx={{
        border: ` 2px solid ${theme.palette.primary[100]}`,
        borderRadius: "20px",
        padding: "7px",
        boxShadow: `4.5px 2.5px ${theme.palette.primary[100]}`,
        width: "30rem",
        marginBottom: "15px"
      }}
    />
  );
};

export default Input;
