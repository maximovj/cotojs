import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSweetAlert } from '../../hooks/useSweetAlert';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';
import routes from '../../routes/routes.js';
import '../../bubbles.css';
import default_picture_user from '../../assets/usuario_256.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { showSweetAlert } = useSweetAlert();
    const showToast = useToast();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'email') {
            setEmail(value);
        } else
            if (name === 'password') {
                setPassword(value);
            }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            showSweetAlert({
                icon: 'info',
                title: 'Iniciar sesión',
                html: 'Todos los campos son obligatorios.',
                showConfirmButton: true,
            });
            return;
        }

        setEmail('');
        setPassword('');
        login({ email, password });
    }


    return (
        <div className='relative flex flex-col items-center justify-center min-h-screen p-6 space-y-12'>
            {/* Fondo de Burbujas */}
            <div className='bubbles'>
                <div className='bubble bubble1' style={{ left: '20%', top: '20%' }}></div>
                <div className='bubble bubble2' style={{ left: '80%', top: '60%' }}></div>
                <div className='bubble bubble3' style={{ left: '15%', top: '75%' }}></div>
                <div className='bubble bubble4' style={{ left: '80%', top: '20%' }}></div>
                <div className='bubble bubble5' style={{ left: '75%', top: '75%' }}></div>
                <div className='bubble bubble6' style={{ left: '10%', top: '50%' }}></div>
                <div className='bubble bubble7' style={{ left: '10%', top: '35%' }}></div>
                <div className='bubble bubble8' style={{ left: '70%', top: '35%' }}></div>
                <div className='bubble bubble9' style={{ left: '83%', top: '80%' }}></div>
                <div className='bubble bubble10' style={{ left: '13%', top: '65%' }}></div>
            </div>

            {/* Sección Visual */}
            <div className='flex flex-wrap justify-center gap-6 mb-12'>
                <img
                    src={default_picture_user}
                    alt='Usuario'
                    className='h-44 w-44 object-cover rounded-full shadow-lg transform transition duration-300 hover:scale-110'
                />
            </div>

            {/* Contenedor Principal */}
            <div className='flex flex-col md:flex-row items-start justify-center w-full space-y-8 md:space-y-0 md:space-x-8'>

                {/* Formulario de Inicio de Sesión */}
                <div className='bg-white p-8 max-w-lg w-full shadow-md rounded-lg'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-4'>Iniciar sesión</h2>
                    <form onSubmit={handleOnSubmit} className='flex flex-col space-y-4'>
                        <input
                            type='email'
                            placeholder='Correo electrónico'
                            value={email}
                            name='email'
                            onChange={handleInput}
                            className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                        <input
                            type='password'
                            placeholder='Contraseña'
                            name='password'
                            value={password}
                            onChange={handleInput}
                            className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                        <button className='bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 text-lg'>
                            Iniciar sesión
                        </button>
                    </form>

                    <p className='text-xs text-gray-400 mt-8'>
                        ¿No tienes una cuenta? <Link to={routes.Home} className='text-blue-600 underline'>Regístrate aquí</Link>.
                    </p>
                </div>
            </div>

            {/* Llamada a la Acción */}
            <div className='text-center mb-8'>
                <p className='text-sm text-gray-500 mb-4'>¡Bienvenido de nuevo! Estamos felices de verte.</p>
                <button className='bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition duration-200'>
                    Explora ahora
                </button>
            </div>
        </div>
    );
}

export default Login;