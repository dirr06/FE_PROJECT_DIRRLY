import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    if (credentials.email.trim() === '' || credentials.password.trim() === '') {
      setErrorMessage('Email dan password tidak boleh kosong');
      return;
    }
    axios.post('http://localhost:5000/login', credentials)
      .then(response => {
        localStorage.setItem('token', response.data.token); // Simpan token
        navigate('/FE_PROJECT_DIRRLY');
      })
      .catch(error => {
        console.error('Ada kesalahan saat login:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
        {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="your@email.com"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
       
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? 
          <a href="/FE_PROJECT_DIRRLY/register" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login; 