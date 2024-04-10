import useAppState from '../hooks/estado';
import { apiApp } from '../../api/apiUrl';

export const iniciarSesion = async (username, password) => {
  try {
    const response = await apiApp.post('/usuario/login', { username, password });

    if (response.data.success) { 
      const { token, usuario, rol,id } = response.data.data;
      useAppState.getState().setCredenciales(token, usuario, rol, id);
      return response.data.success; 
    } 
  } catch (error) {
    // console.error(`Error al intentar iniciar sesión: ${error.message}`);
    return   console.error("Error al iniciar sesion"), response.success 
  }
};
