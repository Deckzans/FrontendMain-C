import { create } from "zustand";
import {persist} from 'zustand/middleware'

const useAppState = create( 
  persist (
    (set) => ({
      token: null,
      usuario: null,
      rol: null,
      id: null, 
      setCredenciales: (token, usuario, rol, id) => set({ token, usuario, rol, id }),
      obtenerEstado: () => set(), // Función para obtener el estado actual
    }), 
    { 
      name:"usuario-storage"
    }
  )
);

export default useAppState;