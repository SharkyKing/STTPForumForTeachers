import React from 'react';
import './Comment.css';
import {useAuth } from '../../Auth/AuthContext'
import EndPoint from '../../Endpoint';

const Comment = ({ commentData }) => {
    const { userData } = useAuth();

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
                {userData.role == 2 ? (
                <EndPoint.components.Button className={"adminDeleteBtn"}>Delete</EndPoint.components.Button>
                ) : (null)
                
                }
            </div>
        </div>
    );
};

export default Comment;
