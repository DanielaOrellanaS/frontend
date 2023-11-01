import React from 'react';

  function FormLogin({ username, password, setUsername, setPassword }) {
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    return (
      <div className="form-group custom-form">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="custom-input"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="custom-input"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
    );
  }

  export default FormLogin;