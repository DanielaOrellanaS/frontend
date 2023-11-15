import React, { useState } from 'react';
import '../App.css';
import { createAccount } from '../Api'; 

function FormCreate() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 

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
      setSuccessMessage(''); 
      return;
    }

    try {
      await createAccount(username, password, email);
      setError(''); 
      setSuccessMessage('Usuario creado con éxito'); 
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
      setError('Error al crear la cuenta. Inténtalo de nuevo.');
      setSuccessMessage(''); 
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
      {successMessage && <div className="success-message">{successMessage}</div>} 
      <button className="custom-button" onClick={handleCreateAccount}>
        Crear
      </button>
    </div>
  );
}

export default FormCreate;
