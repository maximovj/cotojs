/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useDayjs } from "../../hooks/useDayjs";
import userProfile from '../../assets/150.png';
const baseURL = import.meta.env.VITE_API_URL;

function SideProfile({ user }) {
    const dayjs = useDayjs();

    return (<>
        <div className="bg-white shadow-lg rounded-lg p-6">
            {/* Imagen del perfil */}
            <div className="flex justify-center mb-4">
                <img
                    className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover shadow-md"
                    src={user.picture ? `${baseURL}/${user.picture}` : userProfile}
                    alt="Profile"
                    loading="lazy"
                />
            </div>
            {/* Información del usuario */}
            <div className="text-start sm:text-center lg:text-start">
                <h1 className="text-xl font-semibold text-gray-800">{user.name}</h1>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">Miembro desde: {dayjs(user.createdAt).format('L')}</p>
                <p className="text-sm text-blue-500 mt-1">{dayjs(user.createdAt).fromNow()}</p>
            </div>
            {/* Botones de acción */}
            <div className="mt-4 flex lg:flex-col justify-center gap-2">
                <Link
                    to={`/profile/edit`}
                    className="bg-gray-200 text-gray-800 text-sm font-medium py-1.5 px-4 rounded-lg hover:bg-gray-300 transition ease-in-out">
                    Editar perfil
                </Link>
                <Link
                    to={`/profile`}
                    className="bg-gray-200 text-gray-800 text-sm font-medium py-1.5 px-4 rounded-lg hover:bg-gray-300 transition ease-in-out">
                    Mis salas
                </Link>
                <Link
                    to={`/profile/activity_feed`}
                    className="bg-gray-200 text-gray-800 text-sm font-medium py-1.5 px-4 rounded-lg hover:bg-gray-300 transition ease-in-out">
                    Mi mensajes
                </Link>
            </div>
        </div>
    </>);

}

export default SideProfile;