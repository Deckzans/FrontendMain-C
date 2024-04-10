import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import useAppState from "../../auth/hooks/estado"
import { registarEmpleado } from "../hooks/useRegistarEmpleado"
import { commonValidationRules,commonValidationRulesCantidades } from "../helpers/rules"
import { escolaridad, departamentos, estadoCivil, options } from '../helpers'
import { Alert, Box, Button, Container, Grid, Snackbar, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { InputField } from "../components/formularios/InpuetField"
import { SelectField } from "../components/formularios/SelectField"
import { DateField } from "../components/formularios/DateField"
import { FileField } from "../components/formularios/FileField"
import Selectidfield from "../components/formularios/Selectidfield"

export const AgregarEmpleadoPage = () => {

  const { usuario, id } = useAppState();
  const { register, control, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false);
  const extensionesPermitidas = ["jpg", "jpeg", "png"];
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpen(false);
    navigate('/home'); // Redirigir al usuario a la página de inicio de sesión
  };

  const onSubmit = async (data) => {
    console.log('hola')
    const archivoSeleccionado = data.imagenEmpleado[0];


    if (!archivoSeleccionado) {
      console.log("sin archivos")
      return;
    }

    const extensionArchivo = archivoSeleccionado.name.split(".").pop().toLowerCase();

    // Validar la extensión del archivo
    if (!extensionesPermitidas.includes(extensionArchivo)) {
      console.log("no incluye archivo correcto")
      return;
    }

    const formData = new FormData();
    formData.append('aPaterno', data.aPaterno)
    formData.append('aMaterno', data.aMaterno)
    formData.append('nombre', data.nombre)
    formData.append('regimen', data.regimen)
    formData.append('observaciones', data.observaciones)
    formData.append('usuarioId', id)
    formData.append('cargo', data.cargo)
    formData.append('status', data.status)
    formData.append('sexo', data.sexo)
    formData.append('sueldoBruto', parseFloat(data.sueldoBruto))
    formData.append('sueldoNeto', parseFloat(data.sueldoNeto))
    formData.append('fechaNacimiento', `${data.fechaNacimiento}T00:00:00.000Z`)
    formData.append('fechaIngreso', `${data.fechaIngreso}T00:00:00.000Z`)
    formData.append('llave', (data.llave))
    formData.append('imagenEmpleado', data.imagenEmpleado[0].name)
    formData.append('escolaridadId', parseInt(data.escolaridadId, 10))
    formData.append('estadocivilid', parseInt(data.estadocivilid, 10))
    formData.append('areaId', parseInt(data.areaId, 10))
    formData.append('imagenEmpleado2', data.imagenEmpleado[0])
    // console.log(formData)

    try {
      await registarEmpleado(formData); 
      if( registarEmpleado){ 
        setOpen(true);
      }
      // Mostrar Snackbar de éxito
    } catch (error) {
      if (error.message === 'Error al ingresar empleado') {
        // setOpenError(true); // Mostrar Snackbar de error (usuario duplicado)
      } else {
        console.error('Error al registrar usuario:', error);
      }
    }

    // console.log( data.imagenEmpleado[0])
    // console.log(formData)
  }

  const handleReset = () => {
    reset();
  };

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
          <InputField name="sueldoBruto" label="sueldo bruto" control={control} rules={commonValidationRulesCantidades} type='number' />
          <InputField name="sueldoNeto" label="suledo neto" control={control} rules={commonValidationRulesCantidades} type='number' />
          <InputField name="llave" label="llave" control={control} rules={{ required: 'Este campo es requerido' }} />
          <DateField name="fechaNacimiento" label="Fecha de Nacimiento" control={control} rules={{ required: 'este campo es requerido', }} />
          <DateField name="fechaIngreso" label="Fecha de ingreso" control={control} rules={{ required: 'Este campo es requerido' }} />
          <SelectField
            name="sexo"
            label="sexo"
            inf="Selecciona el genero de la persona"
            control={control}
            options={options}
            rules={{ required: 'este campo es requerido', }}
          />
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
          <FileField name="imagenEmpleado" label="Subir archvio" rules={{
            required: 'Este campo es requerido',
            validate: {
              customValidation: value => {
                const archivoSeleccionado = value[0];

                if (!archivoSeleccionado) {
                  return 'Por favor, selecciona un archivo.';
                }

                const extensionArchivo = archivoSeleccionado.name.split(".").pop().toLowerCase();

                // Validar la extensión del archivo
                if (!extensionesPermitidas.includes(extensionArchivo)) {
                  return 'Formato de archivo no válido. Solo se permiten archivos JPG, JPEG, o PNG.';
                }

                return true; // La validación es exitosa
              },
            },
          }} control={control} />

          {/* <input type="file" name="imagenEmpleado" onChange={(e) => setFile(e.target.files[0])} {...register('imagenEmpleado')} /> */}
        </Grid>
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
            Enviar
          </Button>
          <Button type="button" onClick={handleReset} sx={{ mr: 2 }} variant="contained" color="secondary">
            Resetear
          </Button>
          <Link to="/home">
            <Button type="button" variant="contained" color="secondary">
              Regresar
            </Button>
          </Link>

        </Box>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={1000}
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
