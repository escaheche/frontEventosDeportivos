// src/config/axiosConfig.js

import axios from 'axios';

// Configurar la URL base para las solicitudes
axios.defaults.baseURL = 'http://localhost:8080/api';

// Configurar el encabezado común para las solicitudes
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Exportar Axios por si necesitas personalizarlo en otros lugares
export default axios;
