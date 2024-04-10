import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { DateField, FileField, InputField } from "../formularios";
import { useForm } from "react-hook-form";


export const FormacionForm = ({ onSubmit, Datos }) => {
    const { control, handleSubmit,reset } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
            <Grid  container spacing={2} sx={{ mt: 5 }}> 
            <InputField name="empleadoId " disabled={true} label={Datos.nombre} control={control} />
            <InputField name="observaciones" label="observaciones "control={control} />
            <DateField name="fechaCarga" label="fecha de Carga" control={control} rules={{ required: 'este campo es requerido', }} />
            <FileField name="nombreArchivo" inf="Recuerda añadir solo PDF" label="Subir archvio" rules={{
            required: 'Este campo es requerido',
            validate: {
              customValidation: value => {
                const archivoSeleccionado = value[0];

                if (!archivoSeleccionado) {
                  return 'Por favor, selecciona un archivo.';
                }

                const extensionArchivo = archivoSeleccionado.name.split(".").pop().toLowerCase();

                // Validar la extensión del archivo
                if (extensionArchivo !== 'pdf') {
                  return 'Formato de archivo no válido. Solo se permite formato PDF.';
                }

                return true; // La validación es exitosa
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
  )
}
