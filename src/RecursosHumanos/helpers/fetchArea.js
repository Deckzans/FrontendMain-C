import axios from "axios";

export const obtenerAreas = async () => {
  try {
    const response = await axios.get("http://localhost:3000/area/obtenerTodo");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error; // Puedes manejar el error aquí o dejar que se propague
  }
};