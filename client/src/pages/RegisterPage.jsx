import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';
import Input from '../components/Input';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
      const { token, user } = await authService.register(formData);
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Create a new account</h2>
        <form className="space-y-6" onSubmit={ handleSubmit }>
          <Input
            id="name"
            name="name"
            label="Full Name"
            type="text"
            autoComplete="name"
            value={ formData.name }
            onChange={ handleChange }
            required
          />
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
            autoComplete="new-password"
            value={ formData.password }
            onChange={ handleChange }
            required
          />

          { error && <p className="text-sm text-red-600">{ error }</p> }

          <div>
            <button
              type="submit"
              disabled={ loading }
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              { loading ? 'Registering...' : 'Register' }
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{ ' ' }
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;