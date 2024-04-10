import { apiApp } from '../../api/apiUrl';

export const AgregarRequisicion = async (data) => {
  try {
    const response = await apiApp.post('/usuario/agregarRequisicion', data);
    return response.data; // Retornar la respuesta completa
  } catch (error) {
    console.error(`Error al intentar agregar un empleado : ${error.message}`);
    throw error;
  }
};
