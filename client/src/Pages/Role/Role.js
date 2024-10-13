import React, { useState, useEffect } from "react";
import "./Role.css";
import EndPoint from "../../Endpoint";
import { useAuth } from '../../Auth/AuthContext';
import LoadableComponent from "../../Utility/LoadableComponent";
import { useNavigate } from 'react-router-dom';

function Role() {
    const navigate = useNavigate();

    const { alertMessage } = useAuth();

    const [roles, setRoles] = useState(null);

    const handleDelete = async (index) => {
        const roleId = roles[index].id;

        try {
            const response = await EndPoint.Api.deleteRequest(EndPoint.Api.ApiPaths.role.byID(roleId), { withCredentials: true }, navigate);

            if (response.error) {
                alertMessage(response.error);
            } else {
                if (response.status === 200) {
                    alertMessage("Role has been deleted successfully!", true);
                    const newData = roles.filter((_, i) => i !== index);
                    setRoles(newData);
                }
            }
        } catch (error) {
            if (error.response) {
                alertMessage(error.response.data.error || "Error deleting role.");
            } else {
                alertMessage("Network error. Please try again.");
            }
        }
    };

    const handleEdit = async (index, editedRow) => {
        const roleId = roles[index].id;

        try {
            const response = await EndPoint.Api.patchRequest(EndPoint.Api.ApiPaths.role.byID(roleId), editedRow, { withCredentials: true }, navigate);

            if (response.error) {
                alertMessage(response.error);
            } else {
                if (response.status === 200) {
                    alertMessage("Role has been updated successfully!", true);
                    const newData = roles.map((row, i) => (i === index ? response.data : row));
                    setRoles(newData);
                }
            }
        } catch (error) {
            if (error.response) {
                alertMessage(error.response.data.error || "Error updating role.");
            } else {
                alertMessage("Network error. Please try again.");
            }
        }
    };

    const handleAdd = async (newRowData) => {
        try {
            const response = await EndPoint.Api.postRequest(
                EndPoint.Api.ApiPaths.role.base,
                newRowData,
                { withCredentials: true }, navigate
            );

            if (response.error) {
                alertMessage(response.error);
            } else {
                setRoles((prevGrades) => [...prevGrades, response.data]);
                alertMessage("Role added successfully!", true);
            }
        } catch (error) {
            if (error.response) {
                alertMessage(error.response.data.error || "Error adding new role.");
            } else {
                alertMessage("Network error. Please try again.");
            }
        }
    }

    const columns = [
        { key: 'id', title: 'ID', editable: false },
        { key: 'RoleName', title: 'Role name', editable: true }, 
        { key: 'createdAt', title: 'Created at', editable: false },
        { key: 'updatedAt', title: 'Updated at', editable: false },
    ];

    useEffect(() => {
            const fetchData = async (url, setData, errMsg) => {
                try {
                    const response = await EndPoint.Api.getRequest(url, { withCredentials: true }, navigate)
                    
                    if(response.status === 200){
                        setData(response.data);
                        console.log(response.data);
                    }
                    else if(response.error){
                        alertMessage(response.error);
                    }
                } catch (error) {
                    const message = error.response?.data?.error || errMsg;
                    alertMessage(message);
                }
            };
            fetchData(EndPoint.Api.ApiPaths.role.base, setRoles, "Error fetching roles.");
    }, [alertMessage, navigate]);

    return (
        <LoadableComponent loading={false}>
            <div className="user-container">
            {roles &&
                <EndPoint.components.EditableTable
                    data={roles}
                    columns={columns}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onAdd={handleAdd}
                />
            }
            </div>
        </LoadableComponent>
    );
}

export default Role;
