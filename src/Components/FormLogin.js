import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import '../App.css';
import { getCsrfToken, login } from '../Api';

function FormLogin({ onSwitchToCreateAccount }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Obtiene la función de navegación

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const csrfToken = await getCsrfToken();
        setCsrfToken(csrfToken);
      } catch (error) {
        console.error('Error al obtener el token CSRF:', error);
      }
    }

    fetchCsrfToken();
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const accessToken = await login(username, password, csrfToken);
      localStorage.setItem('accessToken', accessToken);
      // Redirige al usuario a la página "Accounts" después del inicio de sesión exitoso
      navigate('/accounts');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Inténtalo de nuevo.');
    }
  }

  return (
    <div className="form-group custom-form">
      <input
        type="username"
        id="username"
        name="username"
        placeholder="Username"
        className={`custom-input ${!username && 'required'}`}
        value={username}
        onChange={handleUsernameChange}
        required
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        className={`custom-input ${!password && 'required'}`}
        value={password}
        onChange={handlePasswordChange}
        required
      />
      {error && <div className="error-message">{error}</div>}
      <button className="custom-button" onClick={handleLogin}>
        Iniciar Sesion
      </button>
    </div>
  );
}

export default FormLogin;
