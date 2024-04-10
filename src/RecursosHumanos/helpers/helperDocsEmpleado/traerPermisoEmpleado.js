// Archivo: helpers/apiHelpers.js
import { traerDocPermiso } from '../../hooks/HookDocumentos/useTraerDocs';
import {traerEmpleado } from '../../hooks';

export const cargarDocPermisoEmpleado = async (cl, setDatos, setPermiso) => {
  try {
    const PermisoResponse = await traerDocPermiso(cl)
    
    const empleadoId = PermisoResponse.data.empleadoId
   
    const empleadoResponse = await traerEmpleado(empleadoId);

    if (empleadoResponse?.success) {
      setDatos(empleadoResponse.data);
    }

    if (PermisoResponse?.success && PermisoResponse.data) {
        setPermiso(PermisoResponse.data);
    } else {
        setPermiso([]);
    }
  } catch (error) {
    console.error(`Error al intentar cargar los datos: ${error.message}`);
  }
};
