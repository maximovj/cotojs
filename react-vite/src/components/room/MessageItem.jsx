/* eslint-disable react/prop-types */
import default_profile from '../../assets/account.png';
const baseURL = import.meta.env.VITE_API_URL;

// Componente que representa un mensaje
const MessageItem = ({ msg, userId }) => {
    const isCurrentUser = msg.send_by._id === userId;
    return (
        <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start ${isCurrentUser ? 'bg-blue-100' : 'bg-gray-100'} p-2 rounded-lg shadow-md max-w-xs relative`}>
                {!isCurrentUser && <img src={msg.send_by.picture ? `${baseURL}/${msg.send_by.picture}` : default_profile} alt="Perfil" className="w-8 h-8 rounded-full border border-gray-300 mr-2" />}
                <div className="flex-1">
                    <span className="text-xs font-medium text-gray-800">{msg.send_by.name}</span>
                    <p className="text-xs text-gray-600">{msg.text}</p>
                </div>
                {isCurrentUser && <img src={msg.send_by.picture ? `${baseURL}/${msg.send_by.picture}` : default_profile} alt="Perfil" className="w-8 h-8 rounded-full border border-gray-300 ml-2" />}
            </div>
        </div>
    );
};

export default MessageItem;