import { Link } from 'react-router-dom';
import errorImage from '../../assets/globo.png';

const Error404 = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-6'>
            {/* Imagen o Ilustración */}
            <img 
                src={errorImage} 
                alt='Error 404 - Página no encontrada' 
                className='h-64 w-64 mb-8 object-cover'
            />

            {/* Texto de Error */}
            <h2 className='text-2xl font-semibold text-gray-700 mb-2'>Oops! Página no encontrada</h2>
            <p className='text-lg text-gray-500 mb-8 text-center max-w-md'>
                La página que estás buscando no existe o ha sido movida. Verifica la URL o regresa a la página principal.
            </p>

            {/* Botón para volver a la página de inicio */}
            <Link to='/' className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300'>
                Regresar al inicio
            </Link>
        </div>
    );
};

export default Error404;
