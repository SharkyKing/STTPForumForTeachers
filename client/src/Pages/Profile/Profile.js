import React, { useEffect, useState } from "react";
import "./Profile.css";
import EndPoint from "../../Endpoint";
import {useAuth } from '../../Auth/AuthContext'

function Profile() {
    const { alertMessage, userData } = useAuth();
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUserProfile = async (userId) => {
            EndPoint.Api.getRequest(EndPoint.Api.ApiPaths.user.byID(userId), { withCredentials: true })
            .then(response => {
                setUser(response.data);
                return response.data;
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                    alertMessage(`Error: ${error.response.data.error || 'Failed to fetch user'}`);
                } else {
                    console.error('Network error or something else happened:', error.message);
                    alertMessage('Network error or server unreachable.');
                }
                return Promise.reject(error);
            })
        };

        fetchUserProfile(userData.id);
        
    }, [userData.id,alertMessage])

    const SaveSettings = (() => {
        const updateUserProfile = async () => {
            try {
                const response = await EndPoint.Api.patchRequest(EndPoint.Api.ApiPaths.user.byID(userData.id),user, { withCredentials: true });
                if(response.error){
                    alertMessage(response.error);
                }
                else{
                    if(response.status === 200){
                        alertMessage("Account has been updated successfully!", true);
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
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <EndPoint.Utility.Other.LoadableComponent loading={false}>
                <div className="profileinfo">
                    <div className="profileinfo-unit">
                        <h3>Username</h3>
                        <EndPoint.components.Input
                                type="text"
                                name="Username"
                                placeholder="Username"
                                value={user.Username}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className="profileinfo-unit">
                        <h3>Firstname</h3>
                        <EndPoint.components.Input
                                type="text"
                                name="FirstName"
                                placeholder="FirstName"
                                value={user.FirstName}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className="profileinfo-unit">
                        <h3>Lastname</h3>
                        <EndPoint.components.Input
                                type="text"
                                name="LastName"
                                placeholder="LastName"
                                value={user.LastName}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className="profileinfo-unit">
                        <h3>Email</h3>
                        <EndPoint.components.Input
                                type="text"
                                name="Email"
                                placeholder="Email"
                                value={user.Email}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className="profile-infosave">
                        <EndPoint.components.Button onClick={SaveSettings}>Save</EndPoint.components.Button>
                    </div>
                </div>
        </EndPoint.Utility.Other.LoadableComponent>
    );
}

export default Profile;
