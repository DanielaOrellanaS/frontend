import React from 'react';
import './App.css';
import FormLogin from './Components/FormLogin'; 
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate(); 
  const redirectToAccounts = () => {
    navigate('/accounts');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="Logo.png" className="App-logo" alt="NeoLogo" style={{ width: '100px', height: '100px' }} />
        <div className="login-container">
          <img src="NEO.png" alt="NEO" style={{ width: '100px', height: '100px' }} />
          <FormLogin />
        </div>
        <button className="custom-button" onClick={redirectToAccounts}>
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
