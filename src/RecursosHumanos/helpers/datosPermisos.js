// Archivo: helpers/apiHelpers.js
import { traerEmpleado, traerPermisos } from '../hooks';

export const cargarDatosEmpleado = async (cl, setDatos, setPermisos) => {
  try {
    const empleadoResponse = await traerEmpleado(cl);
    const permisosResponse = await traerPermisos(cl);

    if (empleadoResponse?.success) {
      setDatos(empleadoResponse.data);
    }

    if (permisosResponse?.success && permisosResponse.data) {
      setPermisos(permisosResponse.data);
    } else {
      setPermisos([]);
    }
  } catch (error) {
    console.error(`Error al intentar cargar los datos: ${error.message}`);
  }
};
