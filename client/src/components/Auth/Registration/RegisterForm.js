// client/src/components/RegisterForm.js
import React, { useState } from 'react';
import api from '../services/api';

const RegisterForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        last_name: '',
        passwords: '',
        email: '',
    });

    const [registrationMessage, setRegistrationMessage] = useState('');

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', userData);
            console.log(response.data.message);

            // Ustaw komunikat o sukcesie rejestracji
            setRegistrationMessage('Registration successful!');
        } catch (error) {
            console.error('Registration failed', error);

            // Ustaw komunikat o błędzie rejestracji
            setRegistrationMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" onChange={handleInputChange} required />
                <label>Last Name:</label>
                <input type="text" name="last_name" onChange={handleInputChange} required />
                <label>Password:</label>
                <input type="password" name="passwords" onChange={handleInputChange} required />
                <label>Email:</label>
                <input type="email" name="email" onChange={handleInputChange} required />
                <button type="submit">Register</button>
            </form>

            {/* Wyświetl komunikat o rejestracji, jeśli istnieje */}
            {registrationMessage && (
                <div style={{ marginTop: '10px', color: 'green' }}>{registrationMessage}</div>
            )}
        </div>
    );
};

export default RegisterForm;
