import React, { useState, useEffect, useCallback } from "react";
import "./User.css";
import EndPoint from "../../Endpoint";
import { useAuth } from '../../Auth/AuthContext';
import LoadableComponent from "../../Utility/LoadableComponent";
import { useNavigate } from 'react-router-dom';

function User() {
    const navigate = useNavigate();

    const { alertMessage } = useAuth();

    const [users, setUsers] = useState(null);
    const [roles, setRoles] = useState(null);

    const handleDelete = async (index) => {
        const userId = users[index].id;

        try {
            const response = await EndPoint.Api.deleteRequest(EndPoint.Api.ApiPaths.user.byID(userId), { withCredentials: true }, navigate);

            if (response.error) {
                alertMessage(response.error);
            } else {
                if (response.status === 200) {
                    alertMessage("User has been deleted successfully!", true);
                    const newData = users.filter((_, i) => i !== index);
                    setUsers(newData);
                }
            }
        } catch (error) {
            if (error.response) {
                alertMessage(error.response.data.error || "Error deleting user.");
            } else {
                alertMessage("Network error. Please try again.");
            }
        }
    };

    const fetchData = useCallback(async (url, setData, errMsg) => {
        try {
            const response = await EndPoint.Api.getRequest(url, { withCredentials: true }, navigate);
            if (response.status === 200) {
                setData(response.data);
            } else if (response.error) {
                alertMessage(response.error);
            }
        } catch (error) {
            const message = error.response?.data?.error || errMsg;
            alertMessage(message);
        }
    }, [alertMessage, navigate]); 

    const handleEdit = async (index, editedRow) => {
        const updateUserProfile = async () => {
            try {
                editedRow["RoleID"] = editedRow["RoleName"];

                const response = await EndPoint.Api.patchRequest(EndPoint.Api.ApiPaths.user.byID(editedRow.id),editedRow, { withCredentials: true });
                if(response.error){
                    alertMessage(response.error);
                }
                else{
                    if(response.status === 200){
                        alertMessage("Account has been updated successfully!", true);
                        fetchData(EndPoint.Api.ApiPaths.role.base, setRoles, "Error fetching roles.");
                        fetchData(EndPoint.Api.ApiPaths.user.base, setUsers, "Error fetching users.");
                    }
                }
            } catch (error) {
                if (error.response) {
                    alertMessage(error.response.data.error || "Error fetching user profile.");
                } else {
                    alertMessage("Network error. Please try again.");
                }
            }
        };

        updateUserProfile();
    };

    const columns = [
        { key: 'id', title: 'ID', editable: false },
        { key: 'RoleName', title: 'Role name', editable: true, dropdown:{
            source: roles,
            defaultLabel: "Select role",
            labelKey: "RoleName",
            selectLabel: "Role name"
        } }, 
        { key: 'Username', title: 'User name', editable: true }, 
        { key: 'FirstName', title: 'First name', editable: true }, 
        { key: 'LastName', title: 'Last name', editable: true }, 
        { key: 'Email', title: 'Email', editable: true }, 
        { key: 'createdAt', title: 'Created at', editable: false },
        { key: 'updatedAt', title: 'Updated at', editable: false },
    ];

    useEffect(() => {
        fetchData(EndPoint.Api.ApiPaths.role.base, setRoles, "Error fetching roles.");
        fetchData(EndPoint.Api.ApiPaths.user.base, setUsers, "Error fetching users.");
    }, [alertMessage, navigate,fetchData]);

    return (
        <LoadableComponent loading={false}>
            <div className="user-container">
            {users &&
                <EndPoint.components.EditableTable
                    data={users}
                    columns={columns}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            }
            </div>
        </LoadableComponent>
    );
}

export default User;
