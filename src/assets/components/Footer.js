import React from "react";
import Logo from "../images/whiteLogo.svg";
import ABCLogo from "../images/ABC-2021-LOGO SVG.svg";
import NBCLogo from "../images/nbc-logo-white-png-Logo.svg";
import BBB from "../images/BBB A plus in white.svg";
import GooleReviews from "../images/googlereviewinwhite.svg";
import ACRD from "../images/ACRDLogo.svg";

const Footer = () => {
  return (
    <>
      <div className="footerColParent">
        <div className="footerCol1">
          <img className="logoFooter" alt="logo" src={Logo}></img>
          <p className="footerLinkText hideOnTablet hideOnTablet" >
            ©2025 Citizens Disability | Legal Advertising <br></br>
            <a
              className="footerLinkText"
              href="https://www.citizensdisability.com/terms-and-conditions/"
            >
              Terms
            </a>{" "}
            |{" "}
            <a
              className="footerLinkText"
              href="https://www.citizensdisability.com/privacy-policy/"
            >
              Privacy
            </a>
          </p>
          <p className="footerLinkText tabletOnly " >
            ©2025 Citizens Disability | Legal Advertising {" "}
            |{" "}
             <a
              className="footerLinkText"
              href="https://www.citizensdisability.com/terms-and-conditions/"
            >
               Terms
            </a>{" "}
            |{" "}
            <a
              className="footerLinkText"
              href="https://www.citizensdisability.com/privacy-policy/"
            >
              Privacy
            </a>
          </p>
        </div>
        <div className="footerCol2">
          <p className="footerText">As Seen On</p>
          <hr></hr>
          <div className="otherLogoParent1">
            <img className="otherLogoFooter1" alt="abc logo" src={ABCLogo}></img>
            <img className="otherLogoFooter1" alt="nbc logo" src={NBCLogo}></img>
          </div>
        </div>
        <div className="footerCol3">
          <p className="footerText">A Trusted Service</p>
          <hr></hr>
          <div className="otherLogoParent2">
            <img className="otherLogoFooter2" alt="BBB logo" src={BBB}></img>
            <img className="otherLogoFooter2" alt="Goolgle Reviews" src={GooleReviews}></img>
            <img className="otherLogoFooter2" alt="ACRD logo"src={ACRD}></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
