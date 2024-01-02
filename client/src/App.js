
import React from 'react';
import RegisterForm from './components/Auth/Registration/RegisterForm';
import LoginForm from './components/Auth/Login/LoginForm'; 

function App() {
  return (
    <div className="App">
      <h1>Rejestracja i Logowanie</h1>
      <div>
        <h2>Registration Form</h2>
        <RegisterForm />
      </div>
      <div>
        <h2>Login Form</h2>
        <LoginForm /> {}
      </div>
    </div>
  );
}

export default App;
