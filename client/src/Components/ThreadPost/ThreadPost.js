import React, { useState } from 'react';
import './ThreadPost.css'; // Import CSS file for styling
import { FaArrowUp, FaArrowDown} from 'react-icons/fa'; 
import EndPoint from '../../Endpoint';
import {useAuth } from '../../Auth/AuthContext'

const ThreadPost = ({ thread, navigate, OnDelete }) => {
    const [currentVotes, setCurrentVotes] = useState(thread.RelevancyCount);
    const { isAdmin, alertMessage } = useAuth();

    const handelVote = async (vote) => {
        try {
            const response = await EndPoint.Api.postRequest(EndPoint.Api.ApiPaths.thread.vote(thread.id), { vote: vote }, { withCredentials: true }, navigate);
            if(!response.error){
                if(response.status === 200){
                    if(response.data){
                        if(response.data.threadVote){
                            setCurrentVotes(thread.RelevancyCount + response.data.threadVote.Vote)
                        }
                    }
                    
                }
            }

        } catch (error) {
            console.error('Error upvoting:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await EndPoint.Api.deleteRequest(EndPoint.Api.ApiPaths.thread.byID(thread.id), { withCredentials: true }, navigate);
            
            if (response.status === 200) {
                alertMessage("Thread deleted successfully.", true);
                OnDelete();
            } else if (response.error) {
                alertMessage('Failed to delete thread')
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="post">
            <div className="header">
                {isAdmin ? (
                <EndPoint.components.Button onClick={handleDelete} className={"adminDeleteBtn"}>Delete</EndPoint.components.Button>
                ) : (null)
                
                }
                <div className="header-user">
                    {thread.Grade.GradeName} - {thread.Category.CategoryName}
                </div>
            </div>

            <div className="threadname">
                <h3>{thread.ThreadName}</h3>
            </div>

            <div className="content">
                <p>{thread.ThreadText}</p>
            </div>

            <div className="footer">
                <div className="footer-date">
                    {new Date(thread.createdAt).toLocaleDateString()} - {new Date(thread.createdAt).toLocaleTimeString()}
                    <EndPoint.components.Button onClick={() => {navigate(EndPoint.path.ThreadById(thread.id))}}>More</EndPoint.components.Button>
                </div>
                <div className="footer-votes">
                    <div className="vote-buttons">
                        <span onClick={() => handelVote(1)} style={{ cursor: 'pointer', color: 'green' }}>
                            <FaArrowUp/>
                        </span>
                        <p>{currentVotes}</p>
                        <span onClick={() => handelVote(-1)} style={{ cursor: 'pointer',color: 'red' }}>
                            <FaArrowDown/>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThreadPost;
