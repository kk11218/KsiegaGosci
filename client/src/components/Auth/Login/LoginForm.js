// client/src/components/Auth/Login/LoginForm.js
import React, { useState } from 'react';
import api from '../../../services/api';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    passwords: '',
  });

  const [loginMessage, setLoginMessage] = useState('');

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', loginData);
      console.log(response.data.message);

      // Ustaw komunikat o sukcesie logowania
      setLoginMessage('Login successful!');
    } catch (error) {
      console.error('Login failed', error);

      // Ustaw komunikat o błędzie logowania
      setLoginMessage('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleInputChange} required />
        <label>Password:</label>
        <input type="password" name="passwords" onChange={handleInputChange} required />
        <button type="submit">Login</button>
      </form>

      {/* Wyświetl komunikat o logowaniu, jeśli istnieje */}
      {loginMessage && <div style={{ marginTop: '10px', color: 'green' }}>{loginMessage}</div>}
    </div>
  );
};

export default LoginForm;
