import { useState } from "react";
import { authServiceRegister } from "../../services/authService";
import { useToast } from "../../hooks/useToast.js";

export function Register() {
    const showToast = useToast();
    const [register, setRegister] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputField = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value.trim(),
        });
    }

    const handleFormOnSubmit = async (e) => {
        e.preventDefault();

        if (!register.email.trim() || !register.name.trim() || !register.password.trim()) {
            alert('Todos los campos son obligatorios');
        }

        authServiceRegister(register)
            .then((res) => {
                if (res.data?.success) {
                    showToast(res.data.ctx_content, 'success');
                    setRegister({
                        name: '',
                        email: '',
                        password: '',
                    });
                }
            }).catch(err => {
                if (err.response?.data.ctx_content) {
                    const { ctx_content } = err.response.data;
                    showToast(ctx_content, 'error');
                }
            });
    }

    return (<>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Registrarme</h2>

                <form onSubmit={handleFormOnSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={register.name}
                            onChange={handleInputField}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Ingrese tú nombre completo"
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={register.email}
                            onChange={handleInputField}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Ingrese tú correo electrónico"
                            autoComplete="off"
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
                            value={register.password}
                            onChange={handleInputField}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Ingrese tú contraseña"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Registrarme
                    </button>
                </form>
            </div>
        </div>
    </>
    );
}
