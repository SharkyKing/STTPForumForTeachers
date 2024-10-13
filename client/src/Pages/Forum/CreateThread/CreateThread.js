import React, { useEffect, useState } from "react";
import "./CreateThread.css";
import EndPoint from "../../../Endpoint";
import {useAuth } from '../../../Auth/AuthContext'
import { useNavigate } from 'react-router-dom';

function CreateThread() {
    const navigate = useNavigate();

    const { alertMessage } = useAuth();
    const [formData, setFormData] = useState(EndPoint.Utility.FormValidation.initialPostFormState);

    const [grades, setGrades] = useState(null);
    const [categories, setCategories] = useState(null);

    const [selectedGrade, setSelectedGrade] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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
            fetchData(EndPoint.Api.ApiPaths.category.base, setCategories, "Error fetching categories.");
    }, [alertMessage, navigate]);

    const SubmitPost = async () => {
            const updateUserProfile = async () => {
                const updatedFormData = {
                ...formData,
                selectedGrade,
                selectedCategory,
            };

            const validationError = EndPoint.Utility.FormValidation.validatePostForm(updatedFormData);
            if (validationError) {
                alertMessage(validationError);
                return;
            }

            const payload = {
                ThreadName: updatedFormData.subject,
                ThreadText: updatedFormData.content,
                CategoryID: updatedFormData.selectedCategory,
                GradeID: updatedFormData.selectedGrade,
            };

            try {
                const response = await EndPoint.Api.postRequest(EndPoint.Api.ApiPaths.thread.base,payload, { withCredentials: true }, navigate);
                if(response.error){
                    alertMessage(response.error);
                }
                else{
                    if(response.status === 200){
                        alertMessage("Post has been uploaded successfully!", true);
                        navigate(EndPoint.path.ForumMain)
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


    return (
        <EndPoint.Utility.Other.LoadableComponent loading={false}>
            <div className="createthread">
                <div className="createthread-subject">
                    <EndPoint.components.Input
                        type='text'
                        name='subject' 
                        placeholder='Thread subject'
                        value={formData.subject} 
                        onChange={handleInputChange} 
                    />
                    <EndPoint.components.Dropdown options={grades} setSelectedValue={setSelectedGrade} defaultLabel="Select grade" labelKey="GradeName" selectLabel="Grade"/>
                    <EndPoint.components.Dropdown options={categories} setSelectedValue={setSelectedCategory} defaultLabel="Select category" labelKey="CategoryName" selectLabel="Category" />
                </div>
                <EndPoint.components.Input
                    type='text'
                    name='content' 
                    placeholder='Thread content'
                    multiline={true}
                    value={formData.content} 
                    onChange={handleInputChange}
                />
                <EndPoint.components.Button onClick={SubmitPost}>Post thread</EndPoint.components.Button>
            </div>
        </EndPoint.Utility.Other.LoadableComponent>
    );
}

export default CreateThread;
