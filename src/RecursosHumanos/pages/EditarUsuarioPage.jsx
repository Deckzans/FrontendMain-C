import { useEffect, useState } from "react"
import { cargarUsuario, editarUsuario } from "../hooks/useTraerUsuarios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { InputField, SelectField } from "../components/formularios"
import { Box, Container, Grid, Typography, Button } from "@mui/material"
import { useForm } from "react-hook-form"
import { roles } from "../helpers"


export const EditarUsuarioPage = () => {
    const { handleSubmit, reset, control } = useForm();
    const { cl } = useParams();
    const [Datos, setDatos] = useState({});
    const [Mensaje, setMensaje] = useState();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        cargarUsuario(cl, setDatos)
    }, [cl]);

    useEffect(() => {
        if (Datos) {

            reset({
                ...Datos,

            });
        }
    }, [Datos, reset]);

    const onSubmit = async (data) => {
        try {
            const response = await editarUsuario(cl,data);
            if(response.success){
                console.log('editado exitosamente')
            }
        }
        catch (error) {
        
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mb: 5 }} >
            <Box textAlign="center" mt={5}>
                <Typography variant="h5" gutterBottom>
                    Editar usuario
                </Typography>
            </Box>
            <Box mt={5} mx="auto" maxWidth="md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <InputField name="nombre" label="nombre" control={control} />
                        <InputField name="area" label="area" control={control} />
                        <InputField name="usuario" label="usuario" control={control} />
                        <SelectField
                            name="rol"
                            label="rol"
                            control={control}
                            rules={{ required: 'este campo es requerido', }}
                            inf="¿Que tipo de usuario es"
                            options={roles}
                        />
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
        </Container>
    )
}
