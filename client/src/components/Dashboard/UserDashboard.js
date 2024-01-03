import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LeftMenu from './LeftMenu/LeftMenu';
import GuestBooksList from '../GuestBooks/GuestBooksList';
import OrderBook from '../OrderBook/OrderBook';
import AccountSettings from '../AccountSettings/AccountSettings';
import '../../App.css';
import ReportError from '../ReportError/ReportError';
import Support from '../Support/Support';

const App = () => {
  return (
    <Router>
      <div className="app">
        <LeftMenu />
        <div className="main-content">
          <Switch>
            <Route path="/produkty" element={<GuestBooksList />} />
            <Route path="/nowy-produkt" element={<OrderBook />} />
            <Route path="/ustawienia-konta" element={<AccountSettings />} />
            <Route path="/zglos-blad" element={<ReportError />} />
            <Route path="/pomoc-techniczna" element={<Support />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
