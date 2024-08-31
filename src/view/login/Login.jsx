import React, { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig'; // Ruta a tu configuración de Axios
import './Login.css';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const [showEmailLogin, setShowEmailLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [sessionTimeout, setSessionTimeout] = useState(null);
    const navigate = useNavigate();

    const handleEmailLoginClick = () => {
        setShowEmailLogin(true);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('/auth/generatetoken', { username: email, password: password });
            const token = response.data.token;

            // Guarda el token en sessionStorage
            sessionStorage.setItem('authToken', token);
         

            // Configura la renovación del token
            scheduleTokenRenewal(token);


            // Redirigir al Home
            navigate('/home');


        } catch (error) {
            setError('Error en el inicio de sesión. Verifica tus credenciales.');
            console.error('Error en el inicio de sesión:', error);
        }
    };

    const scheduleTokenRenewal = (token) => {
        // Decodifica el token para obtener la fecha de expiración
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = tokenPayload.exp * 1000 - Date.now();

        // Configura un temporizador para renovar el token antes de que expire
        const timeout = setTimeout(async () => {
            try {
                const response = await axios.post('/refresh', { token });
                const newToken = response.data.token;

                // Guarda el nuevo token en sessionStorage
                sessionStorage.setItem('authToken', newToken);

                // Vuelve a configurar la renovación
                scheduleTokenRenewal(newToken);
            } catch (error) {
                console.error('Error al renovar el token:', error);
                setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                sessionStorage.removeItem('authToken');
            }
        }, expirationTime - 60000); // Renovar un minuto antes de la expiración

        setSessionTimeout(timeout);
    };

    useEffect(() => {
        return () => {
            // Limpiar el temporizador si el componente se desmonta
            if (sessionTimeout) {
                clearTimeout(sessionTimeout);
            }
        };
    }, [sessionTimeout]);

    return (
        <div className="login-container">
            <div className="register-section">
                <h2>Registrarse</h2>
                <input type="text" placeholder="Nombre" />
                <input type="email" placeholder="Correo" />
                <input type="password" placeholder="Contraseña" />
                <input type="password" placeholder="Confirma contraseña" />
                <button>REGISTRARSE</button>
            </div>
            <div className="login-section">
                <h2>Iniciar Sesión</h2>
                {!showEmailLogin ? (
                    <>
                        <button className="social-login fb">Acceder con Facebook</button>
                        <button className="social-login twitter">Acceder con Twitter</button>
                        <button className="social-login email" onClick={handleEmailLoginClick}>
                            Acceder con Correo
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            id='email'
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            id='password'
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="error">{error}</p>}
                        <button onClick={handleLogin}>Iniciar Sesión</button>
                    </>
                )}
            </div>
        </div>
    );
};  