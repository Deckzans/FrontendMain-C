import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CardActionArea } from '@mui/material';
import obtenerImagen from '../helpers/ImagenEmpleado';

const EmpleadoCard = ({ empleado }) => {
  const [imagenURL, setImagenURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarImagen = async () => {
      try {
        setLoading(true);
        // Obtener la URL de la imagen del empleado usando el helper obtenerImagen
        const url = await obtenerImagen(empleado.imagenEmpleado);
        setImagenURL(url);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    cargarImagen();

    return () => {
      // Limpiar cualquier suscripción o recurso en caso de desmontar el componente
    };
  }, [empleado.imagenEmpleado]);

  return (
    <Container>
      <Card sx={{ maxWidth: 250, maxHeight: '100%' }}>
        <CardActionArea>
          {loading ? (
            <div>Cargando...</div>
          ) : error ? (
            <div>Error al cargar la imagen</div>
          ) : (
            <CardMedia
              component="img"
              height="190"
              width="250"
              image={imagenURL}
              alt="imagen empleado"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {empleado.nombre} {empleado.aPaterno} {empleado.aMaterno}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Area: {empleado.area.descripcion}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rol: {empleado.cargo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {empleado.status}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};

EmpleadoCard.propTypes = {
  empleado: PropTypes.object.isRequired,
};

export default EmpleadoCard;
