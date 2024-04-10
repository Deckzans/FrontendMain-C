import { create } from 'zustand';
import { obtenerEmpleados, eliminarEmpleado } from '../helpers/fetchEmpleados';

export const useEmpleadoStore = create((set) => ({
  datos: [],
  contadoresPorArea: {},
  setDatos: (nuevosDatos) => set({ datos: nuevosDatos }),
  setContadoresPorArea: (contadores) => set({ contadoresPorArea: contadores }),
  traerEmpleados: async () => {
    try {
      const empleados = await obtenerEmpleados();
      set({ datos: empleados });
      const contadores = {};
      empleados.forEach((empleado) => {
        const areaId = empleado.areaId;
        contadores[areaId] = (contadores[areaId] || 0) + 1;
      });
      set({ contadoresPorArea: contadores });
    } catch (error) {
      console.error(error);
    }
  },
  eliminarEmpleado: async (empleadoId) => {
    try {
      // Eliminar empleado (debes implementar esta función)
      await eliminarEmpleado(empleadoId);

      // Actualizar la lista de empleados después de la eliminación
      const nuevosEmpleados = await obtenerEmpleados();
      set({ datos: nuevosEmpleados });

      // Recalcular los contadores por área después de la eliminación
      const contadores = {};
      nuevosEmpleados.forEach((empleado) => {
        const areaId = empleado.areaId;
        contadores[areaId] = (contadores[areaId] || 0) + 1;
      });
      set({ contadoresPorArea: contadores });
    } catch (error) {
      console.error(error);
    }
  },
}));
