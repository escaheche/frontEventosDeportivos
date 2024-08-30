import React, { useState } from 'react';
import axios from '../../config/axiosConfig'; // Asegúrate de que la ruta sea correcta para tu configuración de Axios
import './CrearUsuario.css'; // Opcional, para estilizar el formulario

const CrearUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [roleId, setRoleId] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/usuarios', {
                nombre,
                apellido,
                correoElectronico: correo,
                contrasena,
                roleId
            });
            setMensaje('Usuario creado con éxito');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            setMensaje('Hubo un problema al crear el usuario.');
        }
    };

    return (
        <div className="crear-usuario-container">
            <h1>Crear Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="apellido">Apellido:</label>
                    <input
                        type="text"
                        id="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="correo">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contrasena">Contraseña:</label>
                    <input
                        type="password"
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="roleId">Rol:</label>
                    <select
                        id="roleId"
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un rol</option>
                        <option value="1">Administrador</option>
                        <option value="2">Usuario</option>
                        {/* Agrega más roles según sea necesario */}
                    </select>
                </div>
                <button type="submit">Crear Usuario</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default CrearUsuario;
