import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { roomServiceAll } from '../../services/roomService.js';
import socketService from '../../services/socketService.js';

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);
    const [itemsPerPage, setItemsPerPage] = useState(0); // Para calcular cuántas salas cargar en función del tamaño de pantalla

    // Función para cargar las salas
    const loadRooms = (page, limit) => {
        roomServiceAll(page, limit)
            .then(res => {
                if (res.data?.success) {
                    // Añadir las nuevas salas al estado existente
                    setRooms((prevRooms) => [...prevRooms, ...res.data._doc]);

                    // Verificamos si quedan más salas por cargar
                    if (res.data._doc.length < limit) {
                        setHasMore(false);
                    } else {
                        setHasMore(res.data.current_page < res.data.total_pages);
                    }
                }
            });
    };

    // Cargar salas cuando la página cambie
    useEffect(() => {
        loadRooms(page, itemsPerPage || 10); // Ajustar el límite basado en el número de elementos por página
    }, [page, itemsPerPage]);

    // Cargar las salas iniciales y ajustar el número de elementos según el tamaño de pantalla
    useEffect(() => {
        const calculateItemsPerPage = () => {
            const gridElement = document.querySelector('.grid');
            if (gridElement) {
                const gridItemWidth = 300; // Asumiendo que cada sala tiene un ancho fijo de 300px
                const containerWidth = gridElement.clientWidth;
                const itemsPerRow = Math.floor(containerWidth / gridItemWidth);
                const rowsPerPage = Math.ceil(window.innerHeight / 350); // Ajustar la altura de los elementos
                setItemsPerPage(itemsPerRow * rowsPerPage);
            }
        };

        window.addEventListener('resize', calculateItemsPerPage);
        calculateItemsPerPage(); // Llamar inmediatamente

        return () => {
            window.removeEventListener('resize', calculateItemsPerPage);
        };
    }, []);

    // Socket para recibir nuevas salas en tiempo real
    useEffect(() => {
        socketService.on('on_rooms', (newRoom) => {
            setRooms((prevRooms) => [...prevRooms, newRoom]);
        });

        return () => {
            socketService.off('on_rooms');
        };
    }, []);

    // Función de observador para scroll infinito
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [hasMore]);

    // Configurar el observador de intersección
    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '20px',
            threshold: 0.1, // Activar el observador más cerca del final de la página
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [handleObserver]);

    return (
        <div className="container mx-auto p-4">
            {rooms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {rooms.map((item, index) => (
                        <div key={`${item._id.slice(0, 7)}-${index}`} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                {/* Si tienes una imagen de perfil o ícono para la sala */}
                                <div className="mr-4">
                                    <img
                                        src={item.image || 'https://via.placeholder.com/50'}
                                        alt="icono"
                                        className="rounded-full h-12 w-12 object-cover"
                                    />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                    <p className="text-sm text-gray-500">{item.creatorName || 'Creador desconocido'}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">{item.description}</p>
                            <Link
                                to={`/room/${item._id}`}
                                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
                                Ver Sala
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-screen">
                    <h2 className="text-lg text-gray-700 font-semibold mb-2">¡No hay salas disponibles aún!</h2>
                    <p className="text-gray-500 mb-6">Crea la primera sala y comienza a conectar con otros.</p>
                    <Link to="/room/create" className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors">
                        Crear Nueva Sala
                    </Link>
                </div>
            )}

            {/* Mostrar el Spinner mientras se cargan más salas */}
            {hasMore && rooms.length > 0 && (
                <div ref={loaderRef} className="flex flex-col justify-center items-center mt-4">
                    <ClipLoader color="#3498db" loading={true} size={40} />
                    <p className="text-gray-500 mt-2">Cargando más salas...</p>
                </div>
            )}
        </div>
    );
}

export default Rooms;
