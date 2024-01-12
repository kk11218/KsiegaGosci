import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import './LeftMenu.css';

const LeftMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);
  return (
    <div className="left-menu-container">
      <div className="logo-container">
        <img id='Icon-0' src="/assets/icons/icon-0.svg" alt="Icon 1" /> 
        <img id='Frame' src="/assets/icons/Frame.svg" alt="Icon 2" />
      </div>
      <div className='left-menu-menu'>
        <div className='top-menu-items-container'>
          <NavLink to={"/products"} className={`left-menu-menu-item ${currentPath === "/products" || currentPath.startsWith("/products/edit/")? "active-link": ""}`}>
            <div className="left-menu-menu-icon"><img src="/assets/icons/book-open-check.svg" alt="Icon 1" /></div>
            <div className="left-menu-menu-text">Twoje produkty</div>
          </NavLink>
          <NavLink to={"/products/add"} className={`left-menu-menu-item ${currentPath === "/products/add" ? "active-link" : ""}`}>
            <div className="left-menu-menu-icon"><img src="/assets/icons/plus-circle.svg" alt="Icon 1" /></div>
            <div className="left-menu-menu-text">Zamów nowy produkt</div>
          </NavLink>
          <NavLink to={"/settings"} className={`left-menu-menu-item ${currentPath === "/settings" ? "active-link" : ""}`}>
            <div className="left-menu-menu-icon"><img src="/assets/icons/settings.svg" alt="Icon 1" /></div>
            <div className="left-menu-menu-text">Ustawienia konta</div>
          </NavLink>
        </div>
        <div className="bottom-menu-items-container">
          <NavLink to={"/products"}  className= "left-menu-menu-item">
            <div className="left-menu-menu-icon"><img src="/assets/icons/book-open-check.svg" alt="Icon 1" /></div>
            <div className="left-menu-menu-text">Zgłoś błąd</div>
          </NavLink>
          <NavLink  to={"/products"}  className= "left-menu-menu-item">
            <div className="left-menu-menu-icon"><img src="/assets/icons/book-open-check.svg" alt="Icon 1" /></div>
            <div className="left-menu-menu-text">Pomoc techniczna</div>
          </NavLink>
          <div onClick={logout} className= "left-menu-menu-item">
            <div className="left-menu-menu-icon"><img src="/assets/icons/log-out.svg" alt="Icon 1" /></div>
            <div  className="left-menu-menu-text">Wyloguj się</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
