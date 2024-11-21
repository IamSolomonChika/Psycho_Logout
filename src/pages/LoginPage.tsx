import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate against an API
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email === credentials.email && user.password === credentials.password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex justify-end">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Login to your account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              required
              autoComplete="email"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
              type="password"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 