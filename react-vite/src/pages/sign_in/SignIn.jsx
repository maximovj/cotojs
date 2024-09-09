export function SignIn() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Acceder</h2>

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Ingrese tú correo electrónico"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Ingrese tú contraseña"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center">
                            {/*
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span> 
                            */}
                        </label>
                        <a href="#" className="text-sm text-blue-600 hover:underline">Olvidaste tú contraseña?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Acceder
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    No tienes cuenta? <a href="/register" className="text-blue-600 hover:underline">Registrarme</a>
                </p>
            </div>
        </div>
    );
}