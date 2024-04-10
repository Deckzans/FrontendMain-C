import Container  from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { loginStyles } from '../styles/StylesLogin'
import { FormIngresar,ImgIngresar} from "../components";
import useAppState from "../../auth/hooks/estado";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import verificarToken from "../../layout/helpers/Verificacion";
import { traerUsuario } from "../../RecursosHumanos/hooks/useTraerUsuarios";

export const Login = () => {
  const navigate = useNavigate();
  const { token,id } = useAppState();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const success = await verificarToken(token, navigate);
        if (success) {
          const resp = await traerUsuario(id);
          console.log(resp.data.rol);
          if (resp.data.rol === "administrador") {
            navigate('/administrador');
          } else if (resp.data.rol === "requisicion") {
            navigate('home/requisicion');
          } else {
            navigate('/home');
          }
        }
      } catch (error) {
        console.error(`Error al verificar el token: ${error.message}`);
      }
    };
  

    checkToken();
  }, [token, navigate]);
// console.log(token)

  return (
    <Container component="main" maxWidth="md" sx={loginStyles.container}>

      <Grid container spacing={2} >
        <Grid  xs={12} md={6}>
          <FormIngresar />
        </Grid>

        <Grid  xs={12} md={6}  >
         <ImgIngresar/>
        </Grid>

      </Grid>

    </Container>
  );
};