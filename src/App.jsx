import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import {Login} from './view/login/Login.jsx';
import Home from './view/home/Home.jsx';
import Navbar from './componentes/Navbar.jsx';
import CrearUsuario from './view/creadorUsuarios/CrearUsuario.jsx'; 
import CrearEvento from './view/crearEventos/CrearEvento.jsx'; 

function App() {
  

  return (
    <UserProvider>
        <Router>
        
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/crear-usuario" element={<CrearUsuario />} />
                        <Route path="/crear-evento" element={<CrearEvento />} />
                    </Routes>
                </div>
            
        </Router>
      </UserProvider>
  );
}

export default App
