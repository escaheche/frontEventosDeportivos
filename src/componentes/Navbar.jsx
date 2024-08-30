import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';

const Navbar = () => {
    const { user } = useContext(UserContext);
    console.log(user.role);
    return (
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
                {user.role === 'Administrador' && (
                    <>
                        <li><Link to="/crear-usuario">Crear Usuario</Link></li>
                        <li><Link to="/crear-evento">Crear Evento</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;