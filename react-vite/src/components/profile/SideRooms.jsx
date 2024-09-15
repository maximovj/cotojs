/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import InfiniteScroll from "react-infinite-scroll-component";
import { roomServiceMe } from '../../services/roomService.js';
import { useDayjs } from "../../hooks/useDayjs";
import userProfile from '../../assets/150.png';

function SideRooms({ user }) {
    const dayjs = useDayjs();
    const [rooms, setRooms] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        if (page == totalPages + 1) {
            setHasMore(false);
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        roomServiceMe(page)
            .then(res => {
                if (res.data?.success) {
                    console.log(res);
                    setRooms((prevRooms) => [...prevRooms, ...res.data._doc]);
                    setTotalPages(res.data.total_pages);
                    setPage((prevPage) => prevPage + 1);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {/* Columna de salas (derecha) */}
            <div className="md:col-span-2">
                {/* Cabecera de salas */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Salas recientes</h2>
                    <Link to='/room/create' className="bg-blue-500 text-white text-sm py-1.5 px-4 rounded-full hover:bg-blue-600 transition ease-in-out">
                        Nueva sala
                    </Link>
                </div>

                {/* Salas */}
                <InfiniteScroll
                    className="space-y-4"
                    dataLength={rooms.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={
                        <div className="flex flex-col justify-center items-center mt-4">
                            <ClipLoader color="#3498db" loading={true} size={40} />
                            <p className="text-gray-500 mt-2">Cargando salas...</p>
                        </div>}
                    endMessage={
                        <div className="flex justify-center mt-4">
                            <p>No hay más salas disponibles.</p>
                        </div>
                    }
                >
                    {rooms.map((room, index) => (
                        <div key={`${room.id}-${index}`}>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <div className="flex items-center">
                                    <img
                                        className="w-10 h-10 rounded-full object-cover"
                                        src={room.cover || userProfile || 'https://via.placeholder.com/50'}
                                        alt="User avatar"
                                    />
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-800 text-sm">{room.name}</p>
                                        <p className="text-xs text-gray-500">Creado: {dayjs(room.createdAt).fromNow()} | Miembros: {room.members.length}</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-gray-700 text-sm mb-4">{room.description}</p>
                                <p className="flex justify-end gap-1">
                                    <button className='bg-red-500 hover:bg-red-600 text-xs rounded py-1.5 px-1.5 text-white cursor-pointer transition ease-in-out'>Eliminar</button>
                                    <Link className='bg-blue-500 hover:bg-blue-600 text-xs rounded py-1.5 px-1.5 text-white cursor-pointer transition ease-in-out' to={`/room/${room.id}`}>Ver</Link>
                                </p>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </>
    );
}

export default SideRooms;