import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';
import { GoogleLogin } from '@react-oauth/google';
import Input from '../components/Input';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, user } = await authService.login(formData);
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    try {
      const { token, user } = await authService.loginWithGoogle(credentialResponse.credential);
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login to your account</h2>
        <form className="space-y-6" onSubmit={ handleSubmit }>
          <Input
            id="email"
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            value={ formData.email }
            onChange={ handleChange }
            required
          />
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={ formData.password }
            onChange={ handleChange }
            required
          />

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          { error && <p className="text-sm text-red-600">{ error }</p> }

          <div>
            <button
              type="submit"
              disabled={ loading }
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              { loading ? 'Signing in...' : 'Sign in' }
            </button>
          </div>
        </form>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">Or continue with</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <GoogleLogin
            onSuccess={ handleGoogleSuccess }
            onError={ () => {
              setError('Google login failed. Please try again.');
            } }
            useOneTap
            theme="filled_blue"
            shape="rectangular"
          />
        </div>

        <p className="text-sm text-center text-gray-600">
          Not a member?{ ' ' }
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;