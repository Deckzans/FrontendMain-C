
import { apiApp } from '../../api/apiUrl';

export const registarEmpleado = async (data) => {
  try {
    const response = await apiApp.post('/empleado/agregar', data);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
    if (error.response && error.response.status === 409) { 
      // Manejar el caso de usuario duplicado
      throw new Error('Usuario duplicado');
    } else {
      console.error(`Error al intentar agregar un empleado : ${error.message}`);
      throw error;
    }
  }
};


export const subirImagen = async (data) => { 
  try {
    const response = await apiApp.post(`/empleado/cargarNuevoArchivoImagen/`, data);

    if (response.status === 200) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar editar el Dia : ${error.message}`);
      throw error;
  }
}

export const agregarEmpleado = async (data) => {
  try {
    const response = await apiApp.post('/empleado/agregarEmpleado', data);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
    if (error.response && error.response.status === 409) { 
      // Manejar el caso de usuario duplicado
      throw new Error('Usuario duplicado');
    } else {
      console.error(`Error al intentar agregar un empleado : ${error.message}`);
      throw error;
    }
  }
};



