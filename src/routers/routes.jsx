import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Routes, Route } from "react-router-dom";
import { Home, ProtectedRoute, UserAuth, Configuracion, Categorias, Movimientos, Informes, Dashboard, Importaciones } from "../index";

export function MyRoutes() {
  const { user } = UserAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuracion />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/movimientos" element={<Movimientos />} />
        <Route path="/informes" element={<Informes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/acercade" element={<Informes />} />
        <Route path="/importaciones" element={<Importaciones/>} />

      </Route>
    </Routes>
  );
}

function Login() {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí ciframos la contraseña antes de enviarla al servidor
    CryptoJS.AES.encrypt(password, 'tuClaveSecreta');
    // Luego puedes enviar el resultado al servidor
  };

  return (
    <div>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
}
