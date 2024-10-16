import React, { useEffect, useState, useCallback } from "react";
import "./Thread.css";
import EndPoint from "../../../Endpoint";
import {useAuth } from '../../../Auth/AuthContext'
import { useNavigate, useParams } from 'react-router-dom';

function Thread() {
    const { alertMessage } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [threadData, setThreadData] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const handleInputChange = (e) => {
        setCommentText(e.target.value);
    };

    const fetchComments = useCallback(async () => {
        try {
            const response = await EndPoint.Api.getRequest(
                EndPoint.Api.ApiPaths.thread.comment.byThreadID(id), 
                { withCredentials: true }, 
                navigate
            );
            
            if (response.status === 200) {
                setComments(response.data);
                console.log(response.data);
            } else if (response.error) {
                alertMessage(response.error);
            }
        } catch (error) {
            const message = error.response?.data?.error || "Error fetching thread comments.";
            alertMessage(message);
        }
    },[alertMessage, id, navigate]);

    useEffect(() => {
        const fetchThreadData = async () => {
            try {
                const response = await EndPoint.Api.getRequest(
                    EndPoint.Api.ApiPaths.thread.byID(id), 
                    { withCredentials: true }, 
                    navigate
                );

                if (response.status === 200) {
                    setThreadData(response.data);
                } else if (response.error) {
                    alertMessage(response.error);
                }
            } catch (error) {
                const message = error.response?.data?.error || "Error fetching thread data.";
                alertMessage(message);
            }
        };

        fetchThreadData();
        fetchComments(); // Fetch comments on component mount
    }, [id, alertMessage, fetchComments, navigate]);

    const handleCommentPost = async () => {
        if (!commentText) {
            alertMessage("Comment cannot be empty."); // Provide feedback for empty comment
            return;
        }

        try {
            const response = await EndPoint.Api.postRequest(
                EndPoint.Api.ApiPaths.thread.comment.base, // Assuming you have a base path for comments
                { CommentText: commentText, ThreadID: id },
                { withCredentials: true }, // If your API requires credentials
                navigate
            );

            if (response.error) {
                alertMessage(response.error);
            } else {
                if (response.status === 201) {
                    alertMessage("Comment posted successfully!", true);
                    setCommentText(''); // Clear the input field
                    await fetchComments();
                }
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            alertMessage("An error occurred while posting the comment.");
        }
    };

    if (!threadData) {
        return <div>Loading...</div>; // Show a loading state while fetching the thread data
    }

    const OnDelete = () => {
        fetchComments();
    }

    return (
       <EndPoint.Utility.Other.LoadableComponent loading={!threadData}>
            <div className="thread">
                <div className="thread-subject">
                    <EndPoint.components.Input
                        type='text'
                        name='subject' 
                        readOnly='true'
                        placeholder='Thread subject'
                        value={threadData.ThreadName}
                    />
                    <div className="threadtype-info">
                        <h1>{threadData.Grade.GradeName} - {threadData.Category.CategoryName}</h1>
                        <h4>{new Date(threadData.createdAt).toLocaleDateString()} {new Date(threadData.createdAt).toLocaleTimeString()} - {threadData.User.username}</h4>
                    </div>
                    
                </div>
                <EndPoint.components.Input
                    type='text'
                    name='content' 
                    readOnly='true'
                    placeholder='Thread content'
                    multiline={true}
                    value={threadData.ThreadText} 
                />
            </div>

            <div className="comments-container">
                {comments && comments.map(comment => (
                    <EndPoint.components.Comment  OnDelete={OnDelete} key={comment.id} commentData={comment} />
                ))}

                <div className="comment-input">
                    <EndPoint.components.Input 
                                value={commentText}
                                onChange={handleInputChange} 
                                placeholder={"New Comment"} 
                                multiline="true">
                        
                    </EndPoint.components.Input>
                    <EndPoint.components.Button onClick={handleCommentPost} >
                        Comment!
                    </EndPoint.components.Button>
                </div>
            </div>
        </EndPoint.Utility.Other.LoadableComponent>
    );
}

export default Thread;
