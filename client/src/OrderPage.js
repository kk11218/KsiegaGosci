import './OrderPage.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar'; 
import { Link } from 'react-router-dom';

function OrderPage() {
  const [weddingDate, setWeddingDate] = useState(new Date());
  const [brideData, setBrideData] = useState({});
  const [groomData, setGroomData] = useState({});
  const [paymentData, setPaymentData] = useState({});

  
  const handleBrideDataChange = (e) => {
    setBrideData({
      ...brideData,
      [e.target.name]: e.target.value,
    });
  };


  const handleGroomDataChange = (e) => {
    setGroomData({
      ...groomData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handlePaymentDataChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  

  return (
    <div style={{ display: 'flex' }}>
      {}
      <div className="left-menu-container">
        <div className="logo-container">
          {}
        </div>
        <div className="menu">
          <div className="top-menu-items-container">
            <Link to="/order" className="menu-item">
              <div className="menu-icon">
                <div className="menu-icon-bar"></div>
              </div>
              <div className="menu-text">Zamów Nowy Produkt</div>
            </Link>
            {}
          </div>
        </div>
      </div>

      {}
      <div>
        <h1>Zamów Nowy Produkt</h1>

        <h2>Wprowadź dane Panny Młodej</h2>
        <form>
          <label>
            Imię Panny Młodej:
            <input type="text" name="brideName" onChange={handleBrideDataChange} />
          </label>
          <label>
            Nazwisko Panny Młodej:
            <input type="text" name="brideLastName" onChange={handleBrideDataChange} />
          </label>
          {}
        </form>

        <h2>Wprowadź dane Pana Młodego</h2>
        <form>
          <label>
            Imię Pana Młodego:
            <input type="text" name="groomName" onChange={handleGroomDataChange} />
          </label>
          <label>
            Nazwisko Pana Młodego:
            <input type="text" name="groomLastName" onChange={handleGroomDataChange} />
          </label>
          {}
        </form>

        <h2>Wybierz datę wesela</h2>
        <Calendar onChange={setWeddingDate} value={weddingDate} />

        {}

        <h2>Wprowadź dane do płatności</h2>
        <form>
          <label>
            Suma do zapłaty:
            <input type="text" name="sumToPay" onChange={handlePaymentDataChange} />
          </label>
          <label>
            Nazwa Firmy (opcjonalne):
            <input type="text" name="companyName" onChange={handlePaymentDataChange} />
          </label>
          {}
        </form>
      </div>
    </div>
  );
}

export default OrderPage;
