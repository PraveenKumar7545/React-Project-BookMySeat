// src/pages/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    // Create user (any email is allowed)
    const user = {
      email: email.trim(),
      name: email.split('@')[0],
      loggedIn: true,
    };

    localStorage.setItem('cineseat_user', JSON.stringify(user));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="/logo.png"
              alt="BookMySeat"
              className="h-12 mx-auto mb-4 object-contain"
            />

            <h1 className="text-2xl font-bold text-black">
              Welcome Back
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Login to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 4 characters"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-gray-800 text-sm text-center font-medium">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-all duration-200"
            >
              Login
            </button>

          </form>

          {/* Demo suggestion */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              You can use any email. Password must be at least 4 characters.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;