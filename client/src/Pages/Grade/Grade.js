import React, { useState, useEffect } from "react";
import "./Grade.css";
import EndPoint from "../../Endpoint";
import { useAuth } from '../../Auth/AuthContext';
import LoadableComponent from "../../Utility/LoadableComponent";
import { useNavigate } from 'react-router-dom';

function Grade() {
    const navigate = useNavigate();

    const { alertMessage } = useAuth();

    const [grades, setGrades] = useState(null);

    const handleDelete = async (index) => {
        const gradeId = grades[index].id;

        try {
            const response = await EndPoint.Api.deleteRequest(EndPoint.Api.ApiPaths.grade.byID(gradeId), { withCredentials: true }, navigate);

            if (response.error) {
                alertMessage(response.error);
            } else {
                if (response.status === 200) {
                    alertMessage("Grade has been deleted successfully!", true);
                    const newData = grades.filter((_, i) => i !== index);
                    setGrades(newData);
                }
            }
        } catch (error) {
            if (error.response) {
                alertMessage(error.response.data.error || "Error deleting grade.");
            } else {
                alertMessage("Network error. Please try again.");
            }
        }
    };

    const handleEdit = async (index, editedRow) => {
        const gradeId = grades[index].id;

        try {
            const response = await EndPoint.Api.patchRequest(EndPoint.Api.ApiPaths.grade.byID(gradeId), editedRow, { withCredentials: true }, navigate);

            if (response.error) {
                alertMessage(response.error);
            } else {
                if (response.status === 200) {
                    alertMessage("Grade has been updated successfully!", true);
                    const newData = grades.map((row, i) => (i === index ? response.data : row));
                    setGrades(newData);
                }
            }
        } catch (error) {
            if (error.response) {
                alertMessage(error.response.data.error || "Error updating grade.");
            } else {
                alertMessage("Network error. Please try again.");
            }
        }
    };

    const handleAdd = async (newRowData) => {
        try {
            const response = await EndPoint.Api.postRequest(
                EndPoint.Api.ApiPaths.grade.base,
                newRowData,
                { withCredentials: true }, navigate
            );

            if (response.error) {
                alertMessage(response.error);
            } else {
                setGrades((prevGrades) => [...prevGrades, response.data]);
                alertMessage("Grade added successfully!", true);
            }
        } catch (error) {
            if (error.response) {
                alertMessage(error.response.data.error || "Error adding new grade.");
            } else {
                alertMessage("Network error. Please try again.");
            }
        }
    }

    const columns = [
        { key: 'id', title: 'ID', editable: false },
        { key: 'GradeName', title: 'Grade name', editable: true }, 
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
            fetchData(EndPoint.Api.ApiPaths.grade.base, setGrades, "Error fetching grades.");
    }, [alertMessage, navigate]);

    return (
        <LoadableComponent loading={false}>
            <div className="grade-container">
            {grades &&
                <EndPoint.components.EditableTable
                    data={grades}
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

export default Grade;
