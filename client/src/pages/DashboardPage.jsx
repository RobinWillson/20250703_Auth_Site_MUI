import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 text-center bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-4">
          <img
            src={ user?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random&color=fff` }
            alt="Profile"
            className="object-cover w-24 h-24 mb-4 rounded-full"
          />
          <h1 className="text-4xl font-bold text-gray-800">Welcome, { user?.name || 'User' }!</h1>
        </div>
        <p className="mb-6 text-lg text-gray-600">
          You have successfully logged in.
        </p>
        <p className="mb-6 text-md text-gray-500">
          Your email: { user?.email }
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/profile"
            className="w-full max-w-xs px-6 py-2 font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Edit Profile
          </Link>
          { user?.role === 'admin' && (
            <Link
              to="/admin"
              className="w-full max-w-xs px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Go to Admin Panel
            </Link>
          ) }
          <button
            onClick={ handleLogout }
            className="w-full max-w-xs px-6 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;