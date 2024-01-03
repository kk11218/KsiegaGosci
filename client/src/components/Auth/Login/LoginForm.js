import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import UserDashboard from '../../Dashboard/UserDashboard';
import AdminDashboard from '../../Dashboard/AdminDashboard';

const LoginForm = ({ loggedInUser, setLoggedInUser }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    passwords: '',
  });

  const [loginMessage, setLoginMessage] = useState('');
  const history = useHistory();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', loginData);
      console.log(response.data.message);

      setLoginMessage('Login successful!');
      setLoggedInUser(response.data.user);

      // Przekieruj do odpowiedniej ścieżki po zalogowaniu
      if (response.data.user.role === '0') {
        history.push('/user-home');
      } else if (response.data.user.role === '1') {
        history.push('/admin-home');
      }
    } catch (error) {
      console.error('Login failed', error);
      setLoginMessage('Login failed. Please try again.');
    }
  };

  return (
    <div>
      {loggedInUser ? (
        loggedInUser.role === '0' ? (
          <UserDashboard />
        ) : (
          <AdminDashboard />
        )
      ) : (
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleInputChange} required />
          <label>Password:</label>
          <input type="password" name="passwords" onChange={handleInputChange} required />
          <button type="submit">Login</button>

          {loginMessage && <div style={{ marginTop: '10px', color: 'green' }}>{loginMessage}</div>}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
