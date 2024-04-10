import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { cargarDocFormacionEmpleado } from "../../helpers/helperDocsEmpleado/traerFormacionEmpleado"
import { cambiarArchivoFormacion, editarFormacion } from "../../hooks"
import { DateField, FileField, InputField } from "../../components/formularios"
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado"

export const EditarDocFormacionPage = () => {
    const { handleSubmit, reset, control } = useForm();
    const { cl } = useParams();
    const [Datos, setDatos] = useState({});
    const [Formacion, setFormacion] = useState({});
    const [datosCargados, setDatosCargados] = useState(false); // Estado para verificar si los datos se han cargado
    const [modificarArchivo, setModificarArchivo] = useState(false); // Estado para indicar si se quiere modificar el archivo
    const [Mensaje, setMensaje] = useState();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        cargarDocFormacionEmpleado(cl, setDatos, setFormacion).then(() => {
            setDatosCargados(true); // Establecer como true una vez que los datos se carguen
        });
    }, [cl]);

    useEffect(() => {
        if (Formacion && Datos) {
            const fecha = new Date(Formacion.fechaCarga);
            fecha.setDate(fecha.getDate() + 1); // Añadir un día a la fecha

            const fechaFormateada = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;

            reset({
                ...Formacion,
                fechaCarga: fechaFormateada,
                empleado: `${Datos.nombre} ${Datos.aPaterno} ${Datos.aMaterno}`
            });
        }
    }, [Datos, reset, Formacion]);

    const handleSnackbarClose = () => {
        setOpen(false); 
        navigate(`/home/formacion/${Datos.id}`)
      };

    const onSubmit = async (data) => {
        const nuevosDatos = {
            observaciones: data.observaciones,
            fechaCarga: `${data.fechaCarga}T00:00:00.000Z`,
            ...(modificarArchivo && { nombreArchivo: data.nombreArchivo[0].name })
        };

        if (modificarArchivo) {
            console.log('enviando')
            const formData = new FormData();
            formData.append('nuevoArchivo', data.nombreArchivo[0]);
            try {
                const response = await cambiarArchivoFormacion(formData);
                console.log(response)
                // Verificar si la llamada a editarDiaConArchivo fue exitosa
                if (response.status === 200) {
                    try {
                        const responseEditarFormacion = await editarFormacion(cl, nuevosDatos);
                        if(responseEditarFormacion){
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
                const responseEditarFormacion = await editarFormacion(cl, nuevosDatos);
                if(responseEditarFormacion){
                    setMensaje("Vacacion modificada Correctamente");
                    setOpen(true)
                }
            } catch (error) {
                // Manejar errores de editarDia
            }
        }
        console.log(nuevosDatos)
    };

    // Solo renderizar el componente si los datos están cargados
    if (!datosCargados) {
        return <div>Cargando...</div>;
    }
    return (
        <div>
            <Container>
                <Box textAlign="center" mt={5}>
                    <Typography variant="h5" gutterBottom>
                        Editar Formacion
                    </Typography>
                </Box>
                <Box mt={5} mx="auto" maxWidth="md">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <InputField name="empleado" disabled={true} label="empleado" control={control} />
                            <InputField name="observaciones" label="observaciones " control={control} />
                            <DateField name="fechaCarga" label="fecha de Carga" control={control} rules={{ required: 'este campo es requerido', }} />
                            {modificarArchivo && (
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
                        <Link to={`/home/formacion/${Datos.id}`}>
                            <Button type="button" variant="contained" color="secondary">
                                Regresar
                            </Button>
                        </Link>
                    </Box>
                    </form>
                </Box>
                <SnackbarPersonalizado open={open} onClose={handleSnackbarClose} mensaje={Mensaje} />
            </Container>

        </div>
    )
}
