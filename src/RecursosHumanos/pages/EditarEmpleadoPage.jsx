import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import useAppState from "../../auth/hooks/estado"
import { commonValidationRules, commonValidationRulesNumber } from "../helpers/rules"
import { escolaridad, departamentos, estadoCivil, options } from '../helpers'
import { cambiarArchivoImagen, traerEmpleado } from "../hooks/useEmpleadoEditar"
//importanciones sin funcionamiento
import { Alert, Box, Button, Container, Grid, Snackbar, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { InputField } from "../components/formularios/InpuetField"
import { SelectField } from "../components/formularios/SelectField"
import Selectidfield from "../components/formularios/Selectidfield"
import { editarEmpleado } from "../hooks/useEditarEmpleado"
import { FileField } from "../components/formularios"


export const EditarEmpleadoPage = () => {

  const { usuario, id } = useAppState();
  const { control, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false);
  const { cl } = useParams();
  const [Datos, setDatos] = useState({})
  const { aMaterno, aPaterno, areaId, cargo, escolaridadId, estadocivilid, llave, nombre, observaciones, regimen, status, sueldoBruto, sueldoNeto } = Datos;
  const navigate = useNavigate();
  const [modificarArchivo, setModificarArchivo] = useState(false);

  useEffect(() => {
    const cargarDatosEmpleado = async () => {
      try {
        const response = await traerEmpleado(cl);
        const { success, mensaje, data } = response;
        // console.log(data)
        if (response && success) {
          setDatos(data);
        }
      } catch (error) {
        console.error(`Error al intentar cargar un empleado: ${error.message}`);
      }
    };

    cargarDatosEmpleado();
  }, [cl]);

  useEffect(() => {
    // Actualizar los campos después de que Datos se haya actualizado
    reset(Datos);
  }, [Datos, reset]);

  const handleSnackbarClose = () => {
    // console.log('lo hiciste bien haself wolf')
    setOpen(false);
    navigate('/home'); // Redirigir al usuario a la página de inicio de sesión
  };


  const onSubmit = async (data) => {

    const empleadoData = {
      aPaterno: data.aPaterno,
      aMaterno: data.aMaterno,
      nombre: data.nombre,
      regimen: data.regimen,
      observaciones: data.observaciones,
      usuarioId: id,
      cargo: data.cargo,
      sueldoBruto: parseFloat(data.sueldoBruto),
      sueldoNeto: parseFloat(data.sueldoNeto),
      llave: (data.llave),
      status: data.status,
      areaId: parseInt(data.areaId, 10),
      escolaridadId: parseInt(data.escolaridadId, 10),
      estadocivilid: parseInt(data.estadocivilid, 10),
      ...(modificarArchivo && { imagenEmpleado: data.imagenEmpleado[0].name })
    };
    // console.log(empleadoData)
    if (modificarArchivo) {
      // console.log('enviando')
      const formData = new FormData();
      formData.append('nuevoArchivo', data.imagenEmpleado[0]);
      try {
        const response = await cambiarArchivoImagen(formData);
        console.log(response)
        // Verificar si la llamada a editarDiaConArchivo fue exitosa
        if (response.status === 200) {
          try {
            const responseDatos = await editarEmpleado(cl, empleadoData);
            console.log(responseDatos)
            if (responseDatos) {
              setOpen(true)
            }
          } catch (error) {
            // Manejar errores de editarDia
          }
        }
      } catch (error) {
        // Manejar errores de editarDiaConArchivo
      }
    } else
      try {
        await editarEmpleado(cl, empleadoData);
        setOpen(true); // Mostrar Snackbar de éxito
      } catch (error) {
        if (error.message === 'Error al ingresar empleado') {
          setOpenError(true); // Mostrar Snackbar de error (usuario duplicado)
        } else {
          console.error('Error al registrar usuario:', error);
        }
      }
  }


  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box textAlign="center" mt={2}>
        <Typography variant="h5" gutterBottom>
          Datos del empleado
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Grid container spacing={2} sx={{ mt: 2 }}>

          <InputField name="aPaterno" label="Apellido Paterno" rules={commonValidationRules} control={control} />
          <InputField name="aMaterno" label="Apellido Materno" rules={commonValidationRules} control={control} />
          <InputField name="nombre" label="Nombre" rules={commonValidationRules} control={control} />
          <InputField name="regimen" label="regimen" rules={commonValidationRules} control={control} />
          <InputField name="observaciones" label="observaciones" rules={commonValidationRules} control={control} />
          <InputField name="usuario" disabled={true} label="usuario" defaultValue={usuario} control={control} />
          <InputField name="cargo" label="cargo" rules={commonValidationRules} control={control} />
          <InputField name="sueldoBruto" label="suledo bruto" control={control} rules={commonValidationRulesNumber} type='number' />
          <InputField name="sueldoNeto" label="suledo neto" control={control} rules={commonValidationRulesNumber} type='number' />
          <InputField name="llave" label="llave" control={control} rules={commonValidationRules} />
          <SelectField
            name="status"
            label="status"
            control={control}
            rules={{ required: 'este campo es requerido', }}
            inf="¿El empleado esta activo?"
            options={[
              { value: 'activo', label: 'activo' },
              { value: 'baja', label: 'inactivo' },
            ]}
          />
          <Selectidfield
            name="areaId"
            label="Departamento"
            control={control}
            inf="Selecciona el departamento"
            rules={{ required: 'este campo es requerido', }}
            options={departamentos}
          />
          <SelectField
            name="escolaridadId"
            label="escolaridad"
            control={control}
            rules={{ required: 'este campo es requerido', }}
            inf="¿Que grado de estudios tiene?"
            options={escolaridad}
          />
          <SelectField
            name="estadocivilid"
            label="estado civil"
            control={control}
            rules={{ required: 'este campo es requerido', }}
            inf="¿Cual es el estado civil?"
            options={estadoCivil}
          />
          {modificarArchivo && (
            <FileField
              name="imagenEmpleado"
              label="Subir archivo"
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
                    if (extensionArchivo !== 'jpg' && extensionArchivo !== 'png') {
                      return 'Formato de archivo no válido. Solo se permite formato JPG o PNG.';
                    }
                    return true; // La validación es exitosa
                  },
                },
              }}
              control={control}
              style={!modificarArchivo ? { display: 'none' } : {}}
            />
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
          <Link to="/home">
            <Button type="button" variant="contained" color="secondary">
              Cancelar y regresar
            </Button>
          </Link>

        </Box>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
        >
          Empleado creado correctamente
        </Alert>
      </Snackbar>
    </Container>
  )
}
