import React from "react";
import Logo from '../images/logo.svg';

const Header = () => {
    return <>
        <div className="logoHeaderParent">
            <img alt="Logo" className="logoHeader" src={Logo}></img>
        </div>
    </>;
};
export default Header;