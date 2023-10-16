import React from "react";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = ({ value, onChange }) => {
  return (
    // <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          {/* <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport /> */}
        </FlexBetween>
        <TextField
            type="text"
            label="Pesquisar..."
            color="secondary"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {/* <button onClick={onSearch}>Pesquisar</button> */}
      </FlexBetween>
    // </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;