import React, { useState } from 'react';
import FormLogin from './Components/FormLogin';
import FormCreate from './Components/FormCreate';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <img src="Logo.png" className="App-logo" alt="NeoLogo" style={{ width: '100px', height: '100px' }} />
        <div className="login-container">
          <img src="NEO.png" alt="NEO" style={{ width: '100px', height: '100px' }} />
          {showLoginForm ? (
            <FormLogin
              onSwitchToCreateAccount={() => setShowLoginForm(false)} // Agrega esta prop para cambiar al formulario de creación
            />
          ) : (
            <FormCreate
              onSwitchToLogin={() => setShowLoginForm(true)} // Agrega esta prop para cambiar al formulario de inicio de sesión
            />
          )}
        </div>
        {showLoginForm ? (
          <button className="custom-button" onClick={() => setShowLoginForm(false)}>
            Crear una cuenta
          </button>
        ) : (
          <button className="custom-button" onClick={() => setShowLoginForm(true)}>
            Iniciar Sesión
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
