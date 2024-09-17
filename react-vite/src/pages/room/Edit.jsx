/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { roomServiceFind } from "../../services/roomService";
import { roomServiceDelete, roomServiceUpdate } from '../../services/roomService.js';
import { staticServiceChangeCover } from '../../services/staticService.js';
import { useSweetAlert } from '../../hooks/useSweetAlert';
import { useDayjs } from '../../hooks/useDayjs';
import { useToast } from '../../hooks/useToast';
import Forbidden from '../../components/Forbidden';
import default_cover from '../../assets/image.png';
import default_user_thumbnail from '../../assets/account.png';
const members_length = 50;
const baseURL = import.meta.env.VITE_API_URL;

// Página para editar o modificar información de la sala
const Edit = () => {
    const [room, setRoom] = useState({
        cover: '',
        name: '',
        description: '',
        members: [],
    });
    const [cover, setCover] = useState(null);
    const [preview, setPreview] = useState(null);
    const { id } = useParams();
    const dayjs = useDayjs();
    const navigate = useNavigate();
    const showToast = useToast();
    const { showSweetAlert } = useSweetAlert();

    const loadRoom = () => {
        roomServiceFind(id)
            .then(res => {
                if (res.data?.success) {
                    setRoom(res.data._doc);
                    setPreview(null);
                }
            });
    };

    const handleFileFieldCover = (e) => {
        const file = e.target.files[0];

        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (validTypes.includes(file.type)) {
                // Si el archivo es válido, lo asignas
                setCover(file);
                setPreview(URL.createObjectURL(file));
            } else {
                showSweetAlert({
                    icon: 'info',
                    title: 'Formato no permitido',
                    html: 'Solo se permiten archivos .png, .jpeg y .jpg.',
                    showConfirmButton: true,
                });
                setCover('');
            }
        }
    };

    const handleInputField = (e) => {
        setRoom({
            ...room,
            [e.target.name]: e.target.value,
        });
    };

    const handleBtnActualizar = () => {
        roomServiceUpdate(id, room)
            .then(res => {
                if (res.data?.success) {
                    showToast(res.data.ctx_content, 'success');
                    if (cover) {
                        const data_media = new FormData();
                        data_media.append('cover', cover);
                        staticServiceChangeCover(id, data_media).then(() => {
                            setTimeout(() => { window.location.reload(); }, 1000);
                        });
                    } else {
                        setTimeout(() => { window.location.reload(); }, 1000);
                    }

                }
            });
    }

    const handleBtnEliminar = () => {
        showToast('Sala eliminado exitosamente.', 'success');
        showSweetAlert({
            title: `<small>Escribe <span class="highlight">eliminar</span> para confirmar</small>`,
            customClass: {
                title: 'sweetalert-title'
            },
            input: 'text',
            inputValue: '',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
        }).then(res => {
            if (res.isConfirmed) {
                if (res.value === 'eliminar') {
                    roomServiceDelete(id)
                        .then(res => {
                            if (res.data?.success) {
                                navigate('/profile');
                                showToast(res.data.ctx_content, 'success');
                            }
                        });
                } else {
                    showToast('Escribe `eliminar` para confirmar, por favor.', 'info');
                }
            }
        });
    }

    useEffect(() => {
        loadRoom();
    }, []);

    return (
        <Forbidden
            checkId={room.created_by}>
            <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
                {/* Encabezado */}
                <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-6">
                    <Link to={`/profile`} className="text-blue-600 hover:underline flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 text-center flex-1">Editar Sala</h1>
                </div>

                {/* Portada */}
                <div className="relative mb-6">
                    <img
                        src={preview || `${baseURL}/${room.cover}` || default_cover}
                        alt="Cover"
                        className="w-full h-48 object-cover rounded-lg"
                        loading="lazy"
                    />
                    <label className="absolute bottom-4 left-4 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-200">
                        <input
                            type="file"
                            name="cover"
                            id="cover"
                            onChange={handleFileFieldCover}
                            accept=".png, .jpeg, .jpg"
                            className="sr-only"
                        />
                        <span className="text-xs text-gray-600">Seleccionar portada</span>
                    </label>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-row justify-between mb-6">
                    <div className="flex flex-row gap-2">
                        <button
                            onClick={handleBtnActualizar}
                            className="border bg-green-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-green-600 text-sm">
                            Actualizar
                        </button>
                        <button
                            onClick={handleBtnEliminar}
                            className="border bg-red-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-red-600 text-sm">
                            Eliminar
                        </button>
                    </div>
                    <div>
                        <Link to={`/room/${room.id}`} className="border bg-gray-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-gray-600 text-sm">
                            Ver sala
                        </Link>
                    </div>
                </div>

                {/* Información de la sala */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <div className="space-y-4">
                        {/* Información adicional */}
                        <div className="text-sm text-gray-500">
                            Sala creada: {dayjs(room.createdAt).fromNow()}
                        </div>

                        {/* Nombre de la sala */}
                        <div>
                            <label htmlFor="name" className="block text-lg font-semibold text-gray-800">Nombre de la sala</label>
                            <input
                                type="text"
                                value={room.name}
                                id="name"
                                name="name"
                                onChange={handleInputField}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Descripción */}
                        <div>
                            <label htmlFor="description" className="block text-lg font-semibold text-gray-800">Descripción</label>
                            <textarea
                                name="description"
                                id="description"
                                value={room.description}
                                onChange={handleInputField}
                                rows="12"
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Lista de miembros */}
                <div className="w-full p-4 bg-white rounded-lg">
                    <h2 className="text-sm font-bold text-gray-800 mb-2">Miembros ({room.members?.length || 0})</h2>
                    <div className="flex flex-wrap justify-start">
                        {room.members && room.members.length > 0 ? (<>
                            {room.members.slice(0, members_length).map((member, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <img
                                        src={member.thumbnail ? `${baseURL}/${member.thumbnail}` : default_user_thumbnail}
                                        alt="Perfil"
                                        className="w-8 h-8 rounded-full border-2 border-white"
                                        loading="lazy"
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
        </Forbidden>);
};

export default Edit;
