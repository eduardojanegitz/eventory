import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTheme } from "@emotion/react";

const Dropdown = ({ children, value, onChange, label, id, required }) => {
  const theme = useTheme();

  return (
    <FormControl fullWidth>
      <InputLabel color="secondary" id={id}>
        {label}
      </InputLabel>
      <Select
        required={required}
        label={label}
        value={value}
        onChange={onChange}
        id={id}
        color="secondary"
        sx={{mb: "15px"}}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
