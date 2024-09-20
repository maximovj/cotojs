import { useState } from 'react';
import { useSweetAlert } from '../hooks/useSweetAlert';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { authServiceRegister } from '../services/authService.js';
import '../bubbles.css';

const Home = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { showSweetAlert } = useSweetAlert();
    const { login } = useAuth();
    const showToast = useToast();

    const handleInput = ({ target: {name , value} }) => {
        setUser({
            ...user,
            [name] : value,
        });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(!user.name || !user.email || !user.password)
        {
            showSweetAlert({
                icon: 'info',
                title: 'Registarse',
                html: 'Todos los campos son obligatorios.',
                showConfirmButton: true, 
            });
            return;
        }

        authServiceRegister(user)
        .then((res) => {
            if(res.data?.success){
                showToast(res.data?.ctx_content, 'success');
                setTimeout(() => { login(user); }, 1000);
                setUser({
                    name: '',
                    email: '',
                    password: '',
                });
            }
        }).catch((err) => {
            if(!err.response?.data?.success){
                showSweetAlert({
                    icon: 'error',
                    title: 'Registarse',
                    html: err.response?.data?.ctx_content,
                    showConfirmButton: true, 
                });
            }else {
                showSweetAlert({
                    icon: 'error',
                    title: 'Registarse',
                    html: err.message,
                    showConfirmButton: true, 
                });
            }
        });
    }

    return (
        <div className='relative flex flex-col items-center justify-center min-h-screen p-6 space-y-12'>
            <div className='bubbles'>
                <div className='bubble bubble1'></div>
                <div className='bubble bubble2'></div>
                <div className='bubble bubble3'></div>
                <div className='bubble bubble4'></div>
                <div className='bubble bubble5'></div>
                <div className='bubble bubble6'></div>
                <div className='bubble bubble7'></div>
                <div className='bubble bubble8'></div>
                <div className='bubble bubble9'></div>
                <div className='bubble bubble10'></div>
            </div>

            <div className='flex flex-col md:flex-row items-start justify-center w-full space-y-8 md:space-y-0 md:space-x-8'>
                {/* Sección de Bienvenida */}
                <div className='bg-white p-8 max-w-lg w-full flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6'>
                    <div className=''>
                        <h1 className='text-4xl font-bold text-gray-800 mb-8'>¡Bienvenido a CotoJS!</h1>
                        <p className='text-md text-gray-600 mb-4'>
                            Conéctate, crea grupos de conversación y comparte tus ideas con personas afines. Aquí encontrarás un espacio seguro y acogedor para interactuar y crecer.
                        </p>
                        <p className='text-sm text-gray-500 mb-2'>
                            Únete a una comunidad diversa donde puedes aprender, compartir y colaborar. Nos enfocamos en fomentar el diálogo constructivo y el intercambio de ideas.
                        </p>
                        <p className='text-sm text-gray-500 mb-2'>
                            Ya sea que estés buscando amigos, colegas o simplemente un lugar para expresarte, CotoJS es el lugar ideal para ti.
                        </p>
                    </div>
                </div>

                {/* Formulario de Registro a la Derecha */}
                <div className='bg-white p-8 max-w-lg w-full shadow-md rounded-lg'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-4'>Registrarse</h2>
                    <form onSubmit={handleOnSubmit} className='flex flex-col space-y-4 mb-32'>
                        <input
                            type='text'
                            placeholder='Nombre'
                            name='name'
                            value={user.name}
                            onChange={handleInput}
                            className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                        <input
                            type='email'
                            placeholder='Correo electrónico'
                            name='email'
                            value={user.email}
                            onChange={handleInput}
                            className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                        <input
                            type='password'
                            placeholder='Contraseña'
                            name='password'
                            value={user.password}
                            onChange={handleInput}
                            className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                        <button className='bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-200 text-lg'>
                            Crear cuenta
                        </button>
                    </form>
                    <p className='text-xs text-gray-400 mt-8'>
                        ¿Ya tienes una cuenta? <a href='/login' className='text-blue-600 underline'>Inicia sesión aquí</a>.
                    </p>
                </div>
            </div>

            {/* Llamada a la Acción */}
            <div className='text-center mb-8'>
                <p className='text-sm text-gray-500 mb-4'>¡Explora y únete a nuestra comunidad!</p>
                <button className='bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-200'>
                    Comienza Ahora
                </button>
            </div>
        </div>
    );
}

export default Home;
