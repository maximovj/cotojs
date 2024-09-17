/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { roomServiceFind, roomServiceJoin, roomServiceLeave } from '../../services/roomService.js';
import { messageServiceCreate, messageServiceFind } from '../../services/messageService.js';
import socketService from '../../services/socketService.js';
import ChatWindow from '../../components/room/ChatWindow';
import Sidebar from '../../components/room/Sidebar';

const Room = () => {
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState({});
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState('');
    const [iAmMember, setIAmMember] = useState(false);
    const { id } = useParams();
    const showToast = useToast();
    const messagesEndRef = useRef(null);

    // Función para cargar la información de la sala
    const loadRoom = () => {
        roomServiceFind(id)
            .then(res => {
                if (res.data?.success) {
                    handleJoinRoom(res.data._doc, res.data.user_id);
                }
            })
            .catch(err => showToast(err.message, 'error'));
    };

    const handleJoinRoom = (roomData, currentUserId) => {
        showToast(roomData.ctx_content, 'success');
        socketService.emit('join_room', roomData);
        setUserId(currentUserId);
        setRoom(roomData);

        const isMember = roomData.members.some(x => x.id === currentUserId);
        if (isMember) {
            setIAmMember(true);
        } else {
            showToast('Tú no eres miembro aún, unite para conversar.', 'error');
        }
    };

    // Cargar los mensajes de la sala
    const loadMessages = () => {
        messageServiceFind(id)
            .then(res => {
                if (res.data?.success) {
                    setMessages(prevMessages => [...prevMessages, ...res.data._doc]);
                    setUserId(res.data.user_id);
                }
            });
    };

    // Unirse a la sala
    const handleJoinMeRoom = () => {
        roomServiceJoin(id)
            .then(res => {
                if (res.data?.success) {
                    setIAmMember(true);
                    showToast(res.data?.ctx_content, 'success');
                }
            });
    };

    // Abandonar la sala 
    const handleLeaveRoom = () => {
        roomServiceLeave(id)
            .then((res) => {
                if (res.data?.success) {
                    setIAmMember(false);
                    showToast(res.data?.ctx_content, 'success');
                }
            });
    }

    // Enviar mensaje
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!iAmMember) {
            showToast('Aún no eres miembro, únete para conversar.', 'error');
            return;
        }
        if (message.trim()) {
            messageServiceCreate(id, { text: message })
                .then(res => {
                    if (res.data?.success) {
                        setMessage('');
                        socketService.emit('message_sended', res.data._doc);
                    }
                });
        }
    };

    useEffect(() => {
        loadRoom();
        loadMessages();

        socketService.on('on_messages', arg => {
            setMessages(prevMessages => [...prevMessages, arg]);
        });

        return () => {
            socketService.off('on_messages');
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col lg:flex-row flex-grow p-4 gap-4">
            <Sidebar
                room={room}
                iAmMember={iAmMember}
                handleJoinMeRoom={handleJoinMeRoom}
                handleLeaveRoom={handleLeaveRoom}
                className="lg:order-1 order-2" // Sidebar primero en dispositivos pequeños
            />
            <ChatWindow
                messages={messages}
                userId={userId}
                message={message}
                setMessage={setMessage}
                handleSendMessage={handleSendMessage}
                handleKeyDown={(e) => e.key === 'Enter' && e.shiftKey === false && handleSendMessage(e)}
                messagesEndRef={messagesEndRef}
                iAmMember={iAmMember}
                className="lg:order-2 order-1" // ChatWindow segundo en dispositivos pequeños
            />
        </div>
    );
};

export default Room;
