import React from "react";
import Logo from "../images/DA - Logo - Inline-white.png";

const Footer = () => {
  return (
    <>
      <div className="footerColParent">
        <div className="footerCol1">
          <img className="logoFooter" alt="logo" src={Logo}></img>
          <p className="footerLinkText hideOnTablet hideOnTablet">
            Copyright © 2025 | Disability Advice All Rights Reserved. <br></br>
            <a
              style={{ marginTop: "5px", color: "white" }}
              className="footerLinkText"
              href="https://disabilityadvice.org/terms-and-conditions/"
            >
              Terms
            </a>{" "}
            |{" "}
            <a
              style={{ marginTop: "5px", color: "white" }}
              className="footerLinkText"
              href="https://disabilityadvice.org/privacy-policy/"
            >
              Privacy
            </a>
          </p>
          <p className="footerLinkText tabletOnly ">
            ©2025 Citizens Disability | Legal Advertising |{" "}
            <a
              style={{ marginTop: "5px", color: "white" }}
              className="footerLinkText"
              href="https://www.citizensdisability.com/terms-and-conditions/"
            >
              Terms
            </a>{" "}
            |{" "}
            <a
              style={{ marginTop: "5px", color: "white" }}
              className="footerLinkText"
              href="https://www.citizensdisability.com/privacy-policy/"
            >
              Privacy
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
