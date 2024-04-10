// verificarToken.js
import { apiApp } from "../../api/apiUrl";


const verificarToken = async (token, navigate) => {
  try {
    // Hacer la solicitud al backend para verificar el token
    const response = await apiApp.post('/usuario/verificar-token', {
      token,
    });

    if (response.data.success) {
      return response.data.success
      console.log('Token válido');
    } else {
      // Token no válido, redirigir al login
      console.log('Token no válido');
      navigate('/');
    }
  } catch (error) {
    // Manejar errores de la solicitud
    console.error('Error al verificar el token:', error);
    // Redirigir al login en caso de un error
    navigate('/');
  }
};

export default verificarToken;
