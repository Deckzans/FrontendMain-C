import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import useAppState from "../../auth/hooks/estado"
import { commonValidationRules, commonValidationRulesCantidades } from "../helpers/rules"
import { escolaridad, departamentos, estadoCivil, options } from '../helpers'
import { Alert, Box, Button, Container, Grid, Snackbar, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { InputField } from "../components/formularios/InpuetField"
import { SelectField } from "../components/formularios/SelectField"
import { DateField } from "../components/formularios/DateField"
import { FileField } from "../components/formularios/FileField"
import Selectidfield from "../components/formularios/Selectidfield"
import { agregarEmpleado, subirImagen } from "../hooks";

export const AgregarEmpleadoPage = () => {

  const { usuario, id } = useAppState();
  const { register, control, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false);
  const extensionesPermitidas = ["jpg", "jpeg", "png"];
  const navigate = useNavigate();
  const [modificarArchivo, setModificarArchivo] = useState(false);

  const handleSnackbarClose = () => {
    setOpen(false);
    navigate('/home'); // Redirigir al usuario a la página de inicio de sesión
  };

  const onSubmit = async (data) => {
    try {
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
            llave: data.llave,
            status: data.status,
            sexo: data.sexo,
            fechaNacimiento: `${data.fechaNacimiento}T00:00:00.000Z`,
            fechaIngreso: `${data.fechaIngreso}T00:00:00.000Z`,
            areaId: parseInt(data.areaId, 10),
            escolaridadId: parseInt(data.escolaridadId, 10),
            estadocivilid: parseInt(data.estadocivilid, 10),
            imagenEmpleado: modificarArchivo ? data.imagenEmpleado[0].name : "default.png"
        };

        // Si se selecciona modificar el archivo, subirlo antes de agregar el empleado
        if (modificarArchivo) {
            const formData = new FormData();
            formData.append('nuevoArchivo', data.imagenEmpleado[0]);
            const responseImagen = await subirImagen(formData);

            if (responseImagen.status === 200) {
                const response = await agregarEmpleado(empleadoData);
                if (response) {
                    setOpen(true); // Mostrar Snackbar de éxito
                } else {
                    console.error('Error al agregar empleado:', response.message);
                }
            } else {
                console.error('Error al subir la imagen:', responseImagen.message);
                return; // Salir de la función onSubmit si hay un error al subir la imagen
            }
        } else {
            // Bloque de llaves agregado para encapsular la parte del código dentro del else
            const response = await agregarEmpleado(empleadoData);
            if (response) {
                setOpen(true); // Mostrar Snackbar de éxito
            } else {
                console.error('Error al agregar empleado:');
            }
        }
    } catch (error) {
        console.error('Error al agregar empleado:', error);
    }
};


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
              Subir archivo
            </label>
          </Grid>
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
