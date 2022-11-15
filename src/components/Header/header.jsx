import React from "react";
import "./header.scss";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-container">
      <div></div>
      <div className="left-content">
        <div className="icon">
          <i className="fas  fa-briefcase" />
        </div>
        <div className="name">AGENDA DETAILS</div>
      </div>
      {/* <div className="brand-center">
        <div className="icon">
          <i className="fa-solid fa-plus" />
        </div>
        <div className="name">ADD EVENT</div>
      </div> */}
    </nav>
  );
};

export default Header;
