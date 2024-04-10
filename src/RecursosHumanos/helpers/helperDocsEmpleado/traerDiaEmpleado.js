// Archivo: helpers/apiHelpers.js
import { traerDocDia } from '../../hooks/HookDocumentos/useTraerDocs';
import {traerEmpleado } from '../../hooks';

export const cargarDocDiaEmpleado = async (cl, setDatos, setDiaEconomico) => {
  try {
    const diaResponse = await traerDocDia(cl)
    
    const empleadoId = diaResponse.data.empleadoId
   
    const empleadoResponse = await traerEmpleado(empleadoId);

    if (empleadoResponse?.success) {
      setDatos(empleadoResponse.data);
    }

    if (diaResponse?.success && diaResponse.data) {
        setDiaEconomico(diaResponse.data);
    } else {
        setDiaEconomico([]);
    }
  } catch (error) {
    console.error(`Error al intentar cargar los datos: ${error.message}`);
  }
};
