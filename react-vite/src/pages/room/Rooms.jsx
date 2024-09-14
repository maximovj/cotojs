import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { roomServiceList } from '../../services/roomService.js';
import socketService from '../../services/socketService.js';

function Rooms() {
    const [rooms, setRooms] = useState([]);

    const loadRooms = () => {
        roomServiceList()
            .then(res => {
                setRooms(res.data._doc);
            });
    }

    useEffect(() => {
        socketService.on('on_rooms', (arg) => {
            loadRooms();
            setRooms((prevRooms) => [...prevRooms, arg]);
        });

        return () => {
            socketService.off('on_rooms');
        }
    }, []);

    useEffect(() => { loadRooms(); }, []);

    return (<div>
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rooms.map(item => (
                    <div key={item._id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <Link
                            to={`/room/${item._id}`}
                            className='bg-green-600 p-2 rounded-lg text-sm text-white hover:bg-green-700'>
                            Ver
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>);
}

export default Rooms;