import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';

const HomePage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { token, user } = await authService.loginWithGoogle(credentialResponse.credential);
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Google login failed. Please try again.';
      setError(errorMessage);
      console.error("Google Login Error:", errorMessage, err);
    }
  };

  const handleGoogleError = () => {
    const errorMessage = 'Google login process failed. Please try again.';
    setError(errorMessage);
    console.error(errorMessage);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Background Image */ }
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={ { backgroundImage: "url('https://source.unsplash.com/random/1600x900?technology,abstract')" } }
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 p-10 space-y-6 text-center bg-white bg-opacity-75 rounded-lg shadow-xl backdrop-blur-sm max-w-md">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to AuthSite</h1>
        <p className="text-lg text-gray-600">Your secure authentication solution.</p>

        { error && <p className="py-2 text-sm font-medium text-white bg-red-500 rounded-md">{ error }</p> }

        <div className="flex flex-col items-center w-full max-w-xs gap-4 mx-auto">
          <GoogleLogin onSuccess={ handleGoogleSuccess } onError={ handleGoogleError } theme="filled_blue" shape="rectangular" width="320px" />

          <div className="w-full text-center text-gray-600">or</div>

          <Link to="/login" className="w-full px-4 py-2 font-semibold text-center text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
            Login with Email
          </Link>

          <Link to="/register" className="w-full px-4 py-2 font-semibold text-center text-gray-700 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
            Sign Up with Email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;