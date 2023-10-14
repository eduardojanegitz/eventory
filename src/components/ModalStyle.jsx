import { Box, IconButton, Modal, Typography, useTheme } from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";

const ModalStyle = ({ children, maxHeight, open, onClose, width }) => {
  const theme = useTheme();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    width: width || "auto",
    maxHeight: maxHeight || "none",
    overflowY: maxHeight ? "auto" : "visible",
      '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#b3b0b0',
      borderRadius: '20px',
    },
    // '&::-webkit-scrollbar-track': {
    //   backgroundColor: theme.palette.background.default,
    // },
    bgcolor: theme.palette.background.default,
    borderRadius: "35px",
    boxShadow: 24,
    padding: "2rem",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 5,
            right: 20,
            color: theme.palette.secondary.main,
          }}
        >
          <CancelIcon />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalStyle;
