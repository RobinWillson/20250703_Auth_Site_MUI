import axios from 'axios';

const API_URL = '/api/users';

/**
 * Fetches all users from the server. Requires admin privileges.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<Array>} A list of user objects.
 */
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

/**
 * Updates the current user's profile data.
 * @param {object} userData - The user data to update (e.g., { name }).
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<object>} The updated user object.
 */
const updateMe = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/me`, userData, config);
  return response.data;
};

/**
 * Uploads a new profile picture for the current user.
 * @param {FormData} formData - The form data containing the image file.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<object>} The updated user object.
 */
const uploadProfilePicture = async (formData, token) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/me/picture`, formData, config);
  return response.data;
};

/**
 * Updates a specific user's role. Requires admin privileges.
 * @param {string} userId - The ID of the user to update.
 * @param {string} role - The new role for the user.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<object>} The updated user object.
 */
const updateUserRole = async (userId, role, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${userId}/role`, { role }, config);
  return response.data;
};

/**
 * Deletes a specific user. Requires admin privileges.
 * @param {string} userId - The ID of the user to delete.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<void>}
 */
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(`${API_URL}/${userId}`, config);
};

const userService = { getAllUsers, updateMe, uploadProfilePicture, updateUserRole, deleteUser };
export default userService;