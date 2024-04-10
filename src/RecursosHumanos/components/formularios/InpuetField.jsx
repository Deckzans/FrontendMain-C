import { Controller } from 'react-hook-form';
import { TextField, Grid, Typography } from '@mui/material';

export const InputField = ({ name, label, control, defaultValue = '', type = 'text', variant = "outlined", disabled = false, rules }) => (
  <Grid item xs={12} md={3}>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field, fieldState }) => (
        <>
          <TextField
            {...field}
            type={type}
            label={label}
            variant={variant}
            inputProps={{ min: 0 }}
            fullWidth
          />
          {rules && fieldState?.invalid && (
            <Typography variant="caption" color="error">
              {fieldState?.error?.message}
            </Typography>
          )}
        </>
      )}
      rules={rules}
    />
  </Grid>
);
