import React, { useState } from 'react';
import './App.css';
import FormLogin from './Components/FormLogin'; 
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://tradinapi.azurewebsites.net/authapi/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Almacenar el token de acceso en el almacenamiento local o en el estado de la aplicación
        localStorage.setItem('accessToken', data.key);
        navigate('/accounts');
      } else {
        // Manejar el caso en que el inicio de sesión falla
        console.error('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="Logo.png" className="App-logo" alt="NeoLogo" style={{ width: '100px', height: '100px' }} />
        <div className="login-container">
          <img src="NEO.png" alt="NEO" style={{ width: '100px', height: '100px' }} />
          <FormLogin
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
        <br/>
        <button className="custom-button" onClick={handleLogin}>
          Iniciar Sesion
        </button>
        <button className="custom-button">
          Crear una cuenta
        </button>
      </header>
    </div>
  );
}

export default App;