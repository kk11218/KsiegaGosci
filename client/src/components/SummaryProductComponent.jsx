import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SummaryProduct.css"

const SummaryProduct = ({
    brideName,
    brideLastName,
    groomName,
    groomLastName,
    weddingDate,
    activityDays,
    email,
    //buyerName,
    isCompanyPurchase,
    companyName,
    nip,
    city,
    postalCode,
    street,
    buildingNumber,
  }) => {
    const navigate = useNavigate();
    const payOnline = async () => {
        try {
          const paymentData = {
            address: `${city || street || buildingNumber} ${postalCode} ${email}`,
            sum_product: 300, 
            company_name: companyName,
            nip: nip,
            payment_type: "online", 
          };
    
          await axios.post("http://localhost:5000/products", {
            persons: {
              last_name_bride: brideLastName,
              bride_name: brideName,
              last_name_groom: groomLastName,
              groom_name: groomName,
              wedding_date: weddingDate,
            },
            template: 1,
            kod_qr: 'https://ksiegagosci.pl/',
            qr_personal_page: 'https://ksiegagosci.pl/',
            pin: 1234,
            book_activity: activityDays,
            paymentData: paymentData,
          });
    
          
          navigate("/products"); //mozna tu przekierować użytkownika na strone z potwierdzeniem
        } catch (error) {
          console.error("Błąd podczas płatności online:", error);
        }
      };

  return (
    <div className="summary-content">
            <div className="summary-header">
                <div className="podsumowanie">Podsumowanie</div>
                <div className="ks-gosci">Księga gości</div>
            </div>
            <div className="summary-item">
                <div className="ks-gosci">Dane Panny Młodej</div>
                <div className="dane">{brideName || brideLastName ? `${brideName} ${brideLastName}` : "____________"}</div>
            </div>  
            <div className="summary-item">
                <div className="ks-gosci">Dane Pana Młodego</div>
                <div className="dane">{groomName || groomLastName ? `${groomName} ${groomLastName}`  : "____________"}</div>
            </div>     
            <div className="summary-item">
                <div className="ks-gosci">Data wesela</div>
                <div className="dane">{weddingDate || "____________"}</div>
            </div> 
            <div className="summary-item">
                <div className="ks-gosci">Wybrany wzór</div>
                <div className="selected-template">
                    <img className="image-template" src="/assets/Image3.png" alt="Image" />
                    <div className="template-data">
                        <div className="name-template">Chakra Elem</div>
                        <div className="wzor">Rodzaj wzoru</div>
                        <div className="dane">Zdjęcia + Wideo</div>
                    </div>
                </div>
            </div>   
            <div className="summary-item">
                <div className="ks-gosci">Adres</div>
                <div className="dane">{city || street || buildingNumber ? `${city} ${street} ${buildingNumber}` : "____________"}<br/>{postalCode || "____________"}</div>
            </div>   
            {isCompanyPurchase && ( 
            <div className="summary-item">
                <div className="ks-gosci">Faktura</div>
                <div className="dane">{companyName || "____________"}<br/>{nip || "____________"}</div>
            </div> )}
            <div className="summary-item-price">
                <div className="title-cena" >Cena </div>
                <div className="price" >300 zł </div>
            </div>
            <div className="summary-buttons">
                <div className="pay-button">
                    <img className="image-przelewy24" src="/assets/Przelewy24.png" />
                    <div className="tekst" onClick={payOnline}>Zapłać online </div> 
                </div>
                <div className="book-preview">Podgląd księgi</div>
            </div> 
    </div>
  ); //TRZEBA ZROBIC ABY nie dodawały sie puste wartości po naciśnięciu przycisku Zaplać online
};

export default SummaryProduct;
