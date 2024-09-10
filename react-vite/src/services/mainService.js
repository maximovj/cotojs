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

export function mainServicePrivado() {
    return mainService('/privado');
}