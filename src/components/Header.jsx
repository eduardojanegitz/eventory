import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle, date }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={theme.palette.secondary[300]}
      >
        {subtitle}
      </Typography>
      <Typography
        variant="h5"
        color={theme.palette.secondary[300]}
      >
        {date}
      </Typography>
    </Box>
  );
};

export default Header;
