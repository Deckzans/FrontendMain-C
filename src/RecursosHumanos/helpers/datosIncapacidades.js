// Archivo: helpers/apiHelpers.js
import { traerEmpleado, traerIncapacidades } from '../hooks';

export const cargarDatosEmpleadoInca = async (cl, setDatos, setIncapacidades) => {
  try {
    const empleadoResponse = await traerEmpleado(cl);
    const incapacidadResponse = await traerIncapacidades(cl);

    if (empleadoResponse?.success) {
      setDatos(empleadoResponse.data);
    }

    if (incapacidadResponse?.success && incapacidadResponse.data) {
      setIncapacidades(incapacidadResponse.data);
    } else {
        setIncapacidades([]);
    }
  } catch (error) {
    console.error(`Error al intentar cargar los datos: ${error.message}`);
  }
};
