import { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { DateField, FileField, InputField } from "../../components/formularios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cargarDocDiaEmpleado } from "../../helpers/helperDocsEmpleado/traerDiaEmpleado";
import { commonValidationRulesNumber } from "../../helpers";
import { editarDia,cambiarArchivoDia } from "../../hooks";
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado";

export const EditarDocDiaPage = () => {
    const { handleSubmit, reset, control } = useForm();
    const { cl } = useParams();
    const [Datos, setDatos] = useState({});
    const [DiaEconomico, setDiaEconomico] = useState({});
    const [datosCargados, setDatosCargados] = useState(false); // Estado para verificar si los datos se han cargado
    const [modificarArchivo, setModificarArchivo] = useState(false); // Estado para indicar si se quiere modificar el archivo
    const [Mensaje, setMensaje] = useState();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        cargarDocDiaEmpleado(cl, setDatos, setDiaEconomico).then(() => {
            setDatosCargados(true); // Establecer como true una vez que los datos se carguen
        });
    }, [cl]);

    useEffect(() => {
        if (DiaEconomico && Datos) {
            const fecha = new Date(DiaEconomico.fechaDias);
            fecha.setDate(fecha.getDate() + 1); // Añadir un día a la fecha
    
            const fechaFormateada = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
    
            reset({ ...DiaEconomico, 
                fechaDias: fechaFormateada,
                empleado: `${Datos.nombre} ${Datos.aPaterno} ${Datos.aMaterno}`
            });
        }
    }, [Datos, reset, DiaEconomico]);

    const handleSnackbarClose = () => {
        setOpen(false); 
        navigate(`/home/dia/${Datos.id}`)
      };

    const onSubmit = async (data) => {
        const nuevosDatos = {
            observaciones: data.observaciones,
            diasTotales: parseInt(data.diasTotales),
            fechaDiasRestantes: parseInt(data.fechaDiasRestantes),
            fechaDias: `${data.fechaDias}T00:00:00.000Z`,
            ...(modificarArchivo && { nombreImagen: data.nombreImagen[0].name })
        };

        if (modificarArchivo) {
            console.log('enviando')
            const formData = new FormData();
            formData.append('nuevoArchivo', data.nombreImagen[0]);
            try {
                const response = await cambiarArchivoDia(formData);
                console.log(response)
                // Verificar si la llamada a editarDiaConArchivo fue exitosa
                if (response.status === 200) {
                    try {
                        const responseEditarDia = await editarDia(cl, nuevosDatos);
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
                const responseEditarDia = await editarDia(cl, nuevosDatos);
                if(responseEditarDia){
                    setMensaje("Vacacion modificada Correctamente");
                    setOpen(true)
                }
            } catch (error) {
                // Manejar errores de editarDia
            }
        }
        // console.log(nuevosDatos)
    };

    // Solo renderizar el componente si los datos están cargados
    if (!datosCargados) {
        return <div>Cargando...</div>;
    }

    return (
        <Container maxWidth="lg" sx={ {mb:5} } >
            <Box textAlign="center" mt={5}>
                <Typography variant="h5" gutterBottom>
                   Editar Día económico
                </Typography>
            </Box>
            <Box mt={5} mx="auto" maxWidth="md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <InputField name="empleado" disabled={true} label="Empleado" control={control} />
                        <InputField name="observaciones" label="observaciones" control={control} />
                        <InputField name="fechaDiasRestantes" label="Días Restantes" control={control} rules={commonValidationRulesNumber} type="number" />
                        <InputField  name="diasTotales" label="Días Totales" control={control} rules={commonValidationRulesNumber} type="number" />
                        <DateField name="fechaDias" label="Fecha Días" control={control} />
                        {modificarArchivo && (
                            <FileField
                                name="nombreImagen"
                                inf="Recuerda añadir solo PDF - este campo es obligatoria"
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
                                            if (extensionArchivo !== 'pdf') {
                                                return 'Formato de archivo no válido. Solo se permite formato PDF.';
                                            }
                                            return true; // La validación es exitosa
                                        },
                                    },
                                }}
                                control={control}
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
                        <Link to={`/home/dia/${Datos.id}`}>
                            <Button type="button" variant="contained" color="secondary">
                                Regresar
                            </Button>
                        </Link>
                    </Box>
                </form>
            </Box>
            <SnackbarPersonalizado open={open} onClose={handleSnackbarClose} mensaje={Mensaje} />
        </Container>
    );
};
