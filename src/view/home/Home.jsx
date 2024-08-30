import React, { useEffect, useContext, useState } from 'react';
import axios from '../../config/axiosConfig';
import { UserContext } from '../../context/UserContext';

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            const decodedToken = JSON.parse(decodeURIComponent(escape(atob(token.split('.')[1]))));
            setUser({
                role: decodedToken.role,
                nombre: decodedToken.nombre,
                apellido: decodedToken.apellido
            });
        }

        axios.get('http://localhost:8080/api/eventos', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.error('Error al obtener eventos:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [setUser]);

    if (loading) {
        return <div>Cargando eventos...</div>;
    }

    return (
        <>
            <h1>Bienvenido al Panel de Control, {user.nombre} {user.apellido}</h1>
            <div>
                {user.role === 'Administrador' ? (
                    <div>
                        <h2>Acciones de Administrador</h2>
                        <button>Eventos</button>
                    </div>
                ) : (
                    <div>
                        <h2>Eventos</h2>
                        <ul>
                            {events.length > 0 ? (
                                events.map(event => (
                                    <li key={event.id}>{event.nombre}</li>
                                ))
                            ) : (
                                <li>No hay eventos disponibles</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;