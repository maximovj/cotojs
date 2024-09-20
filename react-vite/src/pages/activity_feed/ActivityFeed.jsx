
import { useAuth } from "../../hooks/useAuth";
import SideProfile from '../../components/profile/SideProfile';
import SideMessages from '../../components/activity_feed/SideMessages';

const ActivityFeed = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-100">
            {/* Layout de dos columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna de perfil (izquierda) */}
                <SideProfile
                    user={user}
                    page={'activity_feed'}
                />

                {/* Columna de salas (derecha) */}
                <SideMessages
                    user={user}
                />
            </div>
        </div>
    );
}

export default ActivityFeed;