import { create } from "zustand";
import { obtenerAreas } from "../helpers/fetchArea";


export const useAreaStore = create((set) => ({
    datos: [],
    setDatos: (nuevosDatos) => set({ datos: nuevosDatos }),
    traerAreas: async () => {
      try {
        const areas = await obtenerAreas();
        set({ datos: areas });
      } catch (error) {
        console.error(error);
      }
    }
  }));