import React from "react";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

const GridToolbar = () => {
  return (
    <GridToolbarContainer>
      {/* <FlexBetween width="100%"> */}
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      {/* </FlexBetween> */}
    </GridToolbarContainer>
  );
};

export default GridToolbar;
