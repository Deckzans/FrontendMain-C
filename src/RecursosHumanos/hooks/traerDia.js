
import { apiApp } from '../../api/apiUrl';


export const traerDia = async (id) => {
  try {
    const response = await apiApp.get(`/accion/obtenerDia/${id}`);


    if (response.data.success) {
      // La solicitud se completó con éxito
      return response.data;
    } else {
      // El servidor devolvió una respuesta, pero no fue exitosa
      throw new Error(response.data.message || 'Error en la solicitud');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Otros errores de respuesta del servidor
        throw new Error(`Error en la respuesta del servidor: ${error.response.statusText}`);
      } else {
        // Error de red o solicitud cancelada
        throw new Error(`Error de red: ${error.message}`);
      }
    } else {
      // Otros errores (no relacionados con Axios)
      throw error;
    }
  }
};