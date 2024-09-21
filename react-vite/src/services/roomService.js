import axios from "axios";
import routes from '../routes/routes.js';

const roomService = axios.create({
    baseURL: `${routes.baseUrl}/room`,
    headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
    },
    withCredentials: true,
});

// Interceptor de respuesta
roomService.interceptors.response.use(
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

export function roomServiceCreate(data) {
    return roomService.post('/', data);
}

export function roomServiceUpdate(id, data) {
    return roomService.put(`/${id}`, data);
}

export function roomServiceAll(page = 1, limit = 6) {
    return roomService.get('/all', {
        params: { page, limit }
    });
}

export function roomServiceFind(id) {
    return roomService.get(`/${id}`);
}

export function roomServiceJoin(id) {
    return roomService.post(`/join/${id}`);
}

export function roomServiceLeave(id) {
    return roomService.post(`/leave/${id}`);
}

export function roomServiceMe(page = 1, limit = 5) {
    return roomService.get('/mine', {
        params: { page, limit }
    });
}

export function roomServiceDelete(id) {
    return roomService.delete(`/${id}`);
}