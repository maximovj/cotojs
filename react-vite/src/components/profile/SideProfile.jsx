/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useDayjs } from "../../hooks/useDayjs";
import userProfile from '../../assets/150.png';

function SideProfile({ user }) {
    const dayjs = useDayjs();

    return (<>
        <div className="bg-white shadow-lg rounded-lg p-6">
            {/* Imagen del perfil */}
            <div className="flex justify-center mb-4">
                <img
                    className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover shadow-md"
                    src={user.profilePicture || userProfile || 'https://via.placeholder.com/150'}
                    alt="Profile"
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
            <div className="mt-4 flex justify-center space-x-3">
                <Link
                    to={`/profile/edit`}
                    className="bg-blue-500 text-white text-sm font-medium py-1.5 px-4 rounded-lg hover:bg-blue-600 transition ease-in-out">
                    Editar Perfil
                </Link>
                <button className="bg-gray-200 text-gray-800 text-sm font-medium py-1.5 px-4 rounded-lg hover:bg-gray-300 transition ease-in-out">
                    Ver Actividad
                </button>
            </div>
        </div>
    </>);

}

export default SideProfile;