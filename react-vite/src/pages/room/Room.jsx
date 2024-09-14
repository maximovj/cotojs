import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { roomServiceFind, roomServiceJoin } from '../../services/roomService.js';
import { messageServiceCreate, messageServiceFind } from '../../services/messageService.js';
import default_profile from '../../assets/account.png';

const Room = () => {
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState({});
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState('');
    const { id } = useParams();
    const showToast = useToast();
    const messagesEndRef = useRef(null); // Reference for scrolling

    const loadRoom = () => {
        roomServiceFind(id)
            .then(res => {
                if (res.data?.success) {
                    showToast(res.data.ctx_content, 'success');
                    setRoom({
                        ...res.data._doc,
                    });
                }
            })
            .catch(err => {
                showToast(err.message, 'error');
            });
    }

    const loadMessages = () => {
        messageServiceFind(id)
            .then(res => {
                if (res.data?.success) {
                    setMessages([...message, ...res.data._doc]);
                    setUserId(res.data.user_id);
                }
            });
    }

    const btnJoin = () => {
        roomServiceJoin(id)
            .then(res => {
                if (res.data?.success) {
                    showToast(res.data?.ctx_content, 'success');
                }
            });
    }

    useEffect(() => {
        loadRoom();
        loadMessages();
    }, []);

    useEffect(() => {
        // Scroll to bottom when messages change
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            messageServiceCreate(id, { text: message })
                .then(res => {
                    if (res.data?.success) {
                        setMessages([...messages, res.data._doc]);
                        setMessage('');
                    }
                });

        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSendMessage(e);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Responsive Layout for Room Information and Chat Area */}
            <div className="flex flex-col lg:flex-row flex-grow">
                {/* Room Info Card */}
                <div className="lg:w-1/3 p-6 bg-white shadow-lg rounded-lg border border-gray-300 lg:rounded-r-none lg:border-r-0 lg:border-b lg:mb-0 mb-4 lg:sticky lg:top-0 flex flex-col items-center">
                    <img src={default_profile} alt="Perfil" className="w-24 h-24 rounded-full border border-gray-300 mb-4" />
                    <h1 className="text-base font-bold text-gray-800 mb-2">{room.name}</h1>
                    <h4 className="text-sm text-gray-600 mb-4">{room.description}</h4>
                    <button
                        onClick={btnJoin}
                        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200 ease-in-out"
                    >
                        Unirme
                    </button>
                </div>

                {/* Chat Area */}
                <div className="lg:flex-1 bg-white shadow-lg rounded-lg p-4">
                    <div className="flex flex-col h-96  mb-4 border border-gray-300 rounded-lg p-4">
                        <div className="flex flex-col overflow-y-auto space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.send_by._id === userId ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex items-start ${msg.send_by._id === userId ? 'bg-blue-100' : 'bg-gray-100'} p-3 rounded-lg shadow-md max-w-xs relative`}>
                                        {msg.send_by._id !== userId && (
                                            <img src={default_profile} alt="Perfil" className="w-8 h-8 rounded-full border border-gray-300 mr-3" />
                                        )}
                                        <div className="flex-1">
                                            <span className="text-sm font-medium text-gray-800">{msg.send_by.name}</span>
                                            <p className="text-sm text-gray-600">{msg.text}</p>
                                        </div>
                                        {msg.send_by._id === userId && (
                                            <img src={default_profile} alt="Perfil" className="w-8 h-8 rounded-full border border-gray-300 ml-3" />
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} /> {/* Scroll target */}
                        </div>
                    </div>
                    <form onSubmit={handleSendMessage} className="flex flex-col space-y-2 border-t border-gray-300 pt-2">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            onKeyDown={handleKeyDown} // Add keydown handler here
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200 ease-in-out"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Room;
