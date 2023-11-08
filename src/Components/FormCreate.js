import React, { useState } from 'react';
import '../App.css';
import { createAccount } from '../Api'; // Importa la función createAccount

function FormCreate() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Nuevo estado para el mensaje de éxito

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCreateAccount = async () => {
    if (!username || !password || !email) {
      setError('Por favor, completa todos los campos.');
      setSuccessMessage(''); // Limpia el mensaje de éxito si hay un nuevo intento
      return;
    }

    try {
      // Enviar una solicitud para crear la cuenta
      await createAccount(username, password, email);
      setError(''); // Limpia el mensaje de error
      setSuccessMessage('Usuario creado con éxito'); // Muestra el mensaje de éxito
      // Puedes agregar aquí la redirección o cualquier otro comportamiento después de la creación exitosa
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
      setError('Error al crear la cuenta. Inténtalo de nuevo.');
      setSuccessMessage(''); // Limpia el mensaje de éxito en caso de error
    }
  };

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
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        className={`custom-input ${!email && 'required'}`}
        value={email}
        onChange={handleEmailChange}
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
      {successMessage && <div className="success-message">{successMessage}</div>} {/* Mostrar el mensaje de éxito */}
      <button className="custom-button" onClick={handleCreateAccount}>
        Crear
      </button>
    </div>
  );
}

export default FormCreate;
