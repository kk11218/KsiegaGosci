// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Zmiana Switch na Routes
import LeftMenu from './components/Dashboard/LeftMenu/LeftMenu';
import GuestBooksList from './components/GuestBooks/GuestBooksList';
import OrderBook from './components/OrderBook/OrderBook';
import AccountSettings from './components/AccountSettings/AccountSettings';
import './App.css';
import ReportError from './components/ReportError/ReportError';
import Support from './components/Support/Support';

const App = () => {
  return (
    <Router>
      <div className="app">
        <LeftMenu />
        <div className="main-content">
          <Routes>
            <Route path="/produkty" element={<GuestBooksList />} />
            <Route path="/nowy-produkt" element={<OrderBook />} />
            <Route path="/ustawienia-konta" element={<AccountSettings />} />
            <Route path="/zglos-blad" element={<ReportError />} />
            <Route path="/pomoc-techniczna" element={<Support />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
