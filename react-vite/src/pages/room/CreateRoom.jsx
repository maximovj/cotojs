
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { roomServiceCreate } from '../../services/roomService.js';
import { staticServiceChangeCover } from '../../services/staticService.js';
import { useSweetAlert } from '../../hooks/useSweetAlert';
import { useToast } from '../../hooks/useToast';
import default_cover from '../../assets/default_cover.png';
const baseURL = import.meta.env.VITE_API_URL;

const CreateRoom = () => {
    const [cover, setCover] = useState(null);
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const { showSweetAlert } = useSweetAlert();
    const showToast = useToast();
    const navigate = useNavigate();

    const handleOnChangeInput = (e) => {
        const input_name = e.target.name;
        const input_value = e.target.value;
        // Establecer valores
        if (input_name === 'cover') {
            const file = e.target.files[0];
            handleSetCover(file);
        } else if (input_name === 'name') {
            setName(input_value);
        } else if (input_name === 'description') {
            setDescription(input_value);
        }
    }

    const handleSetCover = (file) => {
        // Imágenes con formato válidos 
        const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        //  Verificar formato
        if (imgTypes.includes(file.type)) {
            setCover(file);
            setPreview(URL.createObjectURL(file));
        } else {
            showSweetAlert({
                icon: 'info',
                title: 'Sala',
                html: 'Seleccione una imagen (.jpeg, .jpg, .png) válido, por favor.',
                showConfirmButton: true,
            });
        }
    }

    const handleBtnCreate = () => {
        if (!description || !name) {
            showSweetAlert({
                icon: 'info',
                title: 'Sala',
                html: 'Todos los campos son obligatorios.',
                showConfirmButton: true,
            });
        } else {
            roomServiceCreate({ name, description })
                .then((res) => {
                    if (res.data?.success) {
                        showToast('Enviando petición', 'success');
                        if (cover) {
                            const form_data = new FormData();
                            form_data.append('cover', cover);
                            staticServiceChangeCover(res.data._doc._id, form_data)
                                .then(() => {
                                    setTimeout(() => { navigate('/profile'); }, 1000);
                                    //setTimeout(() => { navigate('/room/' + res.data._doc._id); }, 1000);
                                });
                        } else {
                            setTimeout(() => { navigate('/profile'); }, 1000);
                            //setTimeout(() => { navigate('/room/' + res.data._doc._id); }, 1000);
                        }
                    }
                });
        }
    }

    return (<>
        <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
            {/* Encabezado */}
            <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-6">
                <Link to={`/profile`} className="text-blue-600 hover:underline flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 text-center flex-1">Nueva sala</h1>
            </div>

            {/* Portada */}
            <div className="relative mb-6">
                <img
                    src={preview || default_cover}
                    alt="Cover"
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                />
                <label className="absolute bottom-4 left-4 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-200">
                    <input
                        type="file"
                        name="cover"
                        id="cover"
                        onChange={handleOnChangeInput}
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
                        onClick={handleBtnCreate}
                        className="border bg-green-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-green-600 text-sm">
                        Crear sala
                    </button>
                </div>
            </div>

            {/* Información de la sala */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="space-y-4">
                    {/* Nombre de la sala */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-semibold text-gray-800">Nombre de la sala</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleOnChangeInput}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="description" className="block text-lg font-semibold text-gray-800">Descripción</label>
                        <textarea
                            rows="12"
                            name="description"
                            id="description"
                            value={description}
                            onChange={handleOnChangeInput}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default CreateRoom;