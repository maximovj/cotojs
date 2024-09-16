
import { useAuth } from "../../hooks/useAuth";
import SideProfile from '../../components/profile/SideProfile';
import SideRooms from '../../components/profile/SideRooms';

function Profile() {
    const { user } = useAuth();

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-100">
            {/* Layout de dos columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna de perfil (izquierda) */}
                <SideProfile
                    user={user}
                    page={'profile'}
                />

                {/* Columna de salas (derecha) */}
                <SideRooms
                    user={user}
                />
            </div>
        </div>
    );
}

export default Profile;
