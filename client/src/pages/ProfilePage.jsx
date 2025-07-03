import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/userService';
import authService from '../services/authService';
import Input from '../components/Input';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, token, login } = useAuth();
  const [formData, setFormData] = useState({ name: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pictureLoading, setPictureLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Effect to populate form when user data is available
  useEffect(() => {
    if (user) {
      setFormData({ name: user.name });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['currentPassword', 'newPassword', 'confirmPassword'].includes(name)) {
      setPasswordData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const updatedUser = await userService.updateMe(formData, token);
      // Update the user in the context with the new data
      login(updatedUser, token);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error('All password fields are required.');
      return;
    }
    setPasswordLoading(true);
    try {
      const { message } = await authService.changePassword({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword }, token);
      toast.success(message);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); // Clear fields
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('picture', file);
    setPictureLoading(true);

    try {
      const updatedUser = await userService.uploadProfilePicture(formData, token);
      login(updatedUser, token); // Update context
      toast.success('Profile picture updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload picture.');
    } finally {
      setPictureLoading(false);
    }
  };

  if (!user) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <img
                src={ user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff` }
                alt="Profile"
                className="object-cover w-32 h-32 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 rounded-full cursor-pointer group-hover:bg-opacity-50" onClick={ () => !pictureLoading && fileInputRef.current.click() }>
                <span className="text-3xl text-white opacity-0 group-hover:opacity-100">
                  { pictureLoading ? '...' : '📷' }
                </span>
              </div>
            </div>
            <input type="file" ref={ fileInputRef } onChange={ handleFileChange } accept="image/png, image/jpeg" className="hidden" />
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Your Profile
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={ handleProfileSubmit }>
            <Input
              id="name"
              name="name"
              label="Full Name"
              type="text"
              value={ formData.name }
              onChange={ handleChange }
              required
            />
            <Input
              id="email"
              name="email"
              label="Email address"
              type="email"
              value={ user.email }
              onChange={ () => { } } // No-op
              required
              disabled // Make the email field read-only
            />
            <div>
              <button type="submit" disabled={ profileLoading } className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                { profileLoading ? 'Saving...' : 'Save Changes' }
              </button>
            </div>
          </form>
        </div>

        { user.provider === 'email' && (
          <Fragment>
            <div className="border-t border-gray-200"></div>
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-900">Change Password</h2>
              <form className="mt-8 space-y-6" onSubmit={ handlePasswordSubmit }>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  label="Current Password"
                  type="password"
                  value={ passwordData.currentPassword }
                  onChange={ handleChange }
                  required
                />
                <Input
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  type="password"
                  value={ passwordData.newPassword }
                  onChange={ handleChange }
                  required
                />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  value={ passwordData.confirmPassword }
                  onChange={ handleChange }
                  required
                />
                <button type="submit" disabled={ passwordLoading } className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                  { passwordLoading ? 'Updating...' : 'Update Password' }
                </button>
              </form>
            </div>
          </Fragment>
        ) }

        <div className="text-sm text-center">
          <Link to="/dashboard" className="font-medium text-blue-600 hover:text-blue-500">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;