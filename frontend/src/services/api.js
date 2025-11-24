import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getMe: () => api.get('/auth/me'),
};

// Profile API
export const profileAPI = {
    getProfile: (id) => api.get(`/profile/${id}`),
    updateProfile: (data) => api.put('/profile', data),
};

// Discover API
export const discoverAPI = {
    getProfiles: (params) => api.get('/discover', { params }),
    likeProfile: (userId) => api.post(`/discover/like/${userId}`),
    dislikeProfile: (userId) => api.post(`/discover/dislike/${userId}`),
    getMatches: () => api.get('/discover/matches'),
};

// Chat API
export const chatAPI = {
    getMessages: (matchId) => api.get(`/chat/${matchId}`),
    sendMessage: (matchId, data) => api.post(`/chat/${matchId}`, data),
};

export default api;
