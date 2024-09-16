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

export function userServiceUpdate(data) {
    return userService.put('/', data);
}

export function userServiceDelete() {
    return userService.delete('/');
}