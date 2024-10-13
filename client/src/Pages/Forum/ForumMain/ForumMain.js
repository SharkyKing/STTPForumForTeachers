import React, { useEffect, useState } from "react";
import "./ForumMain.css";
import { useNavigate } from 'react-router-dom';
import EndPoint from "../../../Endpoint";
import  { useAuth } from '../../../Auth/AuthContext'

function ForumMain() {
    const navigate = useNavigate();
    const [threads, setThreads] = useState(null);
    const { alertMessage } = useAuth();

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
        fetchData(EndPoint.Api.ApiPaths.thread.base, setThreads, "Error fetching grades.");
    }, [alertMessage]);

    
    return (
        <EndPoint.Utility.Other.LoadableComponent loading={false}>
            <div className="forummain">
                <div className="filterpanel">
                    <EndPoint.components.Input
                        type='text'
                        placeholder={'search'}
                    />
                    <EndPoint.components.Button>Search</EndPoint.components.Button>
                    <EndPoint.components.Button onClick={() => {navigate(EndPoint.path.CreateThread)}}>Create new thread</EndPoint.components.Button>
                </div>
                <div className="allThreads">
                    {threads ? (
                        threads.map(thread => (
                            <EndPoint.components.ThreadPost key={thread.id} thread={thread} navigate={navigate}/> // Assuming post has an 'id' field
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
