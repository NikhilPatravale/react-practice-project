import { Box, IconButton, Typography } from "@mui/material";
import type { ReactElement } from "react";

type ModalProps = {
  title?: string,
  children?: ReactElement,
  open: boolean,
  onClose: () => void
}

export default function Modal(props: ModalProps) {
  const { title, children, open, onClose } = props;

  if (!open) return;

  return <Box sx={{
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 50%)',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <Box sx={{
      backgroundColor: 'white',
      height: 'auto',
      width: '20rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '3rem',
      padding: '1rem'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton
          type="button"
          sx={{
            border: '1px solid',
            borderRadius: '50%',
            height: '30px',
            width: '30px',
            textAlign: 'center',
            fontSize: '1rem'
          }}
          onClick={onClose}
        >
          x
        </IconButton>
      </Box>
      <Box sx={{ width: '100%' }}>{children}</Box>
    </Box>
  </Box>
}