import React from "react";
import "./SidePanel.css";
import { FaBars, FaUser, FaCog , FaNewspaper, FaLock, FaSignOutAlt } from 'react-icons/fa'; 
import EndPoint from "../../Endpoint";
import {useAuth } from '../../Auth/AuthContext'
function SidePanel() {
    const { logout, isAdmin } = useAuth();

    return (
        <div className="sidepanel">
            <div className="navlinks">
                <EndPoint.components.Navlink to={EndPoint.path.ForumMain} icon={<FaNewspaper/>}>Forum</EndPoint.components.Navlink>
                <EndPoint.components.Navlink to={EndPoint.path.Profile} icon={<FaUser/>}>Profile</EndPoint.components.Navlink>
                {isAdmin ? (
                <EndPoint.components.Navlink to={EndPoint.path.Admin} icon={<FaLock/>}>Admin</EndPoint.components.Navlink>
                ) : (null)
                
                }
                <EndPoint.components.Navlink onClick={() => logout()} icon={<FaSignOutAlt/>}>Logout</EndPoint.components.Navlink>
            </div>
        </div>
    );
}

export default SidePanel;
