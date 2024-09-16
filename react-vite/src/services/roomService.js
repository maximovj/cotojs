import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

const roomService = axios.create({
    baseURL: `${baseURL}/room`,
    headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
    },
    withCredentials: true,
});

export function roomServiceCreate(data) {
    return roomService.post('/', data);
}

export function roomServiceAll(page = 1, limit = 10) {
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