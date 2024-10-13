import React from "react";
import "./Admin.css";
import EndPoint from "../../Endpoint";
import LoadableComponent from "../../Utility/LoadableComponent";
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();

    return (
        <LoadableComponent loading={false}>
            <div className="admin-container">
                <div className="grid">
                    <div className="grid-item">
                        <EndPoint.components.Button onClick={() => navigate(EndPoint.path.Grade)}>Grades</EndPoint.components.Button>
                    </div>
                    <div className="grid-item">
                        <EndPoint.components.Button onClick={() => navigate(EndPoint.path.Category)}>Categories</EndPoint.components.Button>
                    </div>
                    <div className="grid-item">
                        <EndPoint.components.Button onClick={() => navigate(EndPoint.path.User)}>Users</EndPoint.components.Button>
                    </div>
                    <div className="grid-item">
                        <EndPoint.components.Button onClick={() => navigate(EndPoint.path.Role)}>Roles</EndPoint.components.Button>
                    </div>
                </div>
            </div>
        </LoadableComponent>
    );
}

export default Admin;
