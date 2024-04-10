import axios from "axios";
import { apiApp } from "../../api/apiUrl";

export const obtenerEmpleados = async () => {
  try {
    const response = await apiApp.get(`/empleado/obtenerTodo`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error; // Puedes manejar el error aquí o dejar que se propague
  }
};

export const eliminarEmpleado = async (empleadoId) => {
  try {
    const response = await fetch(`http://localhost:3000/empleado/eliminar/${empleadoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Puedes incluir headers adicionales si es necesario (por ejemplo, token de autenticación)
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Empleado eliminado exitosamente", data);
    } else {
      console.error("Error al eliminar el empleado", data);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud de eliminación", error);
    throw error;
  }
};