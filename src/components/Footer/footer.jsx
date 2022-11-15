import React from "react";
import "./footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="static-left">
        <div className="content-left">
          <div className="footer-item">
            <i>Terms & conditions</i>
          </div>
          <div className="footer-item">
            <i>Privacy Policy</i>
          </div>

          <div className="footer-item">
            <span className="link">
              Copyright © Yootok
              {` ${year}`}
            </span>
          </div>
        </div>
      </div>
      <div className="static-right">
        <div className="content-right">
          <div className="need-help">Need help?</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
