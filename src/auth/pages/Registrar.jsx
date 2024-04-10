import Container  from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FormRegistrar,ImgIngresar} from "../components";
import { registro } from "../styles/registro";

export const Regristar = () => {
  return (
    <Container component="main" maxWidth="md" sx={registro.container}>

      <Grid container spacing={2} >
        <Grid  xs={12} md={6}>
          <FormRegistrar />
        </Grid>

        <Grid xs={12} md={6}>
         <ImgIngresar/>
        </Grid>
      </Grid>
    </Container>
  );
};