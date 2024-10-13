import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navlink.css'; 

const Navlink = ({ to, children, exact = false, onClick, icon }) => {
    return (
        <NavLink
            to={to}
            exact={exact}
            className="navlink"
            activeClassName="active"
            onClick={onClick}
        >
            <span className="navlink-text">{children}</span>
            {icon && <span className="navlink-icon">{icon}</span>} 
        </NavLink>
    );
};

export default Navlink;
