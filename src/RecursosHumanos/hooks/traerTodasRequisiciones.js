import { apiApp } from "../../api/apiUrl";

export const obtenerTodasLasRequisiciones = async () => {
  try {
    const response = await apiApp.get(`usuario/obtenerRequisiciones`); // Ajusta la ruta según la configuración de tu API
    return response.data; // Asume que las requisiciones están en un campo "data" en la respuesta
  } catch (error) {
    console.error(error);
    throw error; // Puedes manejar el error aquí o dejar que se propague
  }
};
