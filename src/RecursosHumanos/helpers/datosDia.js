// Archivo: helpers/apiHelpers.js
import { traerDia, traerEmpleado } from '../hooks';

export const cargarDatosDia = async (cl, setDatos, setDiaEconomico) => {
  try {
    const empleadoResponse = await traerEmpleado(cl);
    const diaResponse = await traerDia(cl);

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
