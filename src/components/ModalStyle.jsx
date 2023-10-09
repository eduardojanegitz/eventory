import { Box, Modal, Typography, useTheme } from "@mui/material";
import React from "react";

const ModalStyle = ({ children, maxHeight, open, onClose }) => {
  const theme = useTheme();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    width: "auto",
    maxHeight: maxHeight || "none",
    overflowY: maxHeight ? "auto" : "visible",
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
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalStyle;
