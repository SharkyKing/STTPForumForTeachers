import React, { useEffect, useState } from "react";
import "./ForumMain.css";
import { useNavigate } from 'react-router-dom';
import EndPoint from "../../../Endpoint";
import  { useAuth } from '../../../Auth/AuthContext'

function ForumMain() {
    const navigate = useNavigate();
    const [threads, setThreads] = useState(null);
    const { alertMessage } = useAuth();

    const [grades, setGrades] = useState(null);
    const [categories, setCategories] = useState(null);

    const [selectedGrade, setSelectedGrade] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('')

    const fetchData = async (url, setData, errMsg, filters) => {
        try {
            const response = await EndPoint.Api.getRequest(url, { withCredentials: true }, navigate, filters)
            
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

    useEffect(() => {
            fetchData(EndPoint.Api.ApiPaths.grade.base, setGrades, "Error fetching grades.");
            fetchData(EndPoint.Api.ApiPaths.category.base, setCategories, "Error fetching categories.");
            fetchData(EndPoint.Api.ApiPaths.thread.base, setThreads, "Error fetching grades.");
    }, [alertMessage, navigate]);

    const SearchSubmit = () => {
        const filters = {
            category: selectedCategory,
            grade: selectedGrade,
            search: searchKeyword,
        };

        fetchData(EndPoint.Api.ApiPaths.thread.base, setThreads, "Error fetching grades.", filters);
    }

    const OnDelete = () => {
        SearchSubmit();
    }

    return (
        <EndPoint.Utility.Other.LoadableComponent loading={false}>
            <div className="forummain">
                <div className="filterdropdown">
                    <EndPoint.components.Dropdown options={grades} setSelectedValue={setSelectedGrade} defaultLabel="Select grade" labelKey="GradeName" selectLabel="Grade"/>
                    <EndPoint.components.Dropdown options={categories} setSelectedValue={setSelectedCategory} defaultLabel="Select category" labelKey="CategoryName" selectLabel="Category" />
                    <EndPoint.components.Button onClick={() => {navigate(EndPoint.path.CreateThread)}}>Create new thread</EndPoint.components.Button>
                </div>
                <div className="filterpanel">
                    <EndPoint.components.Input
                        type='text'
                        placeholder={'search'}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        value = {searchKeyword}
                    />
                    <EndPoint.components.Button onClick={SearchSubmit}>Search</EndPoint.components.Button>
                    
                </div>
                <div className="allThreads">
                    {threads ? (
                        threads.map(thread => (
                            <EndPoint.components.ThreadPost OnDelete={OnDelete} key={thread.id} thread={thread} navigate={navigate}/> // Assuming post has an 'id' field
                        ))
                    ) : (
                        <div>No posts found.</div>
                    )}
                </div>
            </div>
        </EndPoint.Utility.Other.LoadableComponent>
    );
}

export default ForumMain;
