const baseUrl =  import.meta.env.VITE_API_URL || 'http://localhost:5880/api/v1';
const socketIoDomain =  import.meta.env.VITE_SOCKET_IO_DOMAIN || 'http://localhost:5880';
const socketIoPath =  import.meta.env.VITE_SOCKET_IO_PATH || '/api/v1/socket.io';

const routes = {
    // Se define variables de entorno
    baseUrl,
    socketIoDomain,
    socketIoPath,
    
    // Se define rutas, para rutas publicas
    Root: '/',
    Home: '/home',
    Login: '/login',
    Error404: '*',

    // Se define rutas, para rutas protegidas
    Profile: '/profile',
    ActivityFeed: '/profile/activity_feed',
    EditProfile: '/profile/edit',
    Rooms: '/rooms',
    CreateRoom: '/room/create',
    ChatRoom: '/room', // más /:id adicional requerido
    EditRoom: '/room/edit', // más /:id adicional requerido
}

export default routes;