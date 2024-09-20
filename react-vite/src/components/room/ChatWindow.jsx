/* eslint-disable react/prop-types */
import MessageItem from '../../components/room/MessageItem';

// Componente para la ventana de chat
const ChatWindow = ({ messages, userId, message, setMessage, handleSendMessage, handleKeyDown, messagesEndRef, iAmMember }) => (
    <div className='lg:flex-1 bg-white shadow-lg rounded-lg  lg:p-4 flex flex-col border border-gray-300'>
        <div className='flex flex-col h-96 lg:h-screen mb-4 border border-gray-300 rounded-lg lg:p-4 '>
            <div className='flex flex-col overflow-y-auto lg:h-full space-y-4'>
                {messages.map((msg, index) => (
                    <MessageItem key={index} msg={msg} userId={userId} />
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
        {iAmMember && (
            <form onSubmit={handleSendMessage} className='flex flex-row border-t border-gray-300 pt-2 mt-auto'>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Escribe un mensaje...'
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg resize-none text-xs focus:outline-none focus:ring-2 focus:ring-blue-500'
                    rows='3'
                    onKeyDown={handleKeyDown}
                />
                <button
                    type='submit'
                    className='bg-blue-500 text-white rounded-lg px-4 py-2 text-xs ml-2 hover:bg-blue-600 transition duration-200 ease-in-out'
                >
                    Enviar
                </button>
            </form>
        )}
    </div>
);

export default ChatWindow;