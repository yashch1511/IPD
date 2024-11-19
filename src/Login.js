

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Announcements');
    } catch (err) {
      setError('Invalid credentials or missing permissions.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
      {/* Login Card */}
      <div
        className="bg-gray-900/60 backdrop-blur-lg shadow-lg rounded-lg w-full max-w-sm p-8 
        glass-card animate-bounceIn animate-glowPulse"
      >
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Login</h2>
        {error && (
          <p className="text-sm text-red-500 bg-red-100/10 p-2 rounded mb-4">
            {error}
          </p>
        )}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
