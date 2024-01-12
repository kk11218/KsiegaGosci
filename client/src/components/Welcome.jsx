import React from "react";
import { useSelector } from "react-redux";
import "./Settings.css"

const AccountSettings = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="title">Ustawienia konta użytkownika: <strong>{user && user.name}</strong></h1>
      
      
      <div className="setting-menubar" >
          <div className="setting-menubar-item1" >
            <div className="setting-file" >Twoje dane </div>
          </div>
          <div className="setting-menubar-item" >
            <div className="setting-file" > Płatności </div>
          </div>
          <div className="setting-menubar-item" >
            <div className="setting--file" >Opcja </div>
          </div>
          <div className="setting-menubar-item" >
            <div className="setting-file" >Opcja </div>
          </div>
      </div>
    </div>
  );
};

export default AccountSettings;
