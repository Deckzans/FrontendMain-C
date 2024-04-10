import { traerEmpleado, traerFormacion } from '../hooks';


export const cargarFormacion = async (cl, setDatos, setFormacion) => {
  try {
    const empleadoResponse = await traerEmpleado(cl);
    const formacionResponse = await traerFormacion(cl);

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
