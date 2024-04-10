import { apiApp } from '../../../api/apiUrl';

export const eliminarDia = async (id) => {
  try {
    const response = await apiApp.delete(`/eliminarDoc/eliminarDia/${id}`);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
      console.error(`Error al intentar eliminar la formacion : ${error.message}`);
      throw error;
  }
};

export const eliminarFormacionm = async (id) => {
  try {
    const response = await apiApp.delete(`/eliminarDoc/eliminarFormacion/${id}`);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
      console.error(`Error al intentar eliminar la formacion : ${error.message}`);
      throw error;
  }
};

export const eliminarIncapacidad = async (id) => {
  try {
    const response = await apiApp.delete(`/eliminarDoc/eliminarIncapacidad/${id}`);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
      console.error(`Error al intentar eliminar la incapacidad : ${error.message}`);
      throw error;
  }
};

export const eliminarPermiso = async (id) => {
  try {
    const response = await apiApp.delete(`/eliminarDoc/eliminarPermiso/${id}`);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
      console.error(`Error al intentar eliminar el permiso : ${error.message}`);
      throw error;
  }
};

export const eliminarVacacion = async (id) => {
  try {
    const response = await apiApp.delete(`/eliminarDoc/eliminarVacacion/${id}`);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
      console.error(`Error al intentar eliminar la vacacion : ${error.message}`);
      throw error;
  }
};

export const eliminarDocVacacion = async (nombreArchivo) => { 
  try {
    const response = await apiApp.delete(`/eliminarDocServer/vacacion/${nombreArchivo}`);

    if (response.data.status === 200) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar eliminar la vacacion : ${error.message}`);
      throw error;
  }
}

export const eliminarDocPermiso = async (nombreArchivo) => { 
  try {
    const response = await apiApp.delete(`/eliminarDocServer/permiso/${nombreArchivo}`);

    if (response.data.status === 200) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar eliminar el permiso : ${error.message}`);
      throw error;
  }
}

export const eliminarDocIncapacidad = async (nombreArchivo) => { 
  try {
    const response = await apiApp.delete(`/eliminarDocServer/incapacidad/${nombreArchivo}`);

    if (response.data.status === 200) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar eliminar el permiso : ${error.message}`);
      throw error;
  }
}


export const eliminarDocDia = async (nombreArchivo) => { 
  try {
    const response = await apiApp.delete(`/eliminarDocServer/Dia/${nombreArchivo}`);

    if (response.data.status === 200) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar eliminar el permiso : ${error.message}`);
      throw error;
  }
}

export const eliminarDocFormacion = async (nombreArchivo) => { 
  try {
    const response = await apiApp.delete(`/eliminarDocServer/formacion/${nombreArchivo}`);

    if (response.data.status === 200) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar eliminar el permiso : ${error.message}`);
      throw error;
  }
}