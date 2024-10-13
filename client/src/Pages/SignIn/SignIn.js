import React, { useState } from "react";
import "./SignIn.css";
import EndPoint from "../../Endpoint";
import { useAuth } from '../../Auth/AuthContext'

function Signin() {
    const { alertMessage, login } = useAuth();
    const [formData, setFormData] = useState(EndPoint.Utility.FormValidation.initialLoginFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const confirmSignin = async () => {
        login(formData);
        try {
            
        } catch (error) {
            alertMessage(error.response?.data?.error || "An error occurred during signin.");
        }
    };

    return (
        <div className="signin">
            <div className="signin-image">
                <img src="/img/signin-background.jpg" alt="Signin Background" />
            </div>
            <div className="signin-input">
                <div className="signin-input-header">
                    <h1>Together, we grow!</h1>
                </div>
                <div className="signin-input-fields">
                    <EndPoint.components.Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <EndPoint.components.Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="signin-input-buttons">
                    <EndPoint.components.Button onClick={confirmSignin} >Continue</EndPoint.components.Button>
                </div>
            </div>
        </div>
    );
}

export default Signin;
