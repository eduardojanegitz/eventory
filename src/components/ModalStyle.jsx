import { Box, Modal, Typography, useTheme } from "@mui/material";
import React from "react";
import Input from "./Input";

const ModalStyle = ({children}) => {
    const theme = useTheme();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "37.5rem",
    bgcolor: theme.palette.background.default,
    borderRadius: "35px",
    boxShadow: 24,
    padding: "2rem",
  };
  return (
    
    <Box sx={style}>
     {children}
    </Box>

  );
};

export default ModalStyle;
