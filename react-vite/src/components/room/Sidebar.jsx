/* eslint-disable react/prop-types */
import default_cover from '../../assets/image.png';
import default_picture from '../../assets/account.png';
const baseURL = import.meta.env.VITE_API_URL;
const members_length = 50;

// Componente para la barra lateral
const Sidebar = ({ room, iAmMember, handleJoinMeRoom, handleLeaveRoom }) => (
    <div className="lg:w-1/4 p-4 bg-white shadow-lg rounded-lg border border-gray-300 lg:mb-0 mb-4 lg:sticky lg:top-0 flex flex-col items-start">
        {/* Imagen de portada */}
        <div className="w-full mb-4 hidden sm:block">
            <img
                src={room.cover ? `${baseURL}/${room.cover}` : default_cover}
                alt="Portada de la sala"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
            />
        </div>

        {/* Información de la sala */}
        <div className="w-full text-left mb-4 p-4 bg-gray-100 rounded-lg">
            <h1 className="text-sm font-bold text-gray-800 mb-2">{room.name}</h1>
            <h4 className="text-xs text-gray-600 mb-4">{room.description}</h4>
        </div>

        {/* Botones para la sala */}
        <div className="flex justify-start w-full">
            <div>
                {/* Botón de Unirme/Abandonar sala */}
                {!iAmMember && (
                    <button
                        onClick={handleJoinMeRoom}
                        className="bg-blue-500 text-white rounded-lg px-4 py-2 text-xs hover:bg-blue-600 transition duration-200 ease-in-out"
                    >
                        Unirme
                    </button>
                )}
                {iAmMember && (
                    <button
                        onClick={handleLeaveRoom}
                        className="bg-red-500 text-white rounded-lg px-4 py-2 text-xs hover:bg-red-600 transition duration-200 ease-in-out"
                    >
                        Abandonar sala
                    </button>
                )}
            </div>
        </div>

        {/* Separador */}
        <div className="w-full border-t border-gray-300 my-4"></div>

        {/* Lista de miembros */}
        <div className="w-full p-4 bg-white rounded-lg">
            <h2 className="text-sm font-bold text-gray-800 mb-2">Miembros ({room.members?.length || 0})</h2>
            <div className="flex flex-wrap justify-start">
                {room.members && room.members.length > 0 ? (<>
                    {room.members.slice(0, members_length).map((member, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <img
                                src={member.picture ? `${baseURL}/${member.picture}` : default_picture}
                                alt="Perfil"
                                className="w-8 h-8 rounded-full border-2 border-white"
                            />
                        </div>
                    ))}
                    {room.members.length > members_length && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-700">
                            +{room.members.length - members_length}
                        </div>
                    )}
                </>) : (
                    <span className="text-xs text-gray-500">No hay miembros en la sala.</span>
                )}
            </div>
        </div>
    </div>
);

export default Sidebar;