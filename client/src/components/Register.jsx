import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import axios from "axios";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const role = "user";
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
  
    const saveUser = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:5000/register", {
          name: `${firstName} ${lastName}`, // Łączenie Imienia i Nazwiska
          email: email,
          password: password,
          role: role,
        });
        navigate("/");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

  return (
    <div>
        <div className="logowanie-rejestracja">
            <div className="login-content">
                <div className="login-wrapper">
                    <div className="frame-35">
                        <div className="logo-transparent">
                            <img id='Icon-x' src="/assets/icons/icon-0.svg" alt="Icon 1" />
                            <img id='Framex' src="/assets/icons/Frame.svg" alt="Icon 2" />
                        </div>
                    </div>
                <div className="logowanie">Rejestracja</div>
                <div className="wpisz-dane-logowania-lub-zaloguj-si-z-google">Wpisz odpowiednie dane.
            </div>
                <form className='local-login' onSubmit={saveUser}>
                    <div className="login-input">
                        <div className="login-email">Imię</div>
                        <div className="input-with-button">
                            <div className="login-default">
                                <input className='login-field' type="text"  value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="login-input">
                        <div className="login-email">Nazwisko</div>
                        <div className="input-with-button">
                            <div className="login-default">
                                <input className='login-field' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="login-input">
                        <div className="login-email">Adres e-mail</div>
                        <div className="input-with-button">
                            <div className="login-default">
                                <input className='login-field' type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                        <div className="login-input">
                            <div className="login-email">Hasło</div>
                            <div className="input-with-button">
                                <div className="login-default">
                                    <input className='login-field' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="login-buttons">
                            <button className='login-continue login-button' type="submit">Utwórz konto</button>
                        </div>
                </form>
                <Link to="/" className="login-cancel login-button2">Zaloguj się</Link>
            </div>
        </div>
        <div className="login-image">
            <img src="/assets/image1.png" alt="Background Image" />
        </div>
    </div>
</div>
  );
};

export default Register;
