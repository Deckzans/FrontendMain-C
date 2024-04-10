import axios from 'axios';
import { apiApp } from '../../api/apiUrl';
export const eliminarEmpleado = async (id) => {

    const data = { 
        status: 'baja'
    }

  try {
    const response = await apiApp.put(`/empleado/editar/${id}`, data);

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
