import React from 'react';
import './Comment.css';
import {useAuth } from '../../Auth/AuthContext'
import EndPoint from '../../Endpoint';
import { useNavigate } from 'react-router-dom';

const Comment = ({ commentData, OnDelete }) => {
    const { isAdmin, alertMessage } = useAuth();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await EndPoint.Api.deleteRequest(EndPoint.Api.ApiPaths.thread.comment.byID(commentData.id), { withCredentials: true }, navigate);
            
            if (response.status === 200) {
                 alertMessage("Comment deleted successfully.", true);
                 OnDelete();
            } else if (response.error) {
                alertMessage('Failed to delete comment')
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };


    return (
        <div className="comment">
            <div className="comment-header">
                <p className="user">{commentData.User.username}</p>
                <p className="headerstyler"></p>
            </div>
            <div className="comment-content">
                <p>{commentData.CommentText}</p>
            </div>
            <div className="comment-footer">
                <p>{new Date(commentData.updatedAt).toLocaleDateString()} {new Date(commentData.updatedAt).toLocaleTimeString()}</p>
                {isAdmin ? (
                <EndPoint.components.Button className={"adminDeleteBtn"} onClick={handleDelete}>Delete</EndPoint.components.Button>
                ) : (null)
                
                }
            </div>
        </div>
    );
};

export default Comment;
