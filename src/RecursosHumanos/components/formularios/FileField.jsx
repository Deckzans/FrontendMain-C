import React from 'react';
import { Controller } from 'react-hook-form';
import { Button, Box, Grid, Typography, FormHelperText } from '@mui/material';

export const FileField = ({ name, label, control, rules,inf="recuerda subir solo imagenes" }) => (
  <Grid item xs={12} md={5}>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Box mt={2}>
          <input
            type="file"
            id={name}
            style={{ display: 'none' }}
            accept="*/*"  // Agregar el atributo accept para permitir solo archivos PDF
            onChange={(e) => field.onChange(e.target.files)}
          />
          <label htmlFor={name}>
            <Button component="span" variant="contained" color="primary">
              {label}
            </Button>
          </label>
          {/* Mostrar el nombre del archivo seleccionado si existe */}
          {field.value && field.value[0] && (
            <Typography variant="body2" mt={1}>
              Archivo seleccionado: {field.value[0].name}
            </Typography>
          )}
          {/* Manejar el caso cuando no se selecciona ningún archivo */}
          {!field.value && <Typography variant="body2" mt={1}>No se ha seleccionado ningún archivo</Typography>}
          {/* Mostrar mensaje de error si el campo es inválido */}
          {rules && fieldState?.invalid && (
            <Typography variant="caption" color="error">
              {fieldState?.error?.message}
            </Typography>
          )}
          <FormHelperText sx={{ color: "blue" }}>{inf}</FormHelperText>
        </Box>
      )}
      rules={rules} // Asegúrate de pasar las reglas directamente al Controller
    />
  </Grid>
);
