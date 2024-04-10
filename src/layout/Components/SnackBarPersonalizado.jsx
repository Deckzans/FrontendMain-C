import { Snackbar, Alert } from '@mui/material';

export const SnackbarPersonalizado = ({ open, onClose, mensaje, severity='success', time=650 }) => {
  return (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={time} onClose={onClose}>
      <Alert severity={severity} variant="filled">
        {mensaje}
      </Alert>
    </Snackbar>
  );
};