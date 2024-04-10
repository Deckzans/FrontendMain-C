import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { cargarDocIncapacidadEmpleado } from "../../helpers/helperDocsEmpleado/traerIncapacidadEmpleado"
import { editarIncapacidad, cambiarArchivoIncapacidad } from "../../hooks"
import { DateField, FileField, InputField } from "../../components/formularios"
import { commonValidationRules } from "../../helpers"
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado"

export const EditarDocIncapacidadPage = () => {
    const { handleSubmit, reset, control } = useForm();
    const { cl } = useParams();
    const [Datos, setDatos] = useState({});
    const [Incapacidad, setIncapacidad] = useState({});
    const [datosCargados, setDatosCargados] = useState(false); // Estado para verificar si los datos se han cargado
    const [modificarArchivo, setModificarArchivo] = useState(false); // Estado para indicar si se quiere modificar el archivo
    const [Mensaje, setMensaje] = useState();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        cargarDocIncapacidadEmpleado(cl, setDatos, setIncapacidad).then(() => {
            setDatosCargados(true); // Establecer como true una vez que los datos se carguen
        });
    }, [cl]);
    // console.log(Incapacidad)

    useEffect(() => {
        if (Incapacidad && Datos) {
            const fecha = new Date(Incapacidad.fechaIncapacidad);
            fecha.setDate(fecha.getDate() + 1); // Añadir un día a la fecha

            const fechaFormateada = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;

            reset({
                ...Incapacidad,
                fechaIncapacidad: fechaFormateada,
                empleado: `${Datos.nombre} ${Datos.aPaterno} ${Datos.aMaterno}`
            });
        }
    }, [Datos, reset, Incapacidad]);

    const handleSnackbarClose = () => {
        setOpen(false); 
        navigate(`/home/incapacidad/${Datos.id}`)
      };

    const onSubmit = async (data) => {
        const nuevosDatos = {
            observaciones: data.observaciones,
            tipo: data.tipo,
            diasIncapacitado: parseInt(data.diasIncapacitado),
            fechaIncapacidad: `${data.fechaIncapacidad}T00:00:00.000Z`,
            ...(modificarArchivo && { nombreImagen: data.nombreImagen[0].name })
        };

        if (modificarArchivo) {
            console.log('enviando')
            const formData = new FormData();
            formData.append('nuevoArchivo', data.nombreImagen[0]);
            try {
                const response = await cambiarArchivoIncapacidad(formData);
                console.log(response)
                // Verificar si la llamada a editarDiaConArchivo fue exitosa
                if (response.status === 200) {
                    try {
                        const responseEditarIncapacidad = await editarIncapacidad(cl, nuevosDatos);
                        if(responseEditarIncapacidad){
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
                const responseEditarIncapacidad = await editarIncapacidad(cl, nuevosDatos);
                if(responseEditarIncapacidad){
                    setMensaje("Vacacion modificada Correctamente");
                    setOpen(true)
                }
            } catch (error) {
                // Manejar errores de editarDia
            }
        }
        // console.log(nuevosDatos)
    };

    if (!datosCargados) {
        return <div>Cargando...</div>;
    }

    return (
        <Container>
            <Box textAlign="center" mt={5}>
                <Typography variant="h5" gutterBottom>
                    Editar Incapacidad
                </Typography>
            </Box>
            <Box mt={5} mx="auto" maxWidth="md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} sx={{ mt: 5 }}>
                        <InputField name="observaciones" label="observaciones" rules={commonValidationRules} control={control} />
                        <InputField name="tipo" label="tipo" rules={commonValidationRules} control={control} />
                        <InputField name="empleado" disabled={true} label="" control={control} />
                        <InputField name="diasIncapacitado" label="dias Incapacitado " type='number' control={control} rules={{ required: 'este campo es requerido', }} />
                        <DateField name="fechaIncapacidad" label="fechaIncapacidad" control={control} rules={{ required: 'este campo es requerido', }} />
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
                        <Link to={`/home/incapacidad/${Datos.id}`}>
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
