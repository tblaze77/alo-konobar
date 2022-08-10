import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';

export default function SnackBar({ message }) {
  const [open, setOpen] = useState(true);

  const handleClose = e => {
    setOpen(false);
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        action={action}
        className="snack-bar"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          width: 400,
          color: 'secondary',
          '& .MuiSnackbarContent-root': 'green',
        }}
      >
        <SnackbarContent message={message} />
      </Snackbar>
    </div>
  );
}
