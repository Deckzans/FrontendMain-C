import { apiApp } from '../../api/apiUrl';

// Función para editar una requisición por su ID
export const editarRequisicion = async (id, data) => {
    try {
        const response = await apiApp.put(`/usuario/requisiciones/editar/${id}`, data);

        if (response.data.success) {
            return response.data.success;
        }
    } catch (error) {
        console.error(`Error al intentar editar una requisición: ${error.message}`);
        throw error;
    }
};
