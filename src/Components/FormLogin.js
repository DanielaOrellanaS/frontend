import React from 'react';

function FormLogin() {
  return (
    <div className="form-group custom-form">
      <input type="email" id="email" name="email" placeholder="Email" className="custom-input" />
      <input type="password" id="password" name="password" placeholder="Password" className="custom-input" />
    </div>
  );
}

export default FormLogin;
