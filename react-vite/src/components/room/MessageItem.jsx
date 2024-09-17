/* eslint-disable react/prop-types */
import { useDayjs } from '../../hooks/useDayjs';
import default_user_thumbnail from '../../assets/account.png';
const baseURL = import.meta.env.VITE_API_URL;

// Componente que representa un mensaje
const MessageItem = ({ msg, userId }) => {
    const isCurrentUser = msg.send_by._id === userId;
    const dayjs = useDayjs();
    return (
        <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start ${isCurrentUser ? 'bg-blue-100' : 'bg-gray-100'} p-2 rounded-lg shadow-md max-w-xs relative`}>
                {!isCurrentUser && <img loading='lazy' src={msg.send_by.thumbnail ? `${baseURL}/${msg.send_by.thumbnail}` : default_user_thumbnail} alt="Perfil" className="w-8 h-8 rounded-full border border-gray-300 mr-2" />}
                <div className="flex-1">
                    <span className="text-xs font-medium text-gray-800">{msg.send_by.name}</span>
                    <p className="text-xs text-gray-600">{msg.text}</p>
                    <p className="text-[10px] text-gray-500 opacity-70 mt-4">Enviado {dayjs(msg.createdAt).fromNow()}</p>
                </div>
                {isCurrentUser && <img loading='lazy' src={msg.send_by.thumbnail ? `${baseURL}/${msg.send_by.thumbnail}` : default_user_thumbnail} alt="Perfil" className="w-8 h-8 rounded-full border border-gray-300 ml-2" />}
            </div>
        </div>
    );
};

export default MessageItem;