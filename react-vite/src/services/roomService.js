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

export function roomServiceList() {
    return roomService.get('/all');
}

export function roomServiceFind(id) {
    return roomService.get(`/${id}`);
}

export function roomServiceJoin(id) {
    return roomService.post(`/join/${id}`);
}