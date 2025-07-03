import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import Input from '../components/Input';
import toast from 'react-hot-toast';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const data = await authService.resetPassword(resetToken, { password });
      toast.success(data.message);
      setSuccess(true);
      // Redirect to login after a short delay
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred. The link may be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Reset Your Password</h2>
        { success ? (
          <div className="text-center">
            <p className="text-green-600">Your password has been reset successfully.</p>
            <p className="mt-4">
              You will be redirected to the{ ' ' }
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                login page
              </Link>{ ' ' }
              shortly.
            </p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={ handleSubmit }>
            <Input
              id="password"
              name="password"
              label="New Password"
              type="password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              required
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              value={ confirmPassword }
              onChange={ (e) => setConfirmPassword(e.target.value) }
              required
            />
            <button type="submit" disabled={ loading } className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              { loading ? 'Resetting...' : 'Reset Password' }
            </button>
          </form>
        ) }
      </div>
    </div>
  );
};

export default ResetPasswordPage;