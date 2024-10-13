import React, { useState } from "react";
import "./SignUp.css";
import EndPoint from "../../Endpoint";
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import {useAuth } from '../../Auth/AuthContext'

function SignUp() {
    const { alertMessage } = useAuth();
    const [formData, setFormData] = useState(EndPoint.Utility.FormValidation.initialRegisterFormState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const confirmSignUp = async () => {
        const validationError = EndPoint.Utility.FormValidation.validateSignUpForm(formData);

        if (validationError) 
        {
            alertMessage(validationError)
        } 
        else 
        {
            try {
                const hashedPassword = bcrypt.hashSync(formData.password, bcrypt.genSaltSync(10));

                const response = await EndPoint.Api.postRequest(EndPoint.Api.ApiPaths.account.register,{
                    FirstName: formData.firstName,
                    LastName: formData.lastName,
                    Email: formData.email,
                    Password: hashedPassword,
                    Username: formData.userName
                });

                if(!response.error){
                    if (response.status === 201) {
                        alertMessage('Account has been created successfully!', true)
                        navigate('/signin');
                    }
                }
                else{
                    alertMessage(response.error)
                }
            } catch (error) {
                alertMessage(error.response?.data?.error || "An error occurred during signup.");
            }
        }
    };

    return (
        <div className="signup">
            <div className="signup-input">
                <h1 className="signup-input-header">Start your journey!</h1>
                <div className="signup-input-fields">
                    {['userName', 'firstName', 'lastName', 'email', 'password', 'repeatpassword'].map((field, index) => (
                        <EndPoint.components.Input
                            key={index}
                            type={field.includes('password') ? 'password' : 'text'}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formData[field]}
                            onChange={handleChange}
                        />
                    ))}
                </div>
                <div className="signup-input-buttons">
                    <EndPoint.components.Button onClick={confirmSignUp}>Continue</EndPoint.components.Button>
                </div>
            </div>
            <div className="signup-image">
                <img src="/img/signup-background.jpg" alt="Signup Background" />
            </div>
        </div>
    );
}

export default SignUp;
