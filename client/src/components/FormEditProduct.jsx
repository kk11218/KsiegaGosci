import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QRCode from 'react-qr-code';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import "./FormEditProduct.css"

const FormEditProduct = () => {
  const [brideName, setBrideName] = useState("");
  const [brideLastName, setBrideLastName] = useState("");
  const [groomName, setGroomName] = useState("");
  const [groomLastName, setGroomLastName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [bookActivity, setBookActivity] = useState("");
  const [pin, setPin] = useState("");
  const [specialCode, setSpecialCode] = useState("");
  const [currentqr, setCurrentQR] = useState("");
  const [newqr, setNewQR] = useState("");
  const [currentqrPersonalPage, setCurrentQRPersonalPage] = useState("");
  const [newqrPersonalPage, setNewQRPersonalPage] = useState("");
  const [specialCodePersonalPage, setSpecialCodePersonalPage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);

        setBrideName(response.data.bride_name);
        setBrideLastName(response.data.last_name_bride);
        setGroomName(response.data.groom_name);
        setGroomLastName(response.data.last_name_groom);
        setWeddingDate(new Date(response.data.wedding_date).toISOString().split('T')[0]); // Format daty do formatu "YYYY-MM-DD"
        setBookActivity(response.data.book_activity);
        setPin(response.data.pin);
        setCurrentQR(response.data.kod_qr);
        setCurrentQRPersonalPage(response.data.qr_personal_page);

      } catch (error) {
        if (error.response) {
          console.error(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);
  const updateProduct = async () => {
    try {
      const dataToUpdate = {
        bride_name: brideName,
        last_name_bride: brideLastName,
        groom_name: groomName,
        last_name_groom: groomLastName,
        wedding_date: weddingDate,
        book_activity: bookActivity,
        ...(pin && { pin }),  
        ...(newqr && { kod_qr: newqr }),  
        ...(newqrPersonalPage && { qr_personal_page: newqrPersonalPage }),  
      };
  
      await axios.patch(`http://localhost:5000/products/${id}`, dataToUpdate);
  
      console.log("Product updated successfully");
      if (newqr) {
        setCurrentQR(newqr);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const updateqr_personal_page = async () => {//aktualizacja drugiego qr
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, {
        qr_personal_page: newqrPersonalPage
      });
      console.log("Product updated successfully");
      setCurrentQRPersonalPage(newqrPersonalPage);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBlur = () => {
    updateProduct();
  };

  const [activeSection, setActiveSection] = useState("basic-information");

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };
  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setPin(value);
    }
  };

  const generateRandomCode = (length) => { //generowanie kodu
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  };
  
  const generateSpecialCode = () => {
    const randomCode = generateRandomCode(10); // Zmiana 10 na dowolną długość kodu
    setSpecialCode(randomCode);
    setNewQR(`https://ksiegagosci.pl/${brideName}i${groomName}/${randomCode}`);
    
  };
  const generateSpecialCodeForPersonalPage = () => {
    const randomCode = generateRandomCode(40);
    setSpecialCodePersonalPage(randomCode); 
    setNewQRPersonalPage(`https://ksiegagosci.pl/page/${brideName}i${groomName}/${randomCode}`);
  };

  const handleSaveAndRegenerateClick = () => {
    generateSpecialCode();
  };
  const handleSaveAndRegeneratePersonalPageClick = () => {
    generateSpecialCodeForPersonalPage();
  };
  
  useEffect(() => {
    if (newqr !== "") {
      updateProduct();
    }
  }, [newqr]);

  useEffect(() => {
    if (newqrPersonalPage !== "") {
      updateqr_personal_page();
    }
  }, [newqrPersonalPage]);

  const handleDownloadQRCode = (containerId) => { //Pobieranie QR
    const qrCodeContainer = document.getElementById(containerId);
    const scale = 10; 
    const options = {
      width: qrCodeContainer.offsetWidth * scale,
      height: qrCodeContainer.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      },
    };
    domtoimage.toBlob(qrCodeContainer, options)
      .then(blob => {
        let fileName;
        if (containerId === 'qr-code-container') {
          fileName = `Kod QR do Księgi Gości: ${brideName} i ${groomName}.png`;
        } else if (containerId === 'qr-code-container-personal-page') {
          fileName = `Kod QR do Osobistej Strony: ${brideName} i ${groomName}.png`;
        }
        if (fileName) {
          saveAs(blob, fileName);
        } else {
          console.error("Unsupported containerId");
        }
      });
  };

  return (
    <div>
      <div className="title-edit">Księga gości: {brideName} i {groomName}</div>
      <div className="menubar" >
        <div className={`menubar-item ${activeSection === "basic-information" ? "active-menubar-item" : ""}`} onClick={() => handleMenuClick("basic-information")}>
          <div className="file" > Podstawowe informacje </div>
        </div>
        <div className={`menubar-item ${activeSection === "style-management" ? "active-menubar-item" : ""}`} onClick={() => handleMenuClick("style-management")}>
          <div className="file" >Zarządzanie stylem </div>
        </div>
        <div className={`menubar-item ${activeSection === "QR" ? "active-menubar-item" : ""}`} onClick={() => handleMenuClick("QR")}>
          <div className="file" >Kod QR i grafiki </div>
        </div>
      </div>
      {activeSection === "basic-information" && (
          <div className="basic-information">
          {/* Sekcja Dane Panny Młodej */}
          <div className="dane-mlodej-container">
            <div className="info-header">Dane Panny Młodej</div>
            <div className="info-section">
              <div className="info-column">
                <div className="info-label">Imię Panny Młodej</div>
                <input className="info-input" value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              onBlur={handleBlur} />
              </div>
              <div className="info-column">
                <div className="info-label">Nazwisko Panny Młodej</div>
                <input className="info-input" value={brideLastName} onChange={(e) => setBrideLastName(e.target.value)}
              onBlur={handleBlur} />
              </div>
            </div>
          </div>
          {/* Sekcja Dane Pana Młodego */}
          <div className="dane-mlodej-container">
            <div className="info-header">Dane Pana Młodego</div>
            <div className="info-section">
              <div className="info-column">
                <div className="info-label">Imię Pana Młodego</div>
                <input className="info-input" value={groomName} onChange={(e) => setGroomName(e.target.value)}
              onBlur={handleBlur} />
              </div>
              <div className="info-column">
                <div className="info-label">Nazwisko Pana Młodego</div>
                <input className="info-input" value={groomLastName} onChange={(e) => setGroomLastName(e.target.value)}
              onBlur={handleBlur} />
              </div>
            </div>
          </div>
          {/* Sekcja Dane Wesela */}
          <div className="dane-mlodej-container">
            <div className="info-header">Dane Wesela</div>
            <div className="info-section">
              <div className="info-column">
                <div className="info-label">Data wesela</div>
                <input type="date" className="info-input" value={weddingDate}   onChange={(e) => setWeddingDate(e.target.value)}
        onBlur={handleBlur}/>
              </div>
              <div className="info-column">
                <div className="info-label">Ilość dni aktywności księgi</div>
                <select className="select-field info-input-select" id="dropdownField" value={bookActivity} onChange={(e) => setBookActivity(e.target.value)}
        onBlur={handleBlur}>
                  <option value="1">1 dzień - dzień wesela</option>
                  <option value="2">2 dni - dzień wesela, dzień po</option>
                  <option value="3">3 dni - dzień przed, dzień wesela, dzień po</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
       {activeSection === "style-management" && (
      <div className="style-management">
        <div className="select-product" >
  	      <div className="inside" >
    		    <div className="image-template" ></div>
    		    <div className="frame-35" >
      			  <div className="frame-7" >
        				<div className="chakra-elem" >Chakra Elem </div>
        				<div className="checkbox" >
          				<div className="frame-37" >
          				</div>
        				</div>
      			  </div>
      			  <div className="frame-36" >
        				<div className="navigation-menu-content-item" >
          				<div className="frame-72" >
            				<div className="rodzaj-wzoru" >Rodzaj wzoru </div>
            					<div className="zdj-cia-wideo" >Zdjęcia + Wideo </div>
          				</div>
        				</div>
        				<div className="navigation-menu-content-item" >
          				<div className="frame-72" >
            				<div className="opis-wzoru" >Opis wzoru </div>
            					<div className="description" > Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus metus pretium, convallis tellus in, tincidunt diam. Cras aliquet ac nisi sit amet rutrum. Phasellus diam justo, tincidunt pulvinar elementum ac, vulputate a velit. 
                      </div>
          					</div>
        				  </div>
      			    </div>
      			    <div className="button" >
        				  <div className="cancel" >Podgląd wzoru </div>
      			    </div>
    		      </div>
  	        </div>
          </div>
          <div className="product" >
            <div className="frame-6" >
              <div className="frame-34" >
                <img className="image-3" src="image-30.png" />
              </div>
              <div className="frame-35" >
                <div className="frame-7" >
                  <div className="chakra-elem" >Chakra Elem </div>
                  <div className="checkbox" >
                    <div className="frame-37" ></div>
                  </div>
                </div>
                <div className="frame-36" >
                  <div className="navigation-menu-content-item" >
                    <div className="frame-72" >
                      <div className="rodzaj-wzoru" >Rodzaj wzoru </div>
                      <div className="zdj-cia-wideo" >Zdjęcia + Wideo </div>
                    </div>
                  </div>
                  <div className="navigation-menu-content-item" >
                    <div className="frame-72" >
                      <div className="opis-wzoru" > Opis wzoru </div>
                      <div className="lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-nam-cursus-metus-pretium-convallis-tellus-in-tincidunt-diam-cras-aliquet-ac-nisi-sit-amet-rutrum-phasellus-diam-justo-tincidunt-pulvinar-elementum-ac-vulputate-a-velit" >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus metus pretium, convallis tellus in, tincidunt diam. Cras aliquet ac nisi sit amet rutrum. Phasellus diam justo, tincidunt pulvinar elementum ac, vulputate a velit. </div>
                    </div>
                  </div>
                </div>
                <div className="button" >
                  <div className="cancel" >Podgląd wzoru </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      {activeSection === "QR" && (
        <div className="QR">
          <div className="dane-mlodej-container" >
            <div className="info-header">Dane dostępowe
            </div>
              <div className="info-section">
                <div className="info-column">
                  <div className="info-label">PIN dostępowy do Księgi Gości</div>
                  <input className="PIN-info-input" value={pin} onChange={handlePinChange}/>
                </div>
                <div className="info-column"></div>
              </div>
              <div className="buttons" >
                <div className="PIN-button" onClick={updateProduct}>
                  <div className="cancel" >Zapisz </div>
                </div>
              </div>
          </div>
          <div className="card-QR" >
            <div id="qr-code-container">
              <QRCode className="qrimage" value={currentqr} />
            </div>
            <div className="QR-Content">
              <div className="info-header">Kod QR do Księgi Gości</div>
              <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus metus pretium, convallis tellus in, tincidunt diam. Cras aliquet ac nisi sit amet rutrum. Phasellus diam justo, tincidunt pulvinar elementum ac, vulputate a velit.</div>
              <div className="qr-info-column">
                  <div className="info-label">Adres URL dla Księgi Gości</div>
                  <input className="URL-info-input" value={currentqr} readOnly/>
                </div>
              <div className="qr-buttons">
                <div className="qr-button" onClick={handleSaveAndRegenerateClick}>Zapisz i generuj ponownie</div>
                <div className="qr-button">Wyślij ponownie grafikę</div>
                <div className="qr-button" onClick={() => handleDownloadQRCode('qr-code-container')}>Pobierz kod QR</div>
              </div>
            </div>
          </div>
          <div className="card-QR" >
          <div id="qr-code-container-personal-page">
          <QRCode className="qrimage" value={currentqrPersonalPage} />
        </div>
            <div className="QR-Content">
              <div className="info-header">Kod QR dla osobistej strony www</div>
              <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus metus pretium, convallis tellus in, tincidunt diam. Cras aliquet ac nisi sit amet rutrum. Phasellus diam justo, tincidunt pulvinar elementum ac, vulputate a velit.</div>
              <div className="qr-info-column">
                  <div className="info-label">Adres URL dla osobistej strony www</div>
                  <input className="URL-info-input" value={currentqrPersonalPage} readOnly/>
                </div>
              <div className="qr-buttons">
                <div className="qr-button" onClick={handleSaveAndRegeneratePersonalPageClick}>Zapisz i generuj ponownie</div>
                <div className="qr-button" onClick={() => handleDownloadQRCode('qr-code-container-personal-page')}>Pobierz kod QR</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormEditProduct;
