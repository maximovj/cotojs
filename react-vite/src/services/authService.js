import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;

const authService = axios.create({
    baseURL: `${baseURL}/auth`,
    headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
    },
    withCredentials: true,
});

export function authServiceRegister(data) {
    return authService.post('/register', data);
}

export function authServiceSignIn(data) {
    return authService.post('/login', data, {
        withCredentials: true,
    });
}

export function authServiceCheckAuth() {
    return authService.post('/check-auth', {}, {
        withCredentials: true,
    });
}

export function authServiceLogOut() {
    return authService.post('/logout', {}, {
        withCredentials: true,
    });
}