import React from "react";
import LeftMenu from "../components/LeftMenu";
import "./Loyaut.css";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      
      <div className="layout-container" >
        <div className="layout-left-menu">
          <LeftMenu />
        </div>
                  
        <div className="layout-main">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
