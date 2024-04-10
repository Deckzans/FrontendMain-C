import axios from 'axios';

// Función para obtener la imagen del servidor
const obtenerImagen = async (nombreImagen) => {
    try {
        const response = await axios.get(`http://localhost:3000/descargar/imagen/${nombreImagen}`, {
            responseType: 'arraybuffer' // Indicamos que la respuesta es un buffer de bytes
        });

        // Convertimos el buffer de bytes en una URL para la imagen
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        
        return imageUrl; // Retorna la URL de la imagen
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        throw error; // Lanza el error para que pueda ser manejado por quien lo llame
    }
};

export default obtenerImagen;