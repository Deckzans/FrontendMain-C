import { apiApp } from '../../api/apiUrl';

export const eliminarRequisicion = async (id) => {
  try {
    const response = await apiApp.delete(`/usuario/requisiciones/eliminar/${id}`); // Reemplaza 'ruta' con la ruta adecuada de tu API
    if (response.status === 200) {
      console.log("Requisición eliminada correctamente");
      return true;
    }
  } catch (error) {
    console.error(`Error al intentar eliminar una requisición: ${error.message}`);
    throw error;
  }
};