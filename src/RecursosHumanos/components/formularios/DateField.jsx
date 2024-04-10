import { Controller } from 'react-hook-form';
import { TextField, Grid, Typography } from '@mui/material';

export const DateField = ({ name, label, control, defaultValue = '', rules }) => (
  <Grid item xs={12} md={3}>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <>
          <TextField
            {...field}
            type="date"
            label={label}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          {rules && fieldState?.invalid && (
            <Typography variant="caption" color="error">
              {fieldState?.error?.message}
            </Typography>
          )}
        </>
      )}
      rules={rules} // Asegúrate de pasar las reglas directamente al Controller
    />
  </Grid>
);
