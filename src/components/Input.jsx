import { InputBase, TextField, useTheme } from "@mui/material";
import React from "react";

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  disabled,
  label,
  refInput,
  required
}) => {
  const theme = useTheme();
  return (
    <TextField
      label={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      ref={refInput}
      required={required} 
      color="info"
      sx={{
        width: "100%",
        mb: "15px",
      }}
    />
  );
};

export default Input;
