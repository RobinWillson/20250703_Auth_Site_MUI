import axios from 'axios';

// The base URL will be proxied by the Vite development server.
const API_URL = '/api';

/**
 * Fetches the current user's data using the provided token.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<object>} The user data.
 */
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/users/me`, config);
  return response.data;
};

/**
 * Logs in a user.
 * @param {object} credentials - The user's credentials {email, password}.
 * @returns {Promise<object>} An object containing the token and user data.
 */
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

/**
 * Registers a new user.
 * @param {object} userData - The new user's data {name, email, password}.
 * @returns {Promise<object>} An object containing the token and user data.
 */
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

/**
 * Logs in or registers a user using a Google credential.
 * @param {string} credential - The credential string from Google's response.
 * @returns {Promise<object>} An object containing the token and user data.
 */
const loginWithGoogle = async (credential) => {
  const response = await axios.post(`${API_URL}/auth/google`, { credential });
  return response.data;
};

/**
 * Sends a password reset request for the given email.
 * @param {{email: string}} emailData - The user's email.
 * @returns {Promise<object>} A confirmation message.
 */
const forgotPassword = async (emailData) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, emailData);
  return response.data;
};

/**
 * Resets the user's password using a reset token.
 * @param {string} resetToken - The password reset token from the URL.
 * @param {{password: string}} passwordData - The new password.
 * @returns {Promise<object>} A confirmation message.
 */
const resetPassword = async (resetToken, passwordData) => {
  const response = await axios.put(`${API_URL}/auth/reset-password/${resetToken}`, passwordData);
  return response.data;
};

/**
 * Changes the user's password.
 * @param {object} passwordData - The password data { currentPassword, newPassword }.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<object>} A confirmation message.
 */
const changePassword = async (passwordData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/auth/change-password`, passwordData, config);
  return response.data;
};

const authService = {
  getMe,
  login,
  register,
  loginWithGoogle,
  forgotPassword,
  resetPassword,
  changePassword,
};

export default authService;
