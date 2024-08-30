import React, { useState } from 'react';
import axios from '../../config/axiosConfig'; // Asegúrate de que la ruta sea correcta para tu configuración de Axios
import './CrearEvento.css'; // Opcional, para estilizar el formulario

const CrearEvento = () => {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/eventos', {
                nombre,
                fecha,
                ubicacion,
                descripcion
            });
            setMensaje('Evento creado con éxito');
        } catch (error) {
            console.error('Error al crear el evento:', error);
            setMensaje('Hubo un problema al crear el evento.');
        }
    };

    return (
        <div className="crear-evento-container">
            <h1>Crear Evento</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre del Evento:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fecha">Fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ubicacion">Ubicación:</label>
                    <input
                        type="text"
                        id="ubicacion"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Crear Evento</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default CrearEvento;
