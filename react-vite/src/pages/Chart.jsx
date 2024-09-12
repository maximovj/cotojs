import { useEffect, useState } from 'react';
import socketService from '../services/socketService.js';

const Chat = () => {
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socketService.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socketService.off('receiveMessage');
        };
    }, []);

    const joinRoom = () => {
        socketService.emit('joinRoom', room);
    };

    const leaveRoom = () => {
        socketService.emit('leaveRoom', room);
    };

    const sendMessage = () => {
        socketService.emit('sendMessage', { room, message });
        setMessage('');
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Chat en Sala</h2>
            <div className="mb-4">
                <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Nombre de la sala"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <div className="mt-2">
                    <button
                        onClick={joinRoom}
                        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Unirse a la sala
                    </button>
                    <button
                        onClick={leaveRoom}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Salir de la sala
                    </button>
                </div>
            </div>
            <div className="mb-4">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={sendMessage}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Enviar
                </button>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Mensajes</h3>
                <ul className="list-disc pl-5">
                    {messages.map((msg, index) => (
                        <li key={index} className="mb-2">{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Chat;
