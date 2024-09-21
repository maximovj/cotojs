import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDayjs } from '../../hooks/useDayjs';
import { useToast } from '../../hooks/useToast';
import { useSweetAlert } from '../../hooks/useSweetAlert';
import { userServiceUpdate, userServiceDelete } from '../../services/userService.js';
import { staticServiceChangePicture } from '../../services/staticService.js';
import routes from '../../routes/routes.js';
import default_picture from '../../assets/account.png';

// Página para editar o modificar información del usuario
const EditProfile = () => {
    const { showSweetAlert } = useSweetAlert();
    const { user, logout } = useAuth();
    const dayjs = useDayjs();
    const showToast = useToast();
    const [name, setName] = useState('');
    const [picture, setPicture] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleInputName = (e) => {
        setName(e.target.value);
    }

    const handleInputFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const typesImg = ['image/png', 'image/jpeg', 'image/jpg'];
            if (typesImg.includes(file.type)) {
                setPicture(file);
                setPreview(URL.createObjectURL(file));
            } else {
                showSweetAlert({
                    icon: 'info',
                    title: 'Perfil',
                    html: 'Selecciona una imagen válido, por favor',
                    showConfirmButton: true,
                });
                setPicture('');
                return;
            }

        }
    }

    const handleBtnActualizar = () => {
        if (!name) {
            showSweetAlert({
                icon: 'info',
                title: 'Perfil',
                html: 'Todos los campos son obligatorios.',
                showOkButton: true,
                showConfirmButton: true,
            });
            return;
        }

        userServiceUpdate({ name })
            .then(res => {
                if (res.data?.success) {
                    showToast(res.data.ctx_content, 'success');
                    if (picture) {
                        const form_data = new FormData();
                        form_data.append('picture', picture);
                        staticServiceChangePicture(user.id, form_data).then(() => {
                            setTimeout(() => { window.location.reload(); }, 1000);
                        });
                    } else {
                        setTimeout(() => { window.location.reload(); }, 1000);
                    }
                }
            });
    }

    const handleBtnEliminar = () => {
        showSweetAlert({
            title: `<small>Escribe <span class='highlight'>eliminar cuenta</span> para confirmar</small>`,
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
                if (res.value === 'eliminar cuenta') {
                    userServiceDelete().then(res => {
                        if (res.data?.success) {
                            logout();
                            showToast(res.data.ctx_content, 'success');
                        }
                    });
                } else {
                    showSweetAlert({
                        title: 'Perfil',
                        html: 'Escribe `eliminar cuenta` para confirmar, por favor.',
                        icon: 'info',
                        showOkButton: true,
                        showConfirmButton: true,
                    });
                }
            }

        });
    }

    useEffect(() => {
        setName(user.name);
    }, [user]);

    return (
        <div className='max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md'>
            {/* Encabezado */}
            <div className='flex items-center justify-between border-b border-gray-300 pb-4 mb-6'>
                <Link to={`${routes.Profile}`} className='text-blue-600 hover:underline flex items-center text-sm'>
                    <svg className='w-4 h-4 mr-2' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7' />
                    </svg>
                    Volver
                </Link>
                <h1 className='text-2xl font-bold text-gray-900 text-center flex-1'>Editar Perfil</h1>
            </div>

            {/* Imagen de perfil */}
            <div className='flex justify-center mb-6'>
                <div className='relative'>
                    <img
                        src={preview || `${routes.baseUrl}/${user.picture}` || default_picture}
                        alt='Profile'
                        className='w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg'
                        loading='lazy'
                    />
                    <label className='absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-lg cursor-pointer hover:bg-gray-200'>
                        <input
                            type='file'
                            className='sr-only'
                            accept='.jpg, .jpeg, .png'
                            name='picture'
                            id='picture'
                            onChange={handleInputFile}
                        />
                        <span className='text-xs text-gray-600'>Cambiar foto</span>
                    </label>
                </div>
            </div>

            {/* Botones de acción */}
            <div className='flex flex-row justify-between mb-6'>
                <div className='flex flex-row gap-2'>
                    <button
                        onClick={handleBtnActualizar}
                        className='border bg-green-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-green-600 text-sm'>
                        Actualizar
                    </button>
                    <button
                        onClick={handleBtnEliminar}
                        className='border bg-red-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-red-600 text-sm'>
                        Eliminar
                    </button>
                </div>
            </div>

            {/* Información del usuario */}
            <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
                <div className='space-y-4'>
                    {/* Información adicional */}
                    <div className='flex justify-between text-sm text-gray-500'>
                        <p className='text-sm text-gray-500 mt-1'>Miembro desde: {dayjs(user.createdAt).format('L')}</p>
                        <p className='text-sm text-blue-500 mt-1'>{dayjs(user.createdAt).fromNow()}</p>
                    </div>

                    {/* Nombre de usuario */}
                    <div>
                        <label htmlFor='name' className='block text-lg font-semibold text-gray-800'>Nombre de usuario</label>
                        <input
                            type='text'
                            value={name}
                            id='name'
                            name='name'
                            onChange={handleInputName}
                            className='w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
