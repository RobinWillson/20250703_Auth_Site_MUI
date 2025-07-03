import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import Input from '../components/Input';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authService.forgotPassword({ email });
      toast.success(data.message);
      setSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Forgot Your Password?</h2>
        <p className="text-sm text-center text-gray-600">
          No problem. Enter your email address below and we'll send you a link to reset it.
        </p>
        <form className="space-y-6" onSubmit={ handleSubmit }>
          <Input
            id="email"
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            required
          />

          <div>
            <button
              type="submit"
              disabled={ loading || submitted } // Disable button after success
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              { loading ? 'Sending...' : 'Send Reset Link' }
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Remembered your password?{ ' ' }
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;