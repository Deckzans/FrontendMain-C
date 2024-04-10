import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, Grid, FormHelperText, Typography } from '@mui/material';

export const SelectField = ({ name, label, control, defaultValue = '', options, inf = 'añadir info adicional', rules }) => (
  <Grid item xs={12} md={3}>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <>
          <FormControl variant="standard" fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select {...field}>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {rules && fieldState?.invalid && (
              <Typography variant="caption" color="error">
                {fieldState?.error?.message}
              </Typography>
            )}
            <FormHelperText sx={{ color: "blue" }}>{inf}</FormHelperText>
          </FormControl>
        </>
      )}
      rules={rules} // Asegúrate de pasar las reglas directamente al Controller
    />
  </Grid>
);
