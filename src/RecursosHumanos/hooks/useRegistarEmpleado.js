import axios from 'axios';
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
