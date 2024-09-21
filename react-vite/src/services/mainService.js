import axios from "axios";
import routes from '../routes/routes.js';

const mainService = axios.create({
    baseURL: `${routes.baseUrl}/main`,
    headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
    },
    withCredentials: true,
});

// Interceptor de respuesta
mainService.interceptors.response.use(
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

export function mainServicePrivado() {
    return mainService('/privado');
}