import axios from "axios";
import routes from '../routes/routes.js';

const messageService = axios.create({
    baseURL: `${routes.baseUrl}/message`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Interceptor de respuesta
messageService.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // Redirige al usuario a la página de inicio de sesión
            window.location.href = routes.Login;
        }
        return Promise.reject(error);
    }
);

export function messageServiceCreate(id, data) {
    return messageService.post(`/room/${id}`, data);
}

export function messageServiceFind(id) {
    return messageService.get(`/room/${id}`);
}

export function messageServiceMine(page = 1, limit = 15) {
    return messageService.get('/mine', {
        params: { page, limit }
    });
}

export function messageServiceDelete(id) {
    return messageService.delete(`/${id}`);
}