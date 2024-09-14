import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { roomServiceCreate, roomServiceList } from '../../services/roomService.js';

export function Create() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const showToast = useToast();

    const loadRooms = () => {
        roomServiceList()
            .then(res => {
                setRooms(res.data._doc);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        loadRooms();
    }, []);

    const handleOnSubmitForm = (e) => {
        e.preventDefault();

        if (!name.trim() || !description.trim()) {
            showToast('Todos los campos son obligatorios.', 'error');
            return;
        }

        roomServiceCreate({
            name: name.trim(),
            description: description.trim(),
        })
            .then(res => {
                if (res.data?.success) {
                    showToast(res.data?.ctx_content, 'success');
                    setName('');
                    setDescription('');
                    setRooms([
                        ...rooms,
                        res.data._doc,
                    ]);
                    navigate('/');
                }
            })
            .catch(err => {
                showToast(err.message, 'error');
            });
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-4 text-center text-gray-800'>Crear Sala</h2>
                <form onSubmit={handleOnSubmitForm}>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-medium mb-2' htmlFor='name'>
                            Nombre de la sala
                        </label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Ingrese un nombre de la sala'
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-medium mb-2' htmlFor='description'>
                            Descripción
                        </label>
                        <input
                            type='text'
                            name='description'
                            id='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Ingrese una descripción para la sala'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full py-2 px-4 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                        Crear sala
                    </button>
                </form>
            </div>
        </div>
    );
}