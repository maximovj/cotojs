import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Tooltip as ReactTippy } from 'react-tippy';
import { useDayjs } from '../../hooks/useDayjs.jsx';
import { roomServiceAll } from '../../services/roomService.js';
import socketService from '../../services/socketService.js';
import default_cover from '../../assets/default_cover.png';
import default_user_thumbnail from '../../assets/account.png';
const baseURL = import.meta.env.VITE_API_URL;
const total_members = 15;

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const dayjs = useDayjs();

    const fetchData = async () => {
        if (page > totalPages + 1) {
            setHasMore(false);
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        roomServiceAll(page)
            .then(res => {
                if (res.data?.success) {
                    const { _doc, current_page, total_pages } = res.data;
                    setRooms((prevRooms) => [...prevRooms, ..._doc]);
                    setTotalPages(total_pages);
                    setPage((prevPage) => prevPage + 1);
                    setHasMore(total_pages > current_page);
                }
            });
    };

    const truncateDescription = (text, maxLength = 360) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Configurar Socket.IO para recibir nuevas salas
    useEffect(() => {
        socketService.on('on_rooms', (newRoom) => {
            setRooms((prevRooms) => [...prevRooms, newRoom]);
        });

        return () => {
            socketService.off('on_rooms');
        };
    }, []);

    return (
        <div className='container mx-auto p-4'>
            <InfiniteScroll
                dataLength={rooms.length}
                next={fetchData}
                hasMore={hasMore}
                refreshFunction={fetchData}
                loader={
                    <div className='flex flex-col justify-center items-center mt-4'>
                        <ClipLoader color='#3498db' loading={true} size={40} />
                        <p className='text-gray-500 mt-2'>Cargando salas...</p>
                    </div>}
                endMessage={
                    <div className='flex flex-col justify-center items-center mt-10'>
                        <h2 className='text-lg text-gray-700 font-semibold mb-2'>¡No hay más salas disponibles!</h2>
                        <p className='text-gray-500 mb-6'>Crea una nueva sala y comienza a conectar con otros.</p>
                        <Link to='/room/create' className='bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors'>
                            Crear Nueva Sala
                        </Link>
                    </div>
                }
            >
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 m-6'>
                    {rooms.map((item, index) => (
                        <div
                            key={`${item._id.slice(0, 7)}-${index}`}
                            className='bg-white shadow-md rounded-lg overflow-hidden flex flex-col relative min-h-[510px] transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border hover:border-gray-200'
                        >
                            {/* Imagen de portada con borde asimétrico */}
                            <div className='relative w-full h-52 overflow-hidden'>
                                <img
                                    src={item.cover ? `${baseURL}/${item.cover}` : default_cover}
                                    alt='Cover'
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    loading='lazy'
                                />
                                <div className='absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-800 via-transparent to-transparent'></div>
                            </div>

                            {/* Contenido de la tarjeta */}
                            <div className='p-4 flex flex-col flex-grow'>
                                {/* Fila de encabezado con la foto del creador */}
                                <div className='flex items-center mb-2'>
                                    <img
                                        src={item.created_by.thumbnail ? `${baseURL}/${item.created_by.thumbnail}` : default_user_thumbnail}
                                        alt='Perfil del creador'
                                        className='w-8 h-8 rounded-full object-cover border-2 border-white'
                                        loading='lazy'
                                    />
                                    <div className='ml-2'>
                                        <h2 className='text-base font-bold text-gray-800'>{item.name}</h2>
                                        <p className='text-xs text-gray-500'>{item.created_by.name || 'Creador desconocido'}</p>
                                    </div>
                                </div>

                                {/* Fecha de creación */}
                                <div className='flex justify-between'>
                                    <p className='text-xs text-gray-500 mb-2'>{dayjs(item.createdAt).format('LL')}</p>
                                    <p className='text-xs text-gray-500 mb-2'>{dayjs(item.createdAt).fromNow()}</p>
                                </div>

                                {/* Descripción */}
                                <p className='text-sm text-gray-600 mb-4 flex-grow'>
                                    {truncateDescription(item.description, 360)}
                                </p>

                                {/* Miembros */}
                                <div className='flex items-center mt-4 space-x-2'>
                                    <div className='flex -space-x-2 overflow-hidden'>
                                        {item.members.slice(0, total_members).map((member, idx) => (
                                            <div key={idx}>
                                                <ReactTippy
                                                    title={member.name}
                                                    position='top-start'
                                                    trigger='mouseenter'
                                                    animation='fade'
                                                    arrowSize='regular'
                                                    arrow={true}
                                                    style={{ fontSize: '4px' }}
                                                >
                                                    <a data-tooltip-id={`${item._id}-${index}-${member.id}-${idx}`}>
                                                        <img
                                                            src={member.thumbnail ? `${baseURL}/${member.thumbnail}` : default_user_thumbnail}
                                                            alt={`Miembro ${idx}`}
                                                            className='w-6 h-6 rounded-full border-2 border-white'
                                                            loading='lazy'
                                                        />
                                                    </a>
                                                </ReactTippy>
                                            </div>
                                        ))}
                                        {item.members.length > total_members && (
                                            <div className='w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-700'>
                                                +{item.members.length - total_members}
                                            </div>
                                        )}
                                    </div>
                                    <p className='text-xs text-gray-500 ml-2'>
                                        {item.members.length} miembro{item.members.length > 1 ? 's' : ''}
                                    </p>
                                </div>

                                {/* Acción */}
                                <div className='absolute bottom-14 right-4'>
                                    <Link
                                        to={`/room/${item._id}`}
                                        className='bg-gray-500 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-600 transition-colors'
                                    >
                                        Ver sala
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div >
    );
}

export default Rooms;
