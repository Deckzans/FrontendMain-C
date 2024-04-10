// Archivo: PermisoForm.js
import { Button, Box, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { InputField, DateField, FileField } from '../formularios';
import { commonValidationRules } from '../../helpers';
import { Link } from 'react-router-dom';

export const PermisoForm = ({ onSubmit, Datos }) => {
  const { control, handleSubmit,reset } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <InputField name="observaciones" label="Observaciones" rules={commonValidationRules} control={control} />
          <InputField name="empleadoId" disabled={true} label={Datos.nombre} control={control} />
          <DateField name="fechaPermiso" label="Fecha de Inicio" control={control} rules={{ required: 'Este campo es requerido' }} />
          <DateField name="fechaRegreso" label="Fecha de termino" control={control} rules={{ required: 'Este campo es requerido' }} />
          <FileField name="nombreImagen" inf="Recuerda añadir solo PDF" label="Subir archivo" rules={{
            required: 'Este campo es requerido',
            validate: {
              customValidation: value => {
                const archivoSeleccionado = value[0];
                if (!archivoSeleccionado) {
                  return 'Por favor, selecciona un archivo.';
                }
                const extensionArchivo = archivoSeleccionado.name.split(".").pop().toLowerCase();
                if (extensionArchivo !== 'pdf') {
                  return 'Formato de archivo no válido. Solo se permite formato PDF.';
                }
                return true;
              },
            },
          }} control={control} />
        </Grid>
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
            Enviar
          </Button>
          <Button type="button" onClick={reset} sx={{ mr: 2 }} variant="contained" color="secondary">
            Resetear
          </Button>
          <Link to="/home">
            <Button type="button" variant="contained" color="secondary">
              Regresar
            </Button>
          </Link>
        </Box>
      </form>
  );
};
