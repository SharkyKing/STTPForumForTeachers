import React from "react";
import "./Navbar.css";
import { FaUser, FaCog } from 'react-icons/fa'; 
import EndPoint from "../../Endpoint";

function Navbar() {

    return (
        <React.Fragment>
            <div className='navbar'>
                <div className='navbar-logo'>
                </div>
                <div className='navbar-navlinks pages'>
                    <EndPoint.components.Navlink to={EndPoint.path.Home} icon={<FaUser/>}>Home</EndPoint.components.Navlink>
                    <EndPoint.components.Navlink to={EndPoint.path.Home} icon={<FaCog/>}>About us</EndPoint.components.Navlink>
                </div>
                <div className='navbar-navlinks account'>
                    <EndPoint.components.Navlink to={EndPoint.path.SignIn} icon={<FaUser/>}>Sign in</EndPoint.components.Navlink>
                    <EndPoint.components.Navlink to={EndPoint.path.SignUp} icon={<FaCog/>}>Join us!</EndPoint.components.Navlink>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Navbar;
