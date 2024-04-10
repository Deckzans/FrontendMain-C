// useEmpleadoData.js
import { useEffect, useState } from "react";
import { traerEmpleado } from "./useEmpleadoEditar";

const useEmpleadoData = (cl) => {
  const [Datos, setDatos] = useState({});

  useEffect(() => {
    const cargarDatosEmpleado = async () => {
      try {
        const response = await traerEmpleado(cl);
        const { success, mensaje, data } = response;
        if (response && success) {
          setDatos(data);
        }
      } catch (error) {
        console.error(`Error al intentar cargar un empleado: ${error.message}`);
      }
    };

    cargarDatosEmpleado();
  }, [cl]);

  return Datos;
};

export default useEmpleadoData;
