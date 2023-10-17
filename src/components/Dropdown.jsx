import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTheme } from "@emotion/react";

const Dropdown = ({ children, value, onChange, label, id }) => {
  const theme = useTheme();

  return (
    <FormControl fullWidth>
      <InputLabel color="secondary" id={id}>
        {label}
      </InputLabel>
      <Select
        required
        label={label}
        value={value}
        onChange={onChange}
        id={id}
        color="secondary"
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
