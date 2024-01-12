import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess} = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/products");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    
    <div className="logowanie-rejestracja">
      <div className="login-content">
        <div className="login-wrapper">
          <div className="frame-35">
            <div className="logo-transparent">
              <img id='Icon-x' src="/assets/icons/icon-0.svg" alt="Icon 1" />
              <img id='Framex' src="/assets/icons/Frame.svg" alt="Icon 2" />
            </div>
          </div>
          <div className="logowanie">Logowanie</div>
          <div className="wpisz-dane-logowania-lub-zaloguj-si-z-google">
            Wpisz dane logowania lub zaloguj się z Google.
          </div>
              <form className='local-login' onSubmit={Auth}>
                <div className="login-input">
                  <div className="login-email">Adres e-mail</div>
                  <div className="input-with-button">
                    <div className="login-default">
                        <input className='login-field' type="email"   value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                  </div>
                </div>
                <div className="login-input">
                  <div className="login-email">Hasło</div>
                  <div className="input-with-button">
                    <div className="login-default">
                        <input className='login-field' type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="login-buttons">
                    <button className='login-continue login-button' type="submit">Zaloguj się</button>
                    <Link to="/register" className="login-cancel login-button2">Zarejestruj się</Link>
                </div>
              </form>
            
          <div className="login-divider">
            <div className="login-line-1"></div>
            <div className="login-lub">lub</div>
            <div className="login-line-2"></div>
          </div>
          <div className="login-buttons2">
            <div className="login-button3">
              <img src="/assets/icons/Google.svg" />
              <div className="zaloguj-si-z-google">Zaloguj się z Google</div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-image">
        <img src="/assets/image1.png" alt="Background Image" />
      </div>
    </div>
  );
};

export default Login;
