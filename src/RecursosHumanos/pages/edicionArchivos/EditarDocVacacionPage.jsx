 import { useEffect, useState } from "react"
import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { DateField, FileField, InputField } from "../../components/formularios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { cambiarArchivoVacacion, editarVacacion } from "../../hooks"
import { cargarDocVacacionEmpleado } from "../../helpers/helperDocsEmpleado/traerVacaciones"
import { commonValidationRules } from "../../helpers"
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado"

export const EditarDocVacacionPage = () => {
    const { handleSubmit, reset, control } = useForm();
    const { cl } = useParams();
    const [Datos, setDatos] = useState({});
    const [Vacacion, setVacacion] = useState({});
    const [Mensaje, setMensaje] = useState();
    const [open, setOpen] = useState(false);
    const [datosCargados, setDatosCargados] = useState(false);
    const [modificarArchivo, setModificarArchivo] = useState(false);
    const navigate = useNavigate();

    const handleSnackbarClose = () => {
        setOpen(false); 
        navigate(`/home/vacaciones/${Datos.id}`)
      };

    useEffect(() => {
        cargarDocVacacionEmpleado(cl, setDatos, setVacacion).then(() => {
            setDatosCargados(true); // Establecer como true una vez que los datos se carguen
        });
    }, [cl]);
    console.log(Vacacion)

    useEffect(() => {
        if (Vacacion && Datos) {
            const fechaInicio = new Date(Vacacion.fechaInicio);
            fechaInicio.setDate(fechaInicio.getDate() + 1);
            const fechaFormateada = `${fechaInicio.getFullYear()}-${String(fechaInicio.getMonth() + 1).padStart(2, '0')}-${String(fechaInicio.getDate()).padStart(2, '0')}`;

            const fechaTermino = new Date(Vacacion.fechaTermino);
            fechaTermino.setDate(fechaTermino.getDate() + 1);
            const fechaFormateada2 = `${fechaTermino.getFullYear()}-${String(fechaTermino.getMonth() + 1).padStart(2, '0')}-${String(fechaTermino.getDate()).padStart(2, '0')}`;

            const integracion = new Date(Vacacion.integracion);
            integracion.setDate(integracion.getDate() + 1);
            const fechaFormateada3 = `${integracion.getFullYear()}-${String(integracion.getMonth() + 1).padStart(2, '0')}-${String(integracion.getDate()).padStart(2, '0')}`;

            reset({
                ...Vacacion,
                fechaInicio: fechaFormateada,
                fechaTermino: fechaFormateada2,
                integracion: fechaFormateada3,
                empleado: `${Datos.nombre} ${Datos.aPaterno} ${Datos.aMaterno}`
            });
        }
    }, [Datos, reset, Vacacion]);

    const onSubmit = async (data) => {
        const nuevosDatos = {
            periodo: data.periodo,
            year: data.year,
            fechaInicio: `${data.fechaInicio}T00:00:00.000Z`,
            fechaTermino: `${data.fechaTermino}T00:00:00.000Z`,
            integracion: `${data.integracion}T00:00:00.000Z`,
            ...(modificarArchivo && { nombreImagen: data.nombreImagen[0].name })
        };

        if (modificarArchivo) {
            console.log('enviando')
            const formData = new FormData();
            formData.append('nuevoArchivo', data.nombreImagen[0]);
            try {
                const response = await cambiarArchivoVacacion(formData);
                console.log(response)
                // Verificar si la llamada a editarDiaConArchivo fue exitosa
                if (response.status === 200) {
                    try {
                        const responseEditarDia = await editarVacacion(cl, nuevosDatos);
                        if(responseEditarDia){
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
                const responseEditarDia = await editarVacacion(cl, nuevosDatos);
                if(responseEditarDia){
                    setMensaje("Vacacion modificada Correctamente");
                    setOpen(true)
                }
            } catch (error) {
                // Manejar errores de editarDia
            }
        }
    }


    // Solo renderizar el componente si los datos están cargados
    if (!datosCargados) {
        return <div>Cargando...</div>;
    }

    return (
        <Container>
            <Box textAlign="center" mt={5}>
                <Typography variant="h5" gutterBottom>
                    Editar Vacacion {cl}
                </Typography>
            </Box>
            <Box mx="auto" maxWidth="md"  >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <InputField name="periodo" label="periodo" rules={commonValidationRules} control={control} />
                        <InputField name="year" label="Año" rules={commonValidationRules} control={control} />
                        <InputField name="empleado" disabled={true} label="" control={control} />
                        <DateField name="fechaInicio" label="Fecha de Inicio" control={control} rules={{ required: 'este campo es requerido', }} />
                        <DateField name="fechaTermino" label="Fecha de termino" control={control} rules={{ required: 'este campo es requerido', }} />
                        <DateField name="integracion" label="Fecha de integracion" control={control} rules={{ required: 'este campo es requerido', }} />
                        {modificarArchivo && (
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
                        <Link to={`/home/vacaciones/${Datos.id}`}>
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
