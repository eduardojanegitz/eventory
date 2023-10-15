import { useTheme } from "@emotion/react";
import { InputLabel, Select } from "@mui/material";
import React from "react";

const Dropdown = ({ children, value, onChange, label, id }) => {
  const theme = useTheme();
  return (
    <Select
    sx={{
      width: "100%",
    }}
      // sx={{
      //   border: ` 2px solid ${theme.palette.primary[100]}`,
      //   borderRadius: "20px",
      //   padding: "7px",
      //   width: "100%",
      //   boxShadow: `4.5px 2.5px ${theme.palette.primary[100]}`,
      //   height: "2.9rem",
      // }}
      value={value}
      onChange={onChange}
      id={id}
      label={label}
    >
      {children}
    </Select>
  );
};

export default Dropdown;
