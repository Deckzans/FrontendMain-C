
import { apiApp } from '../../api/apiUrl';


export const cambiarArchivoImagen = async (data) => { 
  try {
    const response = await apiApp.post(`/empleado/cargarNuevoArchivo/`, data);

    if (response.status === 200) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar editar el Dia : ${error.message}`);
      throw error;
  }
}

export const traerEmpleado = async (id) => {
  try {
    const response = await apiApp.get(`/empleado/obtener/${id}`);
    
    if (response.data.success) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar traer un empleado : ${error.message}`);
      return null;
    //   throw error;
    
  }
};
