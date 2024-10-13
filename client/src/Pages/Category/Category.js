import React, { useState ,useEffect} from "react";
import "./Category.css";
import EndPoint from "../../Endpoint";
import { useAuth } from '../../Auth/AuthContext';
import LoadableComponent from "../../Utility/LoadableComponent";
import { useNavigate } from 'react-router-dom';

function Category() {
    const navigate = useNavigate();

    const { alertMessage } = useAuth();
    const [categories, setCategories] = useState(null);

    const handleDelete = async (index) => {
        const categoryId = categories[index].id;

        try {
            const response = await EndPoint.Api.deleteRequest(EndPoint.Api.ApiPaths.category.byID(categoryId), { withCredentials: true }, navigate);

            if (response.error) {
                alertMessage(response.error);
            } else {
                if (response.status === 200) {
                    alertMessage("Category has been deleted successfully!", true);
                    const newData = categories.filter((_, i) => i !== index);
                    setCategories(newData);
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
        const categoryId = categories[index].id;

        try {
            const response = await EndPoint.Api.patchRequest(EndPoint.Api.ApiPaths.category.byID(categoryId), editedRow, { withCredentials: true }, navigate);

            if (response.error) {
                alertMessage(response.error);
            } else {
                if (response.status === 200) {
                    alertMessage("Category has been updated successfully!", true);
                    const newData = categories.map((row, i) => (i === index ? response.data : row));
                    setCategories(newData);
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
                EndPoint.Api.ApiPaths.category.base, 
                newRowData,
                { withCredentials: true }, navigate
            );

            if (response.error) {
                alertMessage(response.error);
            } else {
                setCategories((prevCategories) => [...prevCategories, response.data]);
                alertMessage("Category added successfully!", true);
            }
        } catch (error) {
            if (error.response) {
                alertMessage(error.response.data.error || "Error adding new category.");
            } else {
                alertMessage("Network error. Please try again.");
            }
        }
    }

    const columns = [
        { key: 'id', title: 'ID', editable: false }, 
        { key: 'CategoryName', title: 'Category name', editable: true },
        { key: 'createdAt', title: 'Created at', editable: false }, 
        { key: 'updatedAt', title: 'Updated at', editable: false }, 
    ];

    useEffect(() => {
            const fetchData = async (url, setData, errMsg) => {
                try {
                    const response = await EndPoint.Api.getRequest(url, { withCredentials: true })
                    
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
            fetchData(EndPoint.Api.ApiPaths.category.base, setCategories, "Error fetching categories.");
    }, [alertMessage]);

    return (
        <LoadableComponent loading={false}>
            <div className="category-container">
            {categories &&
                <EndPoint.components.EditableTable
                    data={categories}
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

export default Category;
