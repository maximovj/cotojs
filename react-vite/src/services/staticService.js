import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
import defaultCover from '../assets/150.png';

const staticService = axios.create({
    baseURL: `${baseURL}/static`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

export function staticServiceRoomCover(filename) {
    return staticService.get(`/rooms/cover/${filename}`, { responseType: 'blob' })
        .then(response => {
            // Crea una URL de objeto a partir del blob de la imagen
            return URL.createObjectURL(response.data);
        })
        .catch(error => {
            console.error('Error al cargar la imagen:', error);
            return defaultCover; // Retorna una imagen por defecto en caso de error
        });
}