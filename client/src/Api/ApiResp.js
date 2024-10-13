import axios from 'axios';

const ServerURL = 'http://localhost:3002/';

const apiClient = axios.create({
    baseURL: ServerURL,
    timeout: 10000,
});

const handleAuthCheck = (response, navigate) => {
    if (response.status === 403 || response.status === 498) {
        navigate("/signin"); // Redirect to sign-in page
    }
};

export const getRequest = async (path, config = {}, navigate) => {
    try {
        const response = await apiClient.get(`${path}`, config);
        if(navigate) {handleAuthCheck(response, navigate);}
        return { data: response.data, error: null, status: response.status };
    } catch (error) {
        return { data: null, error: error.response?.data?.error || error.message };
    }
};

export const postRequest = async (path, payload, config = {}, navigate) => {
    try {
        const response = await apiClient.post(`${path}`, payload, config);
        if(navigate) {handleAuthCheck(response, navigate);}
        return { data: response.data, error: null, status: response.status };
    } catch (error) {
        return { data: null, error: error.response?.data?.error || error.message };
    }
};

export const putRequest = async (path, payload, config = {}, navigate) => {
    try {
        const response = await apiClient.put(`${path}`, payload, config);
        if(navigate) {handleAuthCheck(response, navigate);}
        return { data: response.data, error: null, status: response.status };
    } catch (error) {
        return { data: null, error: error.response?.data?.error || error.message };
    }
};

export const deleteRequest = async (path, config = {}, navigate) => {
    try {
        const response = await apiClient.delete(`${path}`, config);
        if(navigate) {handleAuthCheck(response, navigate);}
        return { data: response.data, error: null, status: response.status };
    } catch (error) {
        return { data: null, error: error.response?.data?.error || error.message };
    }
};

export const patchRequest = async (path, payload, config = {}, navigate) => {
    try {
        const response = await apiClient.patch(`${path}`, payload, config);
        if(navigate) {handleAuthCheck(response, navigate);} // Check for authentication status
        return { data: response.data, error: null, status: response.status };
    } catch (error) {
        return { data: null, error: error.response?.data?.error || error.message };
    }
};
