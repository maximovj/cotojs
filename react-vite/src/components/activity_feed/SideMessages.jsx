/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDayjs } from '../../hooks/useDayjs';
import { useToast } from '../../hooks/useToast';
import { messageServiceMine, messageServiceDelete } from '../../services/messageService.js';
import routes from '../../routes/routes.js';
import default_room_thumbnail from '../../assets/image.png';

const SideMessages = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalMessages, setTotalMessages] = useState(0);
    const dayjs = useDayjs();
    const showToast = useToast();

    const handleBtnDelete = (id) => {
        messageServiceDelete(id)
            .then(res => {
                if (res.data?.success) {
                    showToast(res.data.ctx_content, 'success');
                    window.location.reload();
                }
            });
    }

    const fetchData = async () => {
        if (page == totalPages + 1) {
            setHasMore(false);
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        messageServiceMine(page)
            .then(res => {
                if (res.data?.success) {
                    const { _doc, current_page, total_pages, total_messages } = res.data;
                    setMessages((prevMessages) => [...prevMessages, ..._doc]);
                    setTotalPages(total_pages);
                    setPage((prevPage) => prevPage + 1);
                    setHasMore(total_pages > current_page);
                    setTotalMessages(total_messages);
                }
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {/* Columna de mensajes (derecha) */}
            <div className='md:col-span-2'>
                {/* Cabecera de mensajes */}
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-lg font-bold text-gray-800'>Mensajes recientes ({totalMessages})</h2>
                    <Link to={routes.CreateRoom} className='bg-blue-500 text-white text-sm py-1.5 px-4 rounded-full hover:bg-blue-600 transition ease-in-out'>
                        Nueva sala
                    </Link>
                </div>

                {/* mensajes */}
                <InfiniteScroll
                    className='space-y-4'
                    dataLength={messages.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={
                        <div className='flex flex-col justify-center items-center mt-4'>
                            <ClipLoader color='#3498db' loading={true} size={40} />
                            <p className='text-gray-500 mt-2'>Cargando mensajes...</p>
                        </div>}
                    endMessage={
                        <div className='flex justify-center mt-4'>
                            <p>No hay más mensajes disponibles.</p>
                        </div>
                    }
                >
                    {messages.map((message, index) => (
                        <div key={`${message.id}-${index}`}>
                            <div className='bg-white p-4 rounded-lg shadow-md'>
                                <div className='flex items-center'>
                                    <img
                                        className='w-10 h-10 rounded-full object-cover'
                                        src={message.room.thumbnail ? `${routes.baseUrl}/${message.room.thumbnail}` : default_room_thumbnail}
                                        alt='User avatar'
                                        loading='lazy'
                                    />
                                    <div className='ml-3'>
                                        <p className='font-semibold text-gray-800 text-sm'>{message.room.name}</p>
                                        <p className='text-xs text-gray-500'>Enviado: {dayjs(message.createdAt).fromNow()}</p>
                                    </div>
                                </div>
                                <p className='mt-3 text-gray-700 text-sm mb-4'>{message.text}</p>
                                <p className='flex justify-end gap-1'>
                                    <button className='bg-red-500 hover:bg-red-600 text-xs rounded py-1.5 px-1.5 text-white cursor-pointer transition ease-in-out'
                                        onClick={() => { handleBtnDelete(message.id) }}>Eliminar</button>
                                    <Link className='bg-blue-500 hover:bg-blue-600 text-xs rounded py-1.5 px-1.5 text-white cursor-pointer transition ease-in-out' to={`/room/${message.room.id}`}>Ver sala</Link>
                                </p>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </>
    );
}

export default SideMessages;