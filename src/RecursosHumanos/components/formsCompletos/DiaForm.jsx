import { Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { DateField, FileField, InputField } from "../formularios";
import { commonValidationRulesNumber,commonValidationRulesCantidades } from "../../helpers";
import { Link } from "react-router-dom";

export const DiaForm = ({ onSubmit,Datos }) => {
  const { control, handleSubmit,reset } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <InputField name="empleadoId " disabled={true} label={Datos.nombre} control={control} />
        <InputField name="observaciones" label="observaciones " control={control} />
        <InputField name="fechaDiasRestantes" label="Dias Restantes" control={control} rules={commonValidationRulesNumber} type="number" />
        <InputField name="diasTotales" label="dias Totales" control={control} rules={commonValidationRulesNumber} type="number" />
        <DateField name="fechaDias" label="fechaDias" control={control} rules={{ required: 'este campo es requerido' }} />
        <FileField
          name="nombreImagen"
          inf="Recuerda añadir solo PDF"
          label="Subir archvio"
          rules={{
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
          }}
          control={control}
        />
      </Grid>
      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
          Enviar
        </Button>
        <Button type="button"  onClick={reset} sx={{ mr: 2 }} variant="contained" color="secondary">
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
