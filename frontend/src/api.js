import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// User Authentication
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);

// Project Management
export const getProjects = (token) => api.get('/projects', { headers: { Authorization: `Bearer ${token}` } });

export default api;
