// Archivo: helpers/apiHelpers.js
import { traerDocIncapacidad } from '../../hooks/HookDocumentos/useTraerDocs';
import {traerEmpleado } from '../../hooks';

export const cargarDocIncapacidadEmpleado = async (cl, setDatos, setIncapacidad) => {
  try {
    const incapacidadResponse = await traerDocIncapacidad(cl)
    
    const empleadoId = incapacidadResponse.data.empleadoId
   
    const empleadoResponse = await traerEmpleado(empleadoId);

    if (empleadoResponse?.success) {
      setDatos(empleadoResponse.data);
    }

    if (incapacidadResponse?.success && incapacidadResponse.data) {
        setIncapacidad(incapacidadResponse.data);
    } else {
        setIncapacidad([]);
    }
  } catch (error) {
    console.error(`Error al intentar cargar los datos: ${error.message}`);
  }
};
