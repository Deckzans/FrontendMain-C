import { useForm } from "react-hook-form";
import { DateField, FileField, InputField } from "../formularios";
import { commonValidationRules } from "../../helpers";
import { Link } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";


export const IncapacidadForm = ({ onSubmit, Datos }) => {
    const { control, handleSubmit,reset} = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={2} sx={{ mt: 5 }}>
                <InputField name="observaciones" label="observaciones" rules={commonValidationRules} control={control} />
                <InputField name="tipo" label="tipo" rules={commonValidationRules} control={control} />
                <InputField name="empleadoId " disabled={true} label={`Empleado: ${Datos.nombre} `} control={control} />
                <InputField name="diasIncapacitado " label="diasIncapacitado " type='number' control={control} rules={{ required: 'este campo es requerido', }} />
                <DateField name="fechaIncapacidad" label="fechaIncapacidad" control={control} rules={{ required: 'este campo es requerido', }} />
                <FileField name="nombreImagen" inf="Recuerda añadir solo PDF" label="Subir archvio" rules={{
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




