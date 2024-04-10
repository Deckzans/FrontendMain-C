import axios from 'axios';
import { apiApp } from '../../api/apiUrl';

export const traerUsuarios = async () => {
  try {
    const response = await apiApp.get(`/usuario/obtenerTodo`);


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



export const eliminarUsuario = async (id) => {
  try {
    const response = await apiApp.delete(`/usuario/eliminar/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Error de respuesta del servidor
        const responseData = error.response.data;
        throw new Error(responseData.mensaje || 'Error en la solicitud');
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


export const traerUsuario = async (id) => { 
  try {
    const response = await apiApp.get(`/usuario/obtener/${id}`);
    
    if (response.data.success) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar traer un usuario : ${error.message}`);
      return null;
    //   throw error;
    
  }
}

export const cargarUsuario = async (id,setDatos) => { 
  try {
    const usuarioResponse = await traerUsuario(id)

    if (usuarioResponse?.success) {
      setDatos(usuarioResponse.data);
    }

  } catch (error) {
    console.error(`Error al intentar cargar los datos: ${error.message}`);
  }
}

export const editarUsuario =  async (id,data) => { 
  try {
    const response = await apiApp.put(`/usuario/editar/${id}`, data);

    if (response.data.success) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar editar el usuario : ${error.message}`);
      throw error;
  }
}