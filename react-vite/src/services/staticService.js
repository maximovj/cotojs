import axios from "axios";
import routes from '../routes/routes.js';
import defaultCover from '../assets/150.png';

const staticService = axios.create({
    baseURL: `${routes.baseUrl}/static`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Interceptor de respuesta
staticService.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // Redirige al usuario a la página de inicio de sesión
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

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
};

export function staticServiceChangeCover(id, data) {
    return staticService.post(`/rooms/cover/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'multipart/form-data',
        }
    });
};

export function staticServiceChangePicture(id, form_data) {
    return staticService.post(`/users/picture/${id}`, form_data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'multipart/form-data',
        }
    });
};