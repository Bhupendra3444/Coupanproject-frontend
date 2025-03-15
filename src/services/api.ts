
import axios from 'axios';

// LEAVE THESE API CONNECTION POINTS - REPLACE WITH ACTUAL VALUES LATER
const API_ENDPOINTS = {
  claim: import.meta.env.VITE_API_URL + '/api/claim', // Main endpoint
  // Add other endpoints if needed
};

// Configure axios instance for cookie handling
const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL
});

export const claimCoupon = async () => {
  try {
    const response = await api.post('/api/claim');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error.response.data;
      }
    }
    throw { message: 'An unexpected error occurred' };
  }
};

export default api;
