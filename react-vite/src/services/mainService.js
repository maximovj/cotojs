import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

const mainService = axios.create({
    baseURL: `${baseURL}/main`,
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
            window.location.href = '/sign-in';
        }
        return Promise.reject(error);
    }
);

export function mainServicePrivado() {
    return mainService('/privado');
}