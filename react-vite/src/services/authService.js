import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;

const authService = axios.create({
    baseURL: `${baseURL}/auth`,
    headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
    }
});

export function authServiceRegister(data) {
    return authService.post('/register', data);
}
