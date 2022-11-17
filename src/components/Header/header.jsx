import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-container">
      <div></div>
      <div className="left-content">
        <div className="icon">
          <i className="fas  fa-briefcase" />
        </div>
        <BrowserRouter>
          <Link to="/home">
            <div className="name">AGENDA DETAILS</div>
          </Link>
        </BrowserRouter>
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
