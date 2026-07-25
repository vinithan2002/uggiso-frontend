// src/services/userService.js
import axiosConfig from '../utils/axiosConfig';

const userService = {
    // Get current user profile
    getProfile: async () => {
        try {
            const response = await axiosConfig.get('/api/users/profile');
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    },

    // Update user profile
    updateProfile: async (userData) => {
        try {
            const response = await axiosConfig.put('/api/users/profile', userData);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },

    // Change Password
    changePassword: async (oldPassword, newPassword) => {
        try {
            const response = await axiosConfig.put('/api/users/change-password', null, {
                params: {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    },

    // Get user by ID (if needed for admin)
    getUserById: async (userId) => {
        try {
            const response = await axiosConfig.get(`/api/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
};

export default userService;