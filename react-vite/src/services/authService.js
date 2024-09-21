import axios from 'axios';
import routes from '../routes/routes.js';

const authService = axios.create({
    baseURL: `${routes.baseUrl}/auth`,
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