import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;

const userService = axios.create({
    baseURL: `${baseURL}/user`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Interceptor de respuesta
userService.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // Redirige al usuario a la página de inicio de sesión
            window.location.href = '/sign-in';
        }
        return Promise.reject(error);
    }
);

export function userServiceUpdate(data) {
    return userService.put('/', data);
}

export function userServiceDelete() {
    return userService.delete('/');
}