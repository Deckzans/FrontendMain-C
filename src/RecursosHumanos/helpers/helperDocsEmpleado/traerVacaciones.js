// Archivo: helpers/apiHelpers.js
import { traerDocVacacion } from '../../hooks/HookDocumentos/useTraerDocs';
import {traerEmpleado } from '../../hooks';

export const cargarDocVacacionEmpleado = async (cl, setDatos, setVacacion) => {
  try {
    const vacacionResponse = await traerDocVacacion(cl)
    const empleadoId = vacacionResponse.data.empleadoId
   
    const empleadoResponse = await traerEmpleado(empleadoId);

    if (empleadoResponse?.success) {
      setDatos(empleadoResponse.data);
    }

    if (vacacionResponse?.success && vacacionResponse.data) {
          setVacacion(vacacionResponse.data);
    } else {
          setVacacion([]);
    }
  } catch (error) {
    console.error(`Error al intentar cargar los datos: ${error.message}`);
  }
};
