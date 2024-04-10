// Archivo: helpers/apiHelpers.js
import { traerDocFormacion } from '../../hooks/HookDocumentos/useTraerDocs';
import {traerEmpleado } from '../../hooks';

export const cargarDocFormacionEmpleado = async (cl, setDatos, setFormacion) => {
  try {
    const formacionResponse = await traerDocFormacion(cl)
    
    const empleadoId = formacionResponse.data.empleadoId
   
    const empleadoResponse = await traerEmpleado(empleadoId);

    if (empleadoResponse?.success) {
      setDatos(empleadoResponse.data);
    }

    if (formacionResponse?.success && formacionResponse.data) {
        setFormacion(formacionResponse.data);
    } else {
        setFormacion([]);
    }
  } catch (error) {
    console.error(`Error al intentar cargar los datos: ${error.message}`);
  }
};
