import React, { createContext, useContext, useState, useEffect, useCallback  } from 'react';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
import EndPoint from '../Endpoint';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [userData, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const checkAuth = useCallback(async () => {
        try {
            setLoading(true);
            const response = await EndPoint.Api.getRequest(EndPoint.Api.ApiPaths.account.auth, {
                withCredentials: true
            });
            console.log(response.data)
            if (response.status === 200) {
                setIsAuth(true);
                setUser(response.data.user);
            }
            else{
                setIsAuth(false);
                navigate(EndPoint.path.SignIn);
            }
        } catch (error) {
            console.log(error);
            setIsAuth(false); 
            navigate(EndPoint.path.SignIn);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500)
        }
    }, [navigate]);

    useEffect(() => {
        checkAuth(); 
    }, []);

    const alertMessage = (message, success = false) => {
        Swal.fire({
            title: message,
            icon: `${success ? "success": "error"}`,
            confirmButtonText: 'Okay',
            customClass: {
                confirmButton: 'custom-button'
            }
        });
    };

    const login = async (credentials) => {
        try {
            const response = await EndPoint.Api.postRequest(EndPoint.Api.ApiPaths.account.login, credentials, {withCredentials: true});
            if (response.status === 200) {
                setIsAuth(true);
                navigate(EndPoint.path.Profile);
            }
        } catch (error) {
            alertMessage(error);
        }
    };

    const logout = () => {
        EndPoint.Api.postRequest(EndPoint.Api.ApiPaths.account.logout, {}, { withCredentials: true })
            .then(() => {
                setIsAuth(false);
                navigate(EndPoint.path.SignIn);
            })
            .catch(error => {
                console.error("Logout failed:", error);
            });
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout, alertMessage, loading, checkAuth, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
