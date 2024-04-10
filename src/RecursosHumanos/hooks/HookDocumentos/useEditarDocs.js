import { apiApp } from '../../../api/apiUrl';

export const editarIncapacidad = async (id,data) => {
  try {
    const response = await apiApp.put(`/editarDoc/editarIncapacidad/${id}`, data);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
  {
      console.error(`Error al intentar editar una Incapacidad : ${error.message}`);
      throw error;
    }
  }
};

export const editarPermiso = async (id,data) => {
  try {
    const response = await apiApp.put(`/editarDoc/editarPermiso/${id}`, data);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
      console.error(`Error al intentar editar un permiso : ${error.message}`);
      throw error;
  }
};

export const editarVacacion = async (id,data) => {
  try {
    const response = await apiApp.put(`/editarDoc/editarVacacion/${id}`, data);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
      console.error(`Error al intentar editar la vacacion : ${error.message}`);
      throw error;
  }
};

export const editarDia = async (id,data) => {
  try {
    const response = await apiApp.put(`/editarDoc/editarDia/${id}`,data);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
      console.error(`Error al intentar editar el Dia : ${error.message}`);
      throw error;
  }
};

export const editarFormacion = async (id,data) => {
  try {
    const response = await apiApp.put(`/editarDoc/editarFormacion/${id}`, data);

    if (response.data.success) { 
      return response.data.success; 
    } 
  } catch (error) {
      console.error(`Error al intentar editar el Dia : ${error.message}`);
      throw error;
  }
};

export const cambiarArchivoDia = async (data) => { 
  try {
    const response = await apiApp.post(`/editarDoc/cargarNuevoArchivoDia/`, data);

    if (response.status === 200) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar editar el Dia : ${error.message}`);
      throw error;
  }
}

export const cambiarArchivoVacacion = async (data) => { 
  try {
    const response = await apiApp.post(`/editarDoc/cargarNuevoArchivoVacacion`, data);

    if (response.status === 200) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar editar el Dia : ${error.message}`);
      throw error;
  }
}

export const cambiarArchivoPermiso = async (data) => { 
  try {
    const response = await apiApp.post(`/editarDoc/cargarNuevoArchivoPermiso`, data);

    if (response.status === 200) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar editar el Dia : ${error.message}`);
      throw error;
  }
}

export const cambiarArchivoIncapacidad = async (data) => { 
  try {
    const response = await apiApp.post(`/editarDoc/cargarNuevoArchivoIncapacidad`, data);

    if (response.status === 200) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar editar el Dia : ${error.message}`);
      throw error;
  }
}


export const cambiarArchivoFormacion = async (data) => { 
  try {
    const response = await apiApp.post(`/editarDoc/cargarNuevoArchivoFormacion`, data);

    if (response.status === 200) { 
      return response.data; 
    } 
  } catch (error) {
      console.error(`Error al intentar editar el Dia : ${error.message}`);
      throw error;
  }
}