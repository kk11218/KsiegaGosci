import React from "react";
import { Link } from "react-router-dom";

import './GuestBook.css';


const GuestBook = ({ data, productId }) => {

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateObject = new Date(dateString);
    const day = dateObject.toLocaleDateString('en-GB', { day: '2-digit' });
    const month = dateObject.toLocaleDateString('en-GB', { month: '2-digit' });
    const year = dateObject.toLocaleDateString('en-GB', { year: 'numeric' });

    return `${day}.${month}.${year}`;
  };

  return (
    <div>
      <div className="guestbook-container">
        <div className="guestbook-content">
          <div id="image" className="image-container">
             <img src="./assets/Rectangle4.png" alt="Placeholder Image" /> 
          </div>
          <div className="guestbook-content-container">
            <div className="dane-produktu">
              <div className="guestbook-title-container">
                <div className="guestbook-title">Księga gości</div>
                <div className="guestbook-subtitle">
                  {`${data.person.bride_name} i ${data.person.groom_name}`}
                </div>
              </div>
              <div className="guestbook-info-item">
                <div className="guestbook-label">Data ślubu</div>
                <div id="weedingDate" className="guestbook-value">
                  {formatDate(data.person.wedding_date)}
                </div>
              </div>
              <div className="guestbook-info-item">
                <div className="guestbook-label">Wybrany wzór</div>
                <div id="template" className="guestbook-value">
                  {data.template.title}
                </div>
              </div>
            </div>
            <Link to={`/products/edit/${productId}`} className="guestbook-button-container">
              <div className="guestbook-icon">
                <img id="Icon-0" src="/assets/icons/edit.svg" alt="Icon 1"/>
              </div>
              <div className="guestbook-button-text">Zarządzaj</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestBook;
