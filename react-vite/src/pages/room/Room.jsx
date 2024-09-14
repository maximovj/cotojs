import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { roomServiceFind, roomServiceJoin } from '../../services/roomService.js';
/*
const useQueryParams = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    return {
        get: (key) => query.get(key),
    };
};
*/

/*
   const location = useLocation();
   const query = new URLSearchParams(location.search);
   const id = query.get('id');
*/

const Room = () => {

    const [room, setRoom] = useState({});
    const showToast = useToast();
    const { id } = useParams();

    const loadRoom = () => {
        roomServiceFind(id)
            .then(res => {
                if (res.data?.success) {
                    showToast(res.data.ctx_content, 'success');
                    setRoom({
                        ...res.data._doc,
                    })
                }
            })
            .catch(err => {
                showToast(err.message, 'error');
            });
    }

    const btnJoin = () => {
        roomServiceJoin(id)
            .then(res => {
                if (res.data?.success) {
                    showToast(res.data?.ctx_content, 'success');
                }
            })
            .catch(err => {
                showToast(err.message, 'error');
            });
    }

    useState(() => {
        loadRoom();
    }, []);

    return (<div>
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
            <h4 className="text-xl text-gray-700 mb-6">{room.description}</h4>
            <button
                onClick={btnJoin}
                className="bg-blue-500 text-white rounded-lg text-sm p-3 cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out shadow-md hover:shadow-lg"
            >
                Unirme
            </button>
        </div>
    </div>);
}

export default Room;