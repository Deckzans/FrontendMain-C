import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
import { cargarDocPermisoEmpleado } from "../../helpers/helperDocsEmpleado/traerPermisoEmpleado"
import { editarPermiso, cambiarArchivoPermiso } from "../../hooks"
import { DateField, FileField, InputField } from "../../components/formularios"
import { commonValidationRules } from "../../helpers"
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado"


export const EditarDocPermisoPage = () => {
  const { handleSubmit, reset, control } = useForm();
  const { cl } = useParams();
  const [Datos, setDatos] = useState({});
  const [Permiso, setPermiso] = useState({});
  const [datosCargados, setDatosCargados] = useState(false); // Estado para verificar si los datos se han cargado
  const [modificarArchivo, setModificarArchivo] = useState(false); // Estado para indicar si se quiere modificar el archivo
  const [Mensaje, setMensaje] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    cargarDocPermisoEmpleado(cl, setDatos, setPermiso).then(() => {
      setDatosCargados(true); // Establecer como true una vez que los datos se carguen
    });
  }, [cl]);


  useEffect(() => {
    if (Permiso && Datos) {


      const fecha = new Date(Permiso.fechaPermiso);
      fecha.setDate(fecha.getDate() + 1); // Añadir un día a la fecha
      const fechaFormateada = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;

      const fechaRegreso = new Date(Permiso.fechaRegreso);
      fechaRegreso.setDate(fechaRegreso.getDate() + 1); // Añadir un día a la fecha
      const fechaFormateada2 = `${fechaRegreso.getFullYear()}-${String(fechaRegreso.getMonth() + 1).padStart(2, '0')}-${String(fechaRegreso.getDate()).padStart(2, '0')}`;

      reset({
        ...Permiso,
        fechaPermiso: fechaFormateada,
        fechaRegreso: fechaFormateada2,
        empleado: `${Datos.nombre} ${Datos.aPaterno} ${Datos.aMaterno}`
      });
    }
  }, [Datos, reset, Permiso]);

  const handleSnackbarClose = () => {
    setOpen(false); 
    navigate(`/home/permiso/${Datos.id}`)
  };

  const onSubmit = async (data) => {
    const nuevosDatos = {
      observaciones: data.observaciones,
      fechaPermiso: `${data.fechaPermiso}T00:00:00.000Z`,
      fechaRegreso: `${data.fechaRegreso}T00:00:00.000Z`,
      ...(modificarArchivo && { nombreImagen: data.nombreImagen[0].name })
    };

    if (modificarArchivo) {
      console.log('enviando')
      const formData = new FormData();
      formData.append('nuevoArchivo', data.nombreImagen[0]);
      try {
        const response = await cambiarArchivoPermiso(formData);
        console.log(response)
        // Verificar si la llamada a editarDiaConArchivo fue exitosa
        if (response.status === 200) {
          try {
            const responseEditarPermiso = await editarPermiso(cl, nuevosDatos);
            if(responseEditarPermiso){
              setMensaje("Vacacion modificada Correctamente");
              setOpen(true)
          }
          } catch (error) {
            // Manejar errores de editarDia
          }
        }
      } catch (error) {
        // Manejar errores de editarDiaConArchivo
      }
    } else {
      try {
        const responseEditarPermiso = await editarPermiso(cl, nuevosDatos);
        if(responseEditarPermiso){
          setMensaje("Vacacion modificada Correctamente");
          setOpen(true)
      }
      } catch (error) {
        // Manejar errores de editarDia
      }
    }
  }

  if (!datosCargados) {
    return <div>Cargando...</div>;
  }
  return (
    <Container maxWidth="lg" sx={{ mb: 5 }}>
      <Box textAlign="center" mt={5}>
        <Typography variant="h5" gutterBottom>
          Editar Permiso
        </Typography>
      </Box>
      <Box mt={5} mx="auto" maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <InputField name="observaciones" label="Observaciones" rules={commonValidationRules} control={control} />
            <InputField name="empleado" disabled={true} label={Datos.nombre} control={control} />
            <DateField name="fechaPermiso" label="Fecha de Inicio" control={control} rules={{ required: 'Este campo es requerido' }} />
            <DateField name="fechaRegreso" label="Fecha de Regreso" control={control} rules={{ required: 'Este campo es requerido' }} />
            {modificarArchivo && (
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
            )}

            <Grid item xs={12}>
              <label>
                <input type="checkbox" onChange={() => setModificarArchivo(!modificarArchivo)} />
                Modificar archivo
              </label>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
              Enviar
            </Button>
            <Link to={`/home/permiso/${Datos.id}`}>
              <Button type="button" variant="contained" color="secondary">
                Regresar
              </Button>
            </Link>
          </Box>
        </form>
      </Box>
      <SnackbarPersonalizado open={open} onClose={handleSnackbarClose} mensaje={Mensaje} />
    </Container>
  )
}
