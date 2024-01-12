import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FormEditProduct.css"
import "./AddProduct.css"
import SummaryPanel from "./SummaryProductComponent";

const FormAddProduct = () => {
  const [brideName, setBrideName] = useState("");
  const [brideLastName, setBrideLastName] = useState("");
  const [groomName, setGroomName] = useState("");
  const [groomLastName, setGroomLastName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [activityDays, setActivityDays] = useState(1);
  const [email, setEmail] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [isCompanyPurchase, setIsCompanyPurchase] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [nip, setNip] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");


  const handleCheckboxChange = () => {
    setIsCompanyPurchase(!isCompanyPurchase);
  };
  const [activeSection, setActiveSection] = useState("basic-information");

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div className="main-panel">
      <div className="title-edit">Zamów nowy produkt </div>
      <div className="reszta">
        <div className="dane">
          <div className="menubars" >
            <div className={`menubar-item ${activeSection === "basic-information" ? "active-menubar-item" : ""}`} onClick={() => handleMenuClick("basic-information")}>
              <div className="file" > Podstawowe informacje </div>
            </div>
            <div className={`menubar-item ${activeSection === "style-management" ? "active-menubar-item" : ""}`} onClick={() => handleMenuClick("style-management")}>
              <div className="file" >Zarządzanie stylem </div>
            </div>
          </div>
          {activeSection === "basic-information" && (
           <div className="basic-information">
           <div className="dane-mlodej-container">
             <div className="info-header">Dane Panny Młodej</div>
             <div className="info-section">
               <div className="info-column">
                 <div className="info-label">Imię Panny Młodej</div>
                 <input className="info-input" value={brideName} onChange={(e) => setBrideName(e.target.value)} />
               </div>
               <div className="info-column">
                 <div className="info-label">Nazwisko Panny Młodej</div>
                 <input className="info-input" value={brideLastName} onChange={(e) => setBrideLastName(e.target.value)} />
               </div>
             </div>
           </div>
           {/* Sekcja Dane Pana Młodego */}
           <div className="dane-mlodej-container">
             <div className="info-header">Dane Pana Młodego</div>
             <div className="info-section">
               <div className="info-column">
                 <div className="info-label">Imię Pana Młodego</div>
                 <input className="info-input" value={groomName} onChange={(e) => setGroomName(e.target.value)} />
               </div>
               <div className="info-column">
                 <div className="info-label">Nazwisko Pana Młodego</div>
                 <input className="info-input" value={groomLastName} onChange={(e) => setGroomLastName(e.target.value)} />
               </div>
             </div>
           </div>
           {/* Sekcja Dane Wesela */}
           <div className="dane-mlodej-container">
             <div className="info-header">Dane Wesela</div>
             <div className="info-section">
               <div className="info-column">
                 <div className="info-label">Data wesela</div>
                 <input type="date" className="info-input" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} />
               </div>
               <div className="info-column">
                 <div className="info-label">Ilość dni aktywności księgi</div>
                 <select
                   className="select-field info-input-select"
                   id="dropdownField"
                   value={activityDays}
                   onChange={(e) => setActivityDays(e.target.value)}
                 >
                   <option value="1">1 dzień - dzień wesela</option>
                   <option value="2">2 dni - dzień wesela, dzień po</option>
                   <option value="3">3 dni - dzień przed, dzień wesela, dzień po</option>
                 </select>
               </div>
             </div>
           </div>
           {/* Sekcja Dane do płatności */}
           <div className="dane-mlodej-container">
             <div className="info-header">Dane do płatności</div>
             <div className="info-section">
               <div className="info-column">
                 <div className="info-label">Adres e-mail do zamówienia</div>
                 <input className="info-input" value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className="info-column">
                 <div className="info-label">Imię i nazwisko kupującego</div>
                 <input className="info-input" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} />
               </div>
             </div>
             <div className="info-section">
               <input type="checkbox" checked={isCompanyPurchase} onChange={handleCheckboxChange} />
               <div className="info-label">Kupno na firmę</div>
             </div>
             <div className="info-section">
               <div className="info-column">
                 <div className="info-label">Nazwa firmy</div>
                 <input className="info-input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} disabled={!isCompanyPurchase} />
               </div>
               <div className="info-column">
                 <div className="info-label">NIP</div>
                 <input className="info-input" value={nip} onChange={(e) => setNip(e.target.value)} disabled={!isCompanyPurchase} />
               </div>
             </div>
             <div className="info-section">
               <div className="info-column">
                 <div className="info-label">Miejscowość</div>
                 <input className="info-input" value={city} onChange={(e) => setCity(e.target.value)} />
               </div>
               <div className="info-column">
                 <div className="info-label">Kod pocztowy</div>
                 <input className="info-input" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
               </div>
             </div>
             <div className="info-section">
               <div className="info-column">
                 <div className="info-label">Ulica</div>
                 <input className="info-input" value={street} onChange={(e) => setStreet(e.target.value)} />
               </div>
               <div className="info-column">
                 <div className="info-label">Numer budynku</div>
                 <input className="info-input" value={buildingNumber} onChange={(e) => setBuildingNumber(e.target.value)} />
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
        {activeSection === "style-management" && (

          <div></div>

        )}
        
          <div className="summary-panel">
          <SummaryPanel
              brideName={brideName}
              brideLastName={brideLastName}
              groomName={groomName}
              groomLastName={groomLastName}
              weddingDate={weddingDate}
              activityDays={activityDays}
              email={email}
              buyerName={buyerName}
              isCompanyPurchase={isCompanyPurchase}
              companyName={companyName}
              nip={nip}
              city={city}
              postalCode={postalCode}
              street={street}
              buildingNumber={buildingNumber}
            />
          </div>
        
      </div>
  </div>
  );
};

export default FormAddProduct;
