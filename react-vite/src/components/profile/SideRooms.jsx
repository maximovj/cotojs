/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useDayjs } from "../../hooks/useDayjs";
import userProfile from '../../assets/150.png';

function SideRooms({ user }) {
    const dayjs = useDayjs();

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
                <div className="space-y-4">
                    {/* Ejemplo de sala */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={user.profilePicture || userProfile || 'https://via.placeholder.com/50'}
                                alt="User avatar"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{dayjs().fromNow()}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">Este es un ejemplo del contenido de una sala reciente. Puedes ver los comentarios y detalles aquí.</p>
                    </div>

                    {/* Otra sala */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={user.profilePicture || userProfile || 'https://via.placeholder.com/50'}
                                alt="User avatar"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{dayjs().fromNow()}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">Otra sala que muestra cómo se pueden organizar las salas recientes.</p>
                    </div>

                    {/* Otra sala */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={user.profilePicture || userProfile || 'https://via.placeholder.com/50'}
                                alt="User avatar"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{dayjs().fromNow()}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">Otra sala que muestra cómo se pueden organizar las salas recientes.</p>
                    </div>

                    {/* Otra sala */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={user.profilePicture || userProfile || 'https://via.placeholder.com/50'}
                                alt="User avatar"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{dayjs().fromNow()}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">Otra sala que muestra cómo se pueden organizar las salas recientes.</p>
                    </div>

                    {/* Otra sala */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={user.profilePicture || userProfile || 'https://via.placeholder.com/50'}
                                alt="User avatar"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{dayjs().fromNow()}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">Otra sala que muestra cómo se pueden organizar las salas recientes.</p>
                    </div>

                    {/* Otra sala */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={user.profilePicture || userProfile || 'https://via.placeholder.com/50'}
                                alt="User avatar"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{dayjs().fromNow()}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">Otra sala que muestra cómo se pueden organizar las salas recientes.</p>
                    </div>

                    {/* Otra sala */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={user.profilePicture || userProfile || 'https://via.placeholder.com/50'}
                                alt="User avatar"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{dayjs().fromNow()}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">Otra sala que muestra cómo se pueden organizar las salas recientes.</p>
                    </div>

                    {/* Otra sala */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={user.profilePicture || userProfile || 'https://via.placeholder.com/50'}
                                alt="User avatar"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{dayjs().fromNow()}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">Otra sala que muestra cómo se pueden organizar las salas recientes.</p>
                    </div>

                    {/* Otra sala */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={user.profilePicture || userProfile || 'https://via.placeholder.com/50'}
                                alt="User avatar"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{dayjs().fromNow()}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">Otra sala que muestra cómo se pueden organizar las salas recientes.</p>
                    </div>

                    {/* Otra sala */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={user.profilePicture || userProfile || 'https://via.placeholder.com/50'}
                                alt="User avatar"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">{dayjs().fromNow()}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">Otra sala que muestra cómo se pueden organizar las salas recientes.</p>
                    </div>

                    {/* Botón para cargar más */}
                    <div className="flex justify-center mt-4">
                        <button className="bg-gray-200 text-gray-800 text-sm py-1.5 px-4 rounded-full hover:bg-gray-300 transition ease-in-out">
                            Cargar Más
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideRooms;