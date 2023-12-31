import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LeftMenu.css';

const LeftMenu = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [activeBottomMenuItem, setActiveBottomMenuItem] = useState(null);

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
    setActiveBottomMenuItem(null); // Zresetuj stan dla elementów bottom-menu
  };

  const handleBottomMenuItemClick = (index) => {
    setActiveMenuItem(null); // Zresetuj stan dla elementów top-menu
    setActiveBottomMenuItem(index);
  };

  return (
    <div className="left-menu-container">
      <div className="logo-container">
        <img id='Icon-0' src="/assets/icons/icon-0.svg" alt="Icon 1" /> 
        <img id='Frame' src="/assets/icons/Frame.svg" alt="Icon 2" />
      </div>
      <div className='menu'>
        <div className='top-menu-items-container'>
          <Link to="/produkty" className={`menu-item ${activeMenuItem === 0 ? 'active-link' : ''}`} onClick={() => handleMenuItemClick(0)}>
            <div className="menu-icon"><img src="/assets/icons/book-open-check.svg" alt="Icon 1" /></div>
            <div className="menu-text">Twoje produkty</div>
          </Link>
          <Link to="/nowy-produkt" className={`menu-item ${activeMenuItem === 1 ? 'active-link' : ''}`} onClick={() => handleMenuItemClick(1)}>
            <div className="menu-icon"><img src="/assets/icons/plus-circle.svg" alt="Icon 1" /></div>
            <div className="menu-text">Zamów nowy produkt</div>
          </Link>
          <Link to="/ustawienia-konta" className={`menu-item ${activeMenuItem === 2 ? 'active-link' : ''}`} onClick={() => handleMenuItemClick(2)}>
            <div className="menu-icon"><img src="/assets/icons/settings.svg" alt="Icon 1" /></div>
            <div className="menu-text">Ustawienia konta</div>
          </Link>
        </div>
      



      <div className="bottom-menu-items-container">
        <Link to="/zglos-blad" className={`menu-item ${activeBottomMenuItem === 0 ? 'active-link' : ''}`} onClick={() => handleBottomMenuItemClick(0)}>
          <div className="menu-icon"><img src="/assets/icons/book-open-check.svg" alt="Icon 1" /></div>
          <div className="menu-text">Zgłoś błąd</div>
        </Link>
        <Link to="/pomoc-techniczna" className={`menu-item ${activeBottomMenuItem === 1 ? 'active-link' : ''}`} onClick={() => handleBottomMenuItemClick(1)}>
          <div className="menu-icon"><img src="/assets/icons/book-open-check.svg" alt="Icon 1" /></div>
          <div className="menu-text">Pomoc techniczna</div>
        </Link>
        <div className={`menu-item ${activeBottomMenuItem === 2 ? 'active-link' : ''}`} onClick={() => handleBottomMenuItemClick(2)}>
          <div className="menu-icon"><img src="/assets/icons/log-out.svg" alt="Icon 1" /></div>
          <div className="menu-text">Wyloguj się</div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LeftMenu;
